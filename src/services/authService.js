const asyncHandler = require("express-async-handler");
const { User, Role } = require("../models");
const {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/generateToken");
const { sendEmail } = require("../utils/sendEmail");
const {
  createVerificationEmailTemplate,
  createPasswordResetTemplate,
  createWelcomeEmailTemplate,
} = require("../templates/emailTemplate");

exports.register = asyncHandler(
  async ({ name, email, password, passwordConfirmation }) => {
    if (password !== passwordConfirmation) {
      throw new Error("Password dan konfirmasi password tidak cocok");
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email sudah terdaftar");
    }

    const user = await User.create({ name, email, password });

    const userRole = await Role.findOne({ where: { name: "User" } });
    if (userRole) {
      await user.addRole(userRole);
    } else {
      throw new Error("Role 'User' tidak ditemukan di database");
    }

    const token = generateAccessToken({ id: user.id, email: user.email });

    const verifyUrl = `${
      process.env.APP_URL || "http://localhost:3000"
    }/api/auth/verify-email?token=${token}`;
    console.log(`Verifikasi email: ${verifyUrl}`);

    const htmlTemplate = createVerificationEmailTemplate({
      userName: user.name,
      verificationUrl: verifyUrl,
    });

    await sendEmail({
      to: user.email,
      subject: "Verifikasi Email Anda - Express Starter App",
      text: `Halo ${user.name}, klik link berikut untuk verifikasi email Anda: ${verifyUrl}`,
      html: htmlTemplate,
    });

    return user;
  }
);

exports.login = asyncHandler(async ({ email, password }) => {
  const user = await User.findOne({
    where: { email },
    include: [
      {
        model: Role,
        through: { attributes: [] },
      },
    ],
  });

  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Email atau password salah");
  }
  if (!user.emailVerifiedAt) {
    throw new Error("Email belum diverifikasi");
  }

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    roles: user.Roles.map((role) => role.name), // ini
  });
  const refreshToken = generateRefreshToken(user.id);

  return {
    user: {
      name: user.name,
    },
    accessToken,
    refreshToken,
  };
});

exports.logout = asyncHandler(async (user) => {
  res.clearCookie("token");
  return;
});

exports.verifyEmail = asyncHandler(async (token) => {
  const decoded = verifyAccessToken(token);

  if (!decoded) {
    throw new Error("Token tidak valid");
  }

  const user = await User.findByPk(decoded.id);
  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  user.emailVerifiedAt = new Date();
  await user.save();

  // Kirim welcome email setelah verifikasi berhasil
  const welcomeTemplate = createWelcomeEmailTemplate({
    userName: user.name,
    dashboardUrl: process.env.APP_URL || "http://localhost:3000",
  });

  await sendEmail({
    to: user.email,
    subject: "Selamat Datang di Express Starter App! 🎉",
    text: `Halo ${user.name}, selamat datang! Email Anda telah berhasil diverifikasi.`,
    html: welcomeTemplate,
  });

  return user;
});

exports.forgotPassword = asyncHandler(async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Email tidak ditemukan");
  }

  const token = generateAccessToken({ id: user.id, email: user.email });
  const resetUrl = `${
    process.env.APP_URL || "http://localhost:3000"
  }/api/auth/reset-password?token=${token}`;
  console.log(`Reset password: ${resetUrl}`);

  const htmlTemplate = createPasswordResetTemplate({
    userName: user.name,
    resetUrl: resetUrl,
  });

  await sendEmail({
    to: user.email,
    subject: "Reset Password Anda - Express Starter App",
    text: `Halo ${user.name}, klik link berikut untuk mereset password Anda: ${resetUrl}`,
    html: htmlTemplate,
  });

  return;
});

exports.resetPassword = asyncHandler(
  async (token, password, passwordConfirmation) => {
    if (password !== passwordConfirmation) {
      throw new Error("Password dan konfirmasi password tidak cocok");
    }

    // console.log("Reset Password - Token received:", token ? "Yes" : "No");

    const decoded = verifyAccessToken(token);
    // console.log(
    //   "Reset Password - Token decoded:",
    //   decoded ? "Success" : "Failed"
    // );

    if (!decoded) {
      throw new Error("Token tidak valid atau sudah kedaluwarsa");
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    // console.log("Reset Password - User found:", user.email);

    user.password = password;
    await user.save();

    // console.log("Reset Password - Password updated for:", user.email);

    return user;
  }
);

exports.refreshToken = asyncHandler(async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    throw new Error("Refresh token tidak valid");
  }

  const user = await User.findByPk(decoded.userId);
  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  const newAccessToken = generateAccessToken({
    id: user.id,
    email: user.email,
  });
  const newRefreshToken = generateRefreshToken(user.id);

  return {
    user: {
      name: user.name,
    },
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
});
