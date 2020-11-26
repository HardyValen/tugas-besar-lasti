'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ruangan', {
      id_ruangan: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true
      },
      tipe_ruangan: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Ruangan');
  }
};