'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LogPengunjung', {
      id_log: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      id_pengunjung: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Pengunjung',
          key: 'id_pengunjung'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      tipe_log: {
        type: Sequelize.STRING
      },
      waktu_log: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('LogPengunjung');
  }
};