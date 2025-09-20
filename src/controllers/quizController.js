const { getQuiz, updateQuiz, deleteQuiz } = require("../services/quizService");
const { responseSuccess } = require("../utils/response");
const asyncHandler = require("express-async-handler");
const { Mission, Quiz, Progres, Badge, AiContentLog } = require("../models");
const { checkAndAssignBadge } = require("../services/userBadgeService");
const aiContentService = require("../services/aiContentService");
const { generateHint, generateSolution } = require("../utils/aiHelper");

exports.index = asyncHandler(async (req, res) => {
  const result = await getQuiz(req.query);
  responseSuccess(res, 200, "Berhasil Mengambil Quizzes", result);
});

exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { question, options, answer } = req.body;

  const data = {
    question,
    options,
    answer,
  };

  const result = await updateQuiz(id, data);
  responseSuccess(res, 200, "Berhasil Mengupdate Quiz", result);
});

exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteQuiz(id);
  responseSuccess(res, 200, "Berhasil Menghapus Quiz", result);
});

// ...existing code...

exports.submitAnswers = asyncHandler(async (req, res) => {
  const { mission_id, answers } = req.body;
  const user_id = req.user.id;

  // Ambil mission
  const mission = await Mission.findByPk(mission_id);
  if (!mission) {
    return res.status(404).json({ message: "Mission not found" });
  }

  // Ambil semua quiz dari mission ini
  const quizzes = await Quiz.findAll({ where: { mission_id } });
  if (!quizzes || quizzes.length === 0) {
    return res.status(404).json({ message: "No quiz found for this mission" });
  }

  let score = 0;
  const totalQuestions = quizzes.length;
  const pointsPerQuestion =
    totalQuestions > 0 ? mission.points / totalQuestions : 0; // Hindari division by zero

  // Cek jawaban user
  answers.forEach((answer) => {
    const quiz = quizzes.find((q) => q.id === answer.quiz_id);
    if (quiz) {
      console.log(
        `Quiz ID: ${quiz.id}, Correct Answer: ${quiz.answer}, User Answer: ${answer.user_answer}`
      ); // Debug log
      if (
        quiz.answer.trim().toLowerCase() ===
        answer.user_answer.trim().toLowerCase()
      ) {
        // Case-insensitive dan trim
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

  // Response sukses
  responseSuccess(res, 200, "Berhasil submit jawaban & update progress", {
    score,
    totalQuestions,
    status: progress.status,
    progress,
  });
});

// ...existing code...

exports.getHint = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  const userId = req.user.id;

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
    return res.status(400).json({
      message: "Kamu sudah memakai solution, jadi tidak bisa pakai hint lagi.",
    });
  }

  if (hintCount >= 2) {
    return res
      .status(400)
      .json({ message: "Kamu sudah memakai semua hint (maks 2 kali)." });
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

  responseSuccess(res, 200, "Berhasil mendapatkan hint", { hint });
});

exports.getSolution = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  const userId = req.user.id;

  // 1. Cek sudah berapa kali solution dipakai user untuk quiz ini
  const solutionCount = await AiContentLog.count({
    where: {
      user_id: userId,
      action_type: "solution",
      quiz_id: quizId,
    },
  });

  if (solutionCount >= 1) {
    return res
      .status(400)
      .json({ message: "Kamu sudah memakai solution (maks 1 kali)." });
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

  responseSuccess(res, 200, "Berhasil mendapatkan solusi", { solution });
});
