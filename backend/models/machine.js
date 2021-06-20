'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Machine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Machine.belongsToMany(models.User, {
        through: "Capacity"
      })
    }
  };
  Machine.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Machine',
  });
  return Machine;
};