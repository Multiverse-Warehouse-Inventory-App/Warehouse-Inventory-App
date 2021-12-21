const { sequelize } = require('../db')
const { DataTypes, Model } = require("sequelize");

class Warehouse extends Model {}

Warehouse.init(
    {
        name: DataTypes.STRING,
        location: DataTypes.STRING,
        image: DataTypes.STRING,
        capacity: DataTypes.INTEGER,        
    },
    {
        sequelize,
        timestamps: false,
    }
);

module.exports = { Warehouse }