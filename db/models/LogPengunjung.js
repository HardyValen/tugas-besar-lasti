'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LogPengunjung extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { 
    }
  };
  
  LogPengunjung.init({
    id_log: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    id_pengunjung: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Pengunjung',
        key: 'id_pengunjung'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
    tipe_log: {
      type: DataTypes.STRING,
    },
    waktu_log: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'LogPengunjung',
    tableName: 'LogPengunjung',
    timestamps: false
  });
  return LogPengunjung;
};