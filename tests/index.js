const { sequelize } = require('../db')
const {Warehouse} = require('../models/warehouse')
const {Pallet} = require('../models/pallet')
const {Box} = require('../models/box')

Pallet.belongsTo(Warehouse);
Warehouse.hasMany(Pallet);

Box.belongsTo(Warehouse);
Warehouse.hasMany(Box);

Box.belongsTo(Pallet);
Pallet.hasMany(Box)

module.exports = {Warehouse, Pallet, Box, sequelize}