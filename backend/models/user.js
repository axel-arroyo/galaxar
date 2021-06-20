"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Group, {
        through: "User_Group",
      });
      User.belongsToMany(models.Role, {
        through: "User_Role",
      });
      User.belongsToMany(models.Machine, {
        through: "Capacity",
      });
      User.hasMany(models.Report, {
        foreignKey: "id_user",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      type: DataTypes.STRING,
      password: DataTypes.STRING,
      carrera: DataTypes.STRING,
      campus: DataTypes.STRING,
      sexo: DataTypes.STRING,
      ingresoU: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
