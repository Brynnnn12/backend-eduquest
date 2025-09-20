"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBadge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relasi ke User
      UserBadge.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      // Relasi ke Badge
      UserBadge.belongsTo(models.Badge, {
        foreignKey: "badge_id",
        as: "badge",
      });
    }
  }
  UserBadge.init(
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
      badge_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "badges",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      awarded_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "UserBadge",
      tableName: "user_badges",

      underscored: true,
    }
  );
  return UserBadge;
};
