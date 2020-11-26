'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LogRuangan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { 
    }
  };
  
  LogRuangan.init({
    id_log: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    id_ruangan: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Ruangan',
        key: 'id_ruangan'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    jumlah_pengunjung: {
      type: DataTypes.INTEGER,
    },
    waktu_log: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'LogRuangan',
    tableName: 'LogRuangan',
    timestamps: false
  });
  return LogRuangan;
};