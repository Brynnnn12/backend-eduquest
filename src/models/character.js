"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Character.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Character.init(
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
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      username: {
        allowNull: true,
        type: DataTypes.STRING(50),
        unique: true,
        validate: {
          len: {
            args: [3, 50],
            msg: "Username must be between 3 and 50 characters long",
          },
        },
      },
      bio: {
        type: DataTypes.TEXT(160),
        allowNull: true,
      },
      avatar_url: {
        allowNull: true,
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            msg: "Avatar URL must be a valid URL",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Character",
      tableName: "characters",
    }
  );
  return Character;
};
