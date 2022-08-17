"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Incorrect email format",
          },
        },
        unique: {
          msg: "Email has been used",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
          min: {
            args: 5,
            msg: "Password minimum 5 characters",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (instance, option) => {
          instance.password = hashPassword(instance.password);
        },
        beforeBulkCreate: (instances, option) => {
          instances.forEach((instance) => {
            instance.password = hashPassword(instance.password);
          });
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
