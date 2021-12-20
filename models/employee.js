const { sequelize } = require('../db')
const { DataTypes, Model } = require("sequelize");

class Employee extends Model {}

Employee.init(
    {
        name: DataTypes.STRING
    },
    {
        sequelize,
        timestamps: false,
    }
);

module.exports = { Employee }