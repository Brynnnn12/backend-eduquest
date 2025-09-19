"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Quiz.belongsTo(models.Mission, {
        foreignKey: "mission_id",
        as: "mission",
      });
    }
  }
  Quiz.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      mission_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "missions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      question: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      options: {
        allowNull: false,
        type: DataTypes.JSON, // Ganti dari JSONB ke JSON untuk MySQL
      },
      answer: {
        allowNull: false,
        type: DataTypes.JSON, // Ganti dari JSONB ke JSON untuk MySQL
      },
    },
    {
      sequelize,
      modelName: "Quiz",
      tableName: "quizzes",
    }
  );
  return Quiz;
};
