"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AiContentLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AiContentLog.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      AiContentLog.belongsTo(models.Quiz, {
        foreignKey: "quiz_id",
        as: "quiz",
      });
    }
  }
  AiContentLog.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      quiz_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "quizzes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      prompt: {
        type: DataTypes.TEXT,
      },
      response: {
        type: DataTypes.JSON,
      },
      action_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "AiContentLog",
      tableName: "ai_content_logs",
      underscored: true,
    }
  );
  return AiContentLog;
};
