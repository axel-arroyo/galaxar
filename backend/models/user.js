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
      User.belongsToMany(models.Machine, {
        through: "Capacity",
      });
      User.hasMany(models.Report, {
        foreignKey: "id_user",
      });
      User.belongsTo(models.Role, {
        foreignKey: "id_rol"
      })
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
      ingresoU: DataTypes.STRING,
      id_rol: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
