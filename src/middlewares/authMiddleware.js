const { User, Role } = require("../models");
const { verifyAccessToken } = require("../utils/generateToken");

/**
 * Middleware untuk autentikasi token JWT
 */
exports.authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token diperlukan, silahkan login terlebih dahulu",
      });
    }

    const decoded = verifyAccessToken(token);
    if (!decoded) {
      return res.status(403).json({
        success: false,
        message: "Token tidak valid, silahkan login ulang",
      });
    }

    // Get user dengan roles
    const user = await User.findByPk(decoded.id, {
      include: [{ model: Role, as: "Roles" }],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan, silahkan login terlebih dahulu",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Middleware untuk cek role user
 * @param {string|string[]} allowedRoles - Role yang diizinkan
 */
exports.checkRole = (allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "User tidak terautentikasi",
        });
      }

      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
      const userRoles = req.user.Roles.map((role) => role.name);
      const hasRole = userRoles.some((role) => roles.includes(role));

      if (!hasRole) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required roles: ${roles.join(", ")}`,
          userRoles,
        });
      }

      next();
    } catch (error) {
      console.error("Role check error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
};

/**
 * Middleware khusus untuk role tertentu
 */
exports.adminOnly = exports.checkRole("Admin");
exports.guruOnly = exports.checkRole("Guru");
exports.muridOnly = exports.checkRole("Murid");

/**
 * Middleware untuk authenticated users (semua role)
 */
exports.authenticatedOnly = exports.checkRole(["Admin", "Guru"]);

/**
 * Middleware untuk cek apakah user adalah pemilik resource atau admin
 * @param {string} resourceUserIdParam - Parameter yang berisi user ID dari resource
 */
exports.ownerOrAdmin = (resourceUserIdParam = "userId") => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "User tidak terautentikasi",
        });
      }

      const isAdmin = req.user.Roles.some((role) => role.name === "Admin");
      const resourceUserId =
        req.params[resourceUserIdParam] || req.body[resourceUserIdParam];
      const isOwner = req.user.id === resourceUserId;

      if (!isAdmin && !isOwner) {
        return res.status(403).json({
          success: false,
          message:
            "Access denied. You can only access your own resources or need admin privileges",
        });
      }

      next();
    } catch (error) {
      console.error("Owner or admin check error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
};
