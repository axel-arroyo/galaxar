'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User_Group.init({
    UserId: DataTypes.INTEGER,
    GroupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_Group',
  });
  return User_Group;
};