"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bcrypt = require("bcryptjs");
    const { v4: uuidv4 } = require("uuid");
    const now = new Date();

    const hashedPassword = await bcrypt.hash("admin123", 12);
    const adminUserId = uuidv4();
    const guruUserId = uuidv4();

    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: adminUserId,
          name: "Administrator",
          email: "admin@eduquests.com",
          password: hashedPassword,
          email_verified_at: now,
          created_at: now,
          updated_at: now,
        },
        {
          id: guruUserId,
          name: "Guru",
          email: "guru@eduquests.com",
          password: hashedPassword,
          email_verified_at: now,
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );

    /**
     * ambil role Admin dari tabel roles
     */
    const [adminRole] = await queryInterface.sequelize.query(
      "SELECT id FROM roles WHERE name = 'Admin' LIMIT 1",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    /**
     * ambil role Guru dari tabel roles
     */
    const [guruRole] = await queryInterface.sequelize.query(
      "SELECT id FROM roles WHERE name = 'Guru' LIMIT 1",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    /**
     * assign role Admin ke user admin yang baru dibuat
     */
    if (adminRole) {
      await queryInterface.bulkInsert(
        "user_roles",
        [
          {
            user_id: adminUserId,
            role_id: adminRole.id,
            created_at: now,
            updated_at: now,
          },
        ],
        {}
      );
    }

    /**
     * assign role Guru ke user guru yang baru dibuat
     */
    if (guruRole) {
      await queryInterface.bulkInsert(
        "user_roles",
        [
          {
            user_id: guruUserId,
            role_id: guruRole.id,
            created_at: now,
            updated_at: now,
          },
        ],
        {}
      );
    }

    /**
     * buat character untuk admin dan guru dengan data kosong
     */
    await queryInterface.bulkInsert(
      "characters",
      [
        {
          id: uuidv4(),
          username: "admin",
          user_id: adminUserId,
          bio: null,
          avatar_url: null,
          created_at: now,
          updated_at: now,
        },
        {
          id: uuidv4(),
          username: "guru",
          user_id: guruUserId,
          bio: null,
          avatar_url: null,
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Hapus characters untuk admin dan guru
    await queryInterface.bulkDelete(
      "characters",
      {
        user_id: {
          [Sequelize.Op.in]: queryInterface.sequelize.literal(
            "(SELECT id FROM users WHERE email IN ('admin@eduquests.com', 'guru@eduquests.com'))"
          ),
        },
      },
      {}
    );

    // Hapus user_roles untuk admin dan guru
    await queryInterface.bulkDelete(
      "user_roles",
      {
        user_id: {
          [Sequelize.Op.in]: queryInterface.sequelize.literal(
            "(SELECT id FROM users WHERE email IN ('admin@eduquests.com', 'guru@eduquests.com'))"
          ),
        },
      },
      {}
    );

    // Hapus users admin dan guru
    await queryInterface.bulkDelete(
      "users",
      {
        email: {
          [Sequelize.Op.in]: ["admin@eduquests.com", "guru@eduquests.com"],
        },
      },
      {}
    );
  },
};
