'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LogRuangan', {
      id_log: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      id_ruangan: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Ruangan',
          key: 'id_ruangan'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      jumlah_pengunjung: {
        type: Sequelize.INTEGER,
      },
      waktu_log: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('LogRuangan');
  }
};