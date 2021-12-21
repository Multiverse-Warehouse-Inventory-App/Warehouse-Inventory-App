const { sequelize } = require('./db')
const { Warehouse, Pallet } = require('./models');

const seedWarehouse = [
    {
        name: "Amazon Warehouse",
        location: "Seattle WA",
        image: "image",
        capacity: 100000
    }
]

const seedPallet = {
    capacity: 10,
    image: "image"
}

const seed = async() => {
        try {
        await sequelize.sync({ force: true})
        await sequelize.authenticate();
        await Warehouse.bulkCreate(seedWarehouse, {validate: true})
        await Pallet.bulkCreate(seedPallet, {validate: true})
        console.log("Connection has been established successfully.");
        sequelize.close()
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
    }
    return seed();