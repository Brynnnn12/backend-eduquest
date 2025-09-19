const { Character } = require("../models");
const asyncHandler = require("express-async-handler");

exports.getCharacter = asyncHandler(async (userId) => {
  const character = await Character.findOne({
    where: { user_id: userId },
    attributes: ["username", "bio", "avatar_url"],
  });
  return character;
});

exports.updateCharacter = asyncHandler(async (userId, data) => {
  const character = await Character.findOne({ where: { user_id: userId } });
  if (!character) {
    throw new Error("Tidak ada karakter");
  }
  await character.update(data);
  return character;
});
