'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      carrera: {
        type: Sequelize.STRING
      },
      campus: {
        type: Sequelize.STRING
      },
      sexo: {
        type: Sequelize.STRING
      },
      ingresoU: {
        type: Sequelize.STRING
      },
      id_rol: {
        type: Sequelize.INTEGER,
        references: {
          model: "Roles",
          key: "id",
          as: "id_rol"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};