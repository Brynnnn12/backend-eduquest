const { Quiz } = require("../models");
const asyncHandler = require("express-async-handler");

/**
 * Helper functions for AI-related operations
 */

/**
 * Generate hint for a quiz
 * @param {string} quizId - The quiz ID
 * @returns {Promise<string>} - The generated hint
 */
const generateHint = asyncHandler(async (quizId) => {
  // Ambil data quiz dari database
  const quiz = await Quiz.findByPk(quizId, {
    attributes: ["question", "options"],
  });

  if (!quiz) {
    return "Quiz tidak ditemukan.";
  }

  // Untuk sementara, kembalikan hint sederhana berdasarkan data quiz
  // Di implementasi nyata, gunakan AI API dengan pertanyaan sebenarnya
  const hint = `Petunjuk: Fokus pada kata kunci dalam pertanyaan "${quiz.question}". Pertimbangkan opsi yang disediakan.`;

  return hint;
});

/**
 * Generate solution for a quiz
 * @param {string} quizId - The quiz ID
 * @returns {Promise<string>} - The generated solution
 */
const generateSolution = asyncHandler(async (quizId) => {
  // Ambil data quiz dari database
  const quiz = await Quiz.findByPk(quizId, {
    attributes: ["question", "options", "answer"],
  });

  if (!quiz) {
    return "Quiz tidak ditemukan.";
  }

  // Untuk sementara, kembalikan solusi sederhana berdasarkan data quiz
  // Di implementasi nyata, gunakan AI API dengan pertanyaan dan jawaban sebenarnya
  const solution = `Solusi: Jawaban yang benar untuk "${quiz.question}" adalah "${quiz.answer}". Tinjau materi untuk penjelasan detail.`;

  return solution;
});

module.exports = {
  generateHint,
  generateSolution,
};
