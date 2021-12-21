const { sequelize } = require('../db')
const { DataTypes, Model } = require("sequelize");

class Box extends Model {}

Box.init(
    {
        isReady: DataTypes.BOOLEAN,

    },
    {
        sequelize,
        timestamps: false,
    }
);

module.exports = { Box }