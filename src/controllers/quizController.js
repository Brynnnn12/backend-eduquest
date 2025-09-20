const {
  getQuiz,
  updateQuiz,
  deleteQuiz,
  submitAnswers,
  getHint,
  getSolution,
} = require("../services/quizService");
const { responseSuccess } = require("../utils/response");
const asyncHandler = require("express-async-handler");

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

  const result = await submitAnswers(user_id, mission_id, answers);

  responseSuccess(
    res,
    200,
    "Berhasil submit jawaban & update progress",
    result
  );
});

exports.getHint = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  const userId = req.user.id;

  const hint = await getHint(quizId, userId);

  responseSuccess(res, 200, "Berhasil mendapatkan hint", { hint });
});

exports.getSolution = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  const userId = req.user.id;

  const solution = await getSolution(quizId, userId);

  responseSuccess(res, 200, "Berhasil mendapatkan solusi", { solution });
});
