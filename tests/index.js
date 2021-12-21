const { sequelize } = require('../db')
const {Warehouse} = require('./warehouse')
const {Pallet} = require('./pallet')
const {Box} = require('./box')

Pallet.belongsTo(Warehouse);
Warehouse.hasMany(Pallet);

Box.belongsTo(Warehouse);
Warehouse.hasMany(Box);

Box.belongsTo(Pallet);
Pallet.hasMany(Box)

module.exports = {Warehouse, Pallet, Box}