const { sequelize } = require('../db')
const { DataTypes, Model } = require("sequelize");

class Warehouse extends Model {}

Warehouse.init(
    {
        name: DataTypes.STRING,
        location: DataTypes.STRING,
        capacity: DataTypes.INTEGER,      
        image: DataTypes.STRING,
  
    },
    {
        sequelize,
        timestamps: true,
    }
);

module.exports = { Warehouse }