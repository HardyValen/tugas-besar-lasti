'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pengunjung', {
      id_pengunjung: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      nama_pengunjung: {
        type: Sequelize.STRING
      },
      jumlah_pengunjung: {
        type: Sequelize.STRING,
      },
      permissions: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      created_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      expired_date: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pengunjung');
  }
};