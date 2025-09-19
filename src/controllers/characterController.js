const asyncHandler = require("express-async-handler");
const { responseSuccess } = require("../utils/response");
const {
  getCharacter,
  updateCharacter,
} = require("../services/characterService");

exports.index = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const character = await getCharacter(userId);
  responseSuccess(res, 200, "Berhasil mendapatkan karakter", character);
});

exports.update = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const characterData = req.body;

  const character = await updateCharacter(userId, characterData);
  responseSuccess(res, 200, "Berhasil mengupdate karakter", character);
});
