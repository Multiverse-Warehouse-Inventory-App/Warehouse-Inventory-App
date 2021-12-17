const { sequelize } = require('./db')
const { Warehouse } = require('./models/warehouse');

const seedWarehouse = [
    {
        name: "Amazon Warehouse"
    }
]

const seed = async() => {
        try {
        await sequelize.sync({ force: true})
        await sequelize.authenticate();
        await Warehouse.bulkCreate(seedWarehouse, {validate: true})
        console.log("Connection has been established successfully.");
        sequelize.close()
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
    }
    return seed();