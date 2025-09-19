const asyncHandler = require("express-async-handler");
const { User, Role } = require("../models");

exports.getProfile = asyncHandler(async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: ["name", "email"],
    include: [
      {
        model: Role,
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  });
  if (!user) {
    throw new Error("Profile User Tidak Ditemukan");
  }
  return user;
});

exports.updateProfile = asyncHandler(async (userId, { name, email }) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("Profile User Tidak Ditemukan");
  }
  await user.update({ name, email });

  return { name: user.name, email: user.email };
});

exports.updatePassword = asyncHandler(
  async (userId, { oldPassword, newPassword }) => {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Profile User Tidak Ditemukan");
    }
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      throw new Error("Password Lama Tidak Sesuai");
    }
    user.password = newPassword;
    await user.save();
    return { name: user.name, email: user.email };
  }
);

// Hapus akun dengan konfirmasi password
exports.deleteAccount = asyncHandler(async (userId, { password }) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("Profile User Tidak Ditemukan");
  }
  // Konfirmasi password sebelum hapus
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Password Tidak Sesuai, Akun Tidak Dapat Dihapus");
  }
  // Hapus user (soft delete jika model support, atau hard delete)
  await user.destroy();
  return { message: "Akun berhasil dihapus" };
});
