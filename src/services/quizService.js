require("dotenv").config(); // Tambah ini untuk load .env

const { GoogleGenAI } = require("@google/genai");

const { Quiz, Mission, Progres, AiContentLog } = require("../models");
const { getPagination } = require("../utils/queryHelper");
const asyncHandler = require("express-async-handler");
const { checkAndAssignBadge } = require("./userBadgeService");
const aiContentService = require("./aiContentService");
const { generateHint, generateSolution } = require("../utils/aiHelper");

const googleGenerativeAI = new GoogleGenAI({
  apiKey: process.env.AI_GEMINI_API_KEY,
});

exports.generateQuiz = asyncHandler(
  async (title, description, subject, level) => {
    const prompt = `
  Buatkan 10 soal pilihan ganda untuk misi pembelajaran berikut:
  - Judul: ${title}
  - Deskripsi: ${description}
  - Mata Pelajaran: ${subject}
  - Level: ${level}

  Format output JSON array:
  [
    {
      "question": "Pertanyaan",
      "options": ["A", "B", "C", "D"],
      "answer": "Jawaban yang benar"
    }
  ]
  `;
    const response = await googleGenerativeAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    try {
      let responseText = response.text;
      // console.log("AI Response Text:", responseText); // Debug: lihat response dari AI

      // Strip markdown code block jika ada
      if (responseText.startsWith("```json")) {
        responseText = responseText
          .replace(/^```json\s*/, "")
          .replace(/\s*```$/, "");
      }

      return JSON.parse(responseText); // return array quiz
    } catch (error) {
      console.error("Error parsing Gemini response:", error);
      // console.error("Response Text:", response.text); // Debug: lihat text yang gagal parse
      return [];
    }
  }
);

exports.getQuiz = asyncHandler(async (query) => {
  const { limit, offset, page } = getPagination(query);
  const { mission_id } = query;
  const where = mission_id ? { mission_id } : {};
  const quizzes = await Quiz.findAndCountAll({
    where,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });
  return {
    data: quizzes.rows,
    meta: {
      total: quizzes.count,
      page,
      limit,
    },
  };
});

exports.updateQuiz = asyncHandler(async (id, data) => {
  const quiz = await Quiz.findByPk(id);
  if (!quiz) {
    throw new Error("Quiz not found");
  }
  await quiz.update(data);
  return quiz;
});

exports.deleteQuiz = asyncHandler(async (id) => {
  const quiz = await Quiz.findByPk(id);
  if (!quiz) {
    throw new Error("Quiz not found");
  }
  await quiz.destroy();
  return { message: "Quiz deleted successfully" };
});

exports.submitAnswers = asyncHandler(async (user_id, mission_id, answers) => {
  // Ambil mission
  const mission = await Mission.findByPk(mission_id);
  if (!mission) {
    throw new Error("Mission not found");
  }

  // Cek apakah user sudah pernah submit jawaban untuk mission ini
  const existingProgress = await Progres.findOne({
    where: { user_id, mission_id },
  });
  if (existingProgress) {
    throw new Error(
      "Anda sudah pernah menjawab quiz untuk misi ini. Tidak dapat submit ulang."
    );
  }

  // Ambil semua quiz dari mission ini
  const quizzes = await Quiz.findAll({ where: { mission_id } });
  if (!quizzes || quizzes.length === 0) {
    throw new Error("No quiz found for this mission");
  }

  let score = 0;
  const totalQuestions = quizzes.length;
  const pointsPerQuestion =
    totalQuestions > 0 ? mission.points / totalQuestions : 0; // Hindari division by zero

  // Cek jawaban user
  answers.forEach((answer) => {
    const quiz = quizzes.find((q) => q.id === answer.quiz_id);
    if (quiz) {
      // Konversi user_answer ke index (a=0, b=1, c=2, d=3)
      const userAnswerIndex =
        answer.user_answer.toLowerCase().charCodeAt(0) - 97; // 'a' = 0, 'b' = 1, etc.
      const userSelectedAnswer = quiz.options[userAnswerIndex];

      console.log(
        `Quiz ID: ${quiz.id}, Correct Answer: ${quiz.answer}, User Answer: ${answer.user_answer} (${userSelectedAnswer})`
      ); // Debug log

      if (
        userSelectedAnswer &&
        quiz.answer.trim().toLowerCase() ===
          userSelectedAnswer.trim().toLowerCase()
      ) {
        score += pointsPerQuestion;
        console.log(`Correct! Score added: ${pointsPerQuestion}`); // Debug log
      }
    } else {
      console.log(`Quiz not found for ID: ${answer.quiz_id}`); // Debug log
    }
  });

  // Tentukan status
  const isCompleted = score >= mission.points * 0.7; // Lulus kalau >= 70%
  const progressData = {
    user_id,
    mission_id,
    score,
    status: isCompleted ? "completed" : "pending",
    completed_at: isCompleted ? new Date() : null,
  };

  // Update atau create progress
  let progress = await Progres.findOne({ where: { user_id, mission_id } });
  if (progress) {
    await progress.update(progressData);
  } else {
    progress = await Progres.create(progressData);
  }

  // Check for badge assignment if completed
  if (isCompleted) {
    await checkAndAssignBadge(user_id);
  }

  return {
    score,
    totalQuestions,
    status: progress.status,
    progress,
  };
});

exports.getHint = asyncHandler(async (quizId, userId) => {
  // 1. Cek sudah berapa kali hint dipakai user untuk quiz ini
  const hintCount = await AiContentLog.count({
    where: {
      user_id: userId,
      action_type: "hint",
      quiz_id: quizId,
    },
  });

  // 2. Cek apakah user sudah pakai solution untuk quiz ini
  const solutionCount = await AiContentLog.count({
    where: {
      user_id: userId,
      action_type: "solution",
      quiz_id: quizId,
    },
  });

  if (solutionCount > 0) {
    throw new Error(
      "Kamu sudah memakai solution, jadi tidak bisa pakai hint lagi."
    );
  }

  if (hintCount >= 2) {
    throw new Error("Kamu sudah memakai semua hint (maks 2 kali).");
  }

  // 3. Generate hint
  const hint = await generateHint(quizId);

  // 4. Simpan log
  await aiContentService.createLog({
    userId,
    actionType: "hint",
    prompt: `Generate hint for quiz ${quizId}`,
    response: hint,
    quizId,
  });

  return hint;
});

exports.getSolution = asyncHandler(async (quizId, userId) => {
  // 1. Cek sudah berapa kali solution dipakai user untuk quiz ini
  const solutionCount = await AiContentLog.count({
    where: {
      user_id: userId,
      action_type: "solution",
      quiz_id: quizId,
    },
  });

  if (solutionCount >= 1) {
    throw new Error("Kamu sudah memakai solution (maks 1 kali).");
  }

  // 2. Generate solution
  const solution = await generateSolution(quizId);

  // 3. Simpan log
  await aiContentService.createLog({
    userId,
    actionType: "solution",
    prompt: `Generate solution for quiz ${quizId}`,
    response: solution,
    quizId,
  });

  return solution;
});
