'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ruangan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { 
    }
  };
  
  Ruangan.init({
    id_ruangan: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    tipe_ruangan: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Ruangan',
    tableName: 'Ruangan',
    timestamps: false
  });
  return Ruangan;
};