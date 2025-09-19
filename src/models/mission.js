"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //relasi ke user dengan hubungan satu ke banyak
      Mission.belongsTo(models.User, {
        foreignKey: "created_by",
        as: "user",
      });
      Mission.hasMany(models.Quiz, {
        foreignKey: "mission_id",
        as: "quizzes",
      });
    }
  }
  Mission.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      subject: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      level: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      points: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      created_by: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Mission",
      tableName: "missions",
      underscored: true,
    }
  );
  return Mission;
};
