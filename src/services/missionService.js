const { Mission, Quiz } = require("../models");
const { generateQuiz } = require("./quizService");
const { getPagination } = require("../utils/queryHelper");
const asyncHandler = require("express-async-handler");

exports.getMission = asyncHandler(async (query) => {
  const { limit, offset, page } = getPagination(query);
  const missions = await Mission.findAndCountAll({
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });
  return {
    data: missions.rows,
    meta: {
      total: missions.count,
      page,
      limit,
    },
  };
});

exports.createMission = asyncHandler(async (data) => {
  const mission = await Mission.create(data);

  // Generate quiz menggunakan AI
  const quizzes = await generateQuiz(
    data.title,
    data.description,
    data.subject,
    data.level
  );

  // Simpan quiz ke database
  if (quizzes && quizzes.length > 0) {
    const quizData = quizzes.map((quiz) => ({
      mission_id: mission.id,
      question: quiz.question,
      options: quiz.options,
      answer: quiz.answer,
    }));
    await Quiz.bulkCreate(quizData);
  }

  return mission;
});

exports.updateMission = asyncHandler(async (id, data) => {
  const mission = await Mission.findByPk(id);
  if (!mission) {
    throw new Error("Mission not found");
  }

  await mission.update(data);
  return mission;
});

exports.deleteMission = asyncHandler(async (id) => {
  const mission = await Mission.findByPk(id);
  if (!mission) {
    throw new Error("Mission not found");
  }

  await mission.destroy();
  return { message: "Mission deleted successfully" };
});
