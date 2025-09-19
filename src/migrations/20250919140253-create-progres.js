"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("progress", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      mission_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "missions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      score: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM("pending", "completed"),
        allowNull: false,
        defaultValue: "pending",
      },
      completed_at: {
        type: Sequelize.DATE,
        allowNull: true, // diisi saat status = completed
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("progress");
  },
};
