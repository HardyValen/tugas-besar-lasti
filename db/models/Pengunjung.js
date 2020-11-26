'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pengunjung extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { 
    }
  };
  
  Pengunjung.init({
    id_pengunjung: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    nama_pengunjung: {
      type: DataTypes.STRING
    },
    jumlah_pengunjung: {
      type: DataTypes.STRING,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    created_date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    expired_date: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Pengunjung',
    tableName: 'Pengunjung',
    timestamps: false
  });
  return Pengunjung;
};