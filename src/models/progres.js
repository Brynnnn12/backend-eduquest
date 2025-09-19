"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Progres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Progres.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Progres.belongsTo(models.Mission, {
        foreignKey: "mission_id",
        as: "mission",
      });
    }
  }
  Progres.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      score: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM("pending", "completed"),
      },
      completed_at: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Progres",
      tableName: "progress",
      underscored: true,
    }
  );
  return Progres;
};
