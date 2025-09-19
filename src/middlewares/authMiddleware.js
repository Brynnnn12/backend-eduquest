const { User, Role } = require("../models");
const { verifyAccessToken } = require("../utils/generateToken");

/**
 * Middleware untuk autentikasi token
 */
exports.authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

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
        //tambahkan login terlebih dahulu
        message: "Token tidak valid, silahkan login ulang",
      });
    }

    // Get user dengan roles
    const user = await User.findByPk(decoded.id, {
      include: [
        {
          model: Role,
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
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
 * @param {string|string[]} allowedRoles - Role yang diizinkan (string atau array)
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

      // Pastikan allowedRoles adalah array
      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

      // Cek apakah user memiliki salah satu role yang diizinkan
      const hasRole = req.user.Roles.some((userRole) =>
        roles.includes(userRole.name)
      );

      if (!hasRole) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required roles: ${roles.join(", ")}`,
          userRoles: req.user.Roles.map((role) => role.name),
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
 * Middleware khusus untuk admin saja
 */
exports.adminOnly = exports.checkRole("Admin");

/**
 * Middleware untuk admin atau user (authenticated users)
 */
exports.authenticatedOnly = exports.checkRole(["Admin", "User"]);

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

      // Cek apakah user adalah admin
      const isAdmin = req.user.Roles.some((role) => role.name === "Admin");

      // Cek apakah user adalah pemilik resource
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
