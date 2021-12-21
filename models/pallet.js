const { sequelize } = require("../db");
const { DataTypes, Model } = require("sequelize");

class Pallet extends Model {}

Pallet.init(
<<<<<<< HEAD
  {
    isAvailable: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    currentCapacity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
=======
    {
        isAvailable: DataTypes.BOOLEAN,
        capacity: DataTypes.INTEGER,

>>>>>>> main
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

module.exports = { Pallet };
