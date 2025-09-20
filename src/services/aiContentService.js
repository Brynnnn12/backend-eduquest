const asyncHandler = require("express-async-handler");
const { AiContentLog } = require("../models");

exports.createLog = asyncHandler(
  async ({ userId, actionType, prompt, response, quizId }) => {
    const log = await AiContentLog.create({
      user_id: userId,
      quiz_id: quizId,
      action_type: actionType,
      prompt,
      response,
    });
    return log;
  }
);
