require("dotenv").config(); // Tambah ini untuk load .env

const { GoogleGenAI } = require("@google/genai");

const { Quiz } = require("../models");
const { getPagination } = require("../utils/queryHelper");
const asyncHandler = require("express-async-handler");

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
