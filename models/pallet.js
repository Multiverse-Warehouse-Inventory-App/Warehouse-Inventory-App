const { sequelize } = require('../db')
const { DataTypes, Model } = require("sequelize");

class Pallet extends Model {}

Pallet.init(
    {
        isAvailable: DataTypes.BOOLEAN,
        capacity: DataTypes.INTEGER,

    },
    {
        sequelize,
        timestamps: false,
    }
);

module.exports = { Pallet }