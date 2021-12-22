const { sequelize } = require("../db");
const { DataTypes, Model } = require("sequelize");

class Pallet extends Model {}

Pallet.init(
  {
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    capacity: DataTypes.INTEGER,
    currentCapacity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image: DataTypes.STRING,
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = { Pallet };
