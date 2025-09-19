"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models/role.js
      Role.belongsToMany(models.User, {
        through: "user_roles",
        foreignKey: "role_id",
        otherKey: "user_id",
      });
    }
  }
  Role.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Nama role tidak boleh kosong",
          },
          len: {
            args: [3, 50],
            msg: "Nama role harus antara 3 hingga 50 karakter",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles", //menentukan nama tabel di database
    }
  );
  return Role;
};
