const { getQuiz, updateQuiz, deleteQuiz } = require("../services/quizService");
const { responseSuccess } = require("../utils/response");
const asyncHandler = require("express-async-handler");
const { Mission, Quiz, Progres, Badge } = require("../models");
const { checkAndAssignBadge } = require("../services/userBadgeService");

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
  const pointsPerQuestion = mission.points / totalQuestions; // Misal 100 / 10 = 10 poin

  // Cek jawaban user
  answers.forEach((answer) => {
    const quiz = quizzes.find((q) => q.id === answer.quiz_id);
    if (quiz && quiz.answer === answer.user_answer) {
      score += pointsPerQuestion; // Tambah poin per jawaban benar
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
