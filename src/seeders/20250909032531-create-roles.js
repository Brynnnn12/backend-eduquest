"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { v4: uuidv4 } = require("uuid");
    const now = new Date();

    await queryInterface.bulkInsert(
      "roles",
      [
        {
          id: uuidv4(),
          name: "Admin",
          created_at: now,
          updated_at: now,
        },
        {
          id: uuidv4(),
          name: "Guru",
          created_at: now,
          updated_at: now,
        },
        {
          id: uuidv4(),
          name: "Murid",
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
