"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bcrypt = require("bcryptjs");
    const { v4: uuidv4 } = require("uuid");
    const now = new Date();

    const hashedPassword = await bcrypt.hash("admin123", 12);

    // Define users data
    const usersData = [
      {
        id: uuidv4(),
        name: "Administrator",
        email: "admin@eduquests.com",
        roleName: "Admin",
        username: "admin",
      },
      {
        id: uuidv4(),
        name: "Guru",
        email: "guru@eduquests.com",
        roleName: "Guru",
        username: "guru",
      },
      {
        id: uuidv4(),
        name: "Murid",
        email: "murid@eduquests.com",
        roleName: "Murid",
        username: "murid",
      },
    ];

    // Insert users
    await queryInterface.bulkInsert(
      "users",
      usersData.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        password: hashedPassword,
        email_verified_at: now,
        created_at: now,
        updated_at: now,
      })),
      {}
    );

    // Get all roles
    const roles = await queryInterface.sequelize.query(
      "SELECT id, name FROM roles",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const roleMap = {};
    roles.forEach((role) => {
      roleMap[role.name] = role.id;
    });

    // Assign roles to users
    const userRolesData = usersData
      .map((user) => {
        const roleId = roleMap[user.roleName];
        if (roleId) {
          return {
            user_id: user.id,
            role_id: roleId,
            created_at: now,
            updated_at: now,
          };
        }
        return null;
      })
      .filter(Boolean);

    if (userRolesData.length > 0) {
      await queryInterface.bulkInsert("user_roles", userRolesData, {});
    }

    // Create characters for all users
    const charactersData = usersData.map((user) => ({
      id: uuidv4(),
      username: user.username,
      user_id: user.id,
      bio: null,
      avatar_url: null,
      created_at: now,
      updated_at: now,
    }));

    await queryInterface.bulkInsert("characters", charactersData, {});
  },

  async down(queryInterface, Sequelize) {
    // Hapus characters untuk semua user demo
    await queryInterface.bulkDelete(
      "characters",
      {
        user_id: {
          [Sequelize.Op.in]: queryInterface.sequelize.literal(
            "(SELECT id FROM users WHERE email IN ('admin@eduquests.com', 'guru@eduquests.com', 'murid@eduquests.com'))"
          ),
        },
      },
      {}
    );

    // Hapus user_roles untuk semua user demo
    await queryInterface.bulkDelete(
      "user_roles",
      {
        user_id: {
          [Sequelize.Op.in]: queryInterface.sequelize.literal(
            "(SELECT id FROM users WHERE email IN ('admin@eduquests.com', 'guru@eduquests.com', 'murid@eduquests.com'))"
          ),
        },
      },
      {}
    );

    // Hapus users demo
    await queryInterface.bulkDelete(
      "users",
      {
        email: {
          [Sequelize.Op.in]: [
            "admin@eduquests.com",
            "guru@eduquests.com",
            "murid@eduquests.com",
          ],
        },
      },
      {}
    );
  },
};
