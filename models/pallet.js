const { sequelize } = require("../db");
const { DataTypes, Model } = require("sequelize");

class Pallet extends Model {}

Pallet.init(
  {
    isAvailable: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    currentCapacity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

module.exports = { Pallet };
