const jwt = require("jsonwebtoken");

const { access, refresh } = require("../config/jwt");

/**
 * ini untuk generate token
 * payload itu data yang mau dimasukin ke token
 * misal { id: user.id, email: user.email }
 * expiresIn itu waktu kadaluarsa token
 */
exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, access.secret, { expiresIn: access.expiresIn });
};
/**
 * ini untuk verifikasi token, kalo valid dia balikin payloadnya
 * kalo ga valid dia balikin null
 */
exports.verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, access.secret);
  } catch {
    return null;
  }
};
/**
 * ini untuk generate refresh token
 * payload itu data yang mau dimasukin ke token
 * misal { id: user.id, email: user.email }
 * expiresIn itu waktu kadaluarsa token
 */
exports.generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, refresh.secret, { expiresIn: refresh.expiresIn });
};

/**
 * ini untuk verifikasi token, kalo valid dia balikin payloadnya
 * kalo ga valid dia balikin null
 * refresh token biasanya isinya userId doang
 */
exports.verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, refresh.secret);
  } catch {
    return null;
  }
};

/**
 * ini untuk decode token, ga peduli valid atau engga
 * dia balikin payloadnya
 */
exports.decodeToken = (token) => {
  return jwt.decode(token);
};
