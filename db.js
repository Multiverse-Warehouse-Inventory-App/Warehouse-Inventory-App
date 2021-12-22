const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "./db.sqlite")
})

// const connectionSettings = {
//     test: {dialect: 'sqlite', storage: 'sqlite::memory:'},
//     dev: {dialect: 'sqlite', storage: path.join(__dirname, 'data.db')},
//     production: {dialect: 'postgres', protocal: 'postgres'}
// }
// const sequelize = process.env.NODE_ENV === 'production'
//     ? new Sequelize(process.env.DATABASE_URL, connectionSettings[process.env.NODE_ENV])
//     : new Sequelize(connectionSettings[process.env.NODE_ENV])

module.exports = { sequelize };