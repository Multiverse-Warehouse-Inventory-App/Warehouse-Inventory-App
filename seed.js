const { sequelize } = require('./db')
const { Warehouse, Pallet } = require('./tests/index');

const seedWarehouse = [
    {
        name: "Wal-Mart",
        location: "Seattle WA",
        image: "https://media.gettyimages.com/photos/trailers-wait-to-be-transported-at-a-large-walmart-regional-center-picture-id1148428586?k=20&m=1148428586&s=612x612&w=0&h=Ry1t_hX21fyysmkb9alkfSz9DDwHa-D0y9HBx_wNAiI=",
        capacity: 100,
    },
    {
        name: "Apple",
        location: "Seattle WA",
        image: "https://img.112.international/original/2020/09/22/291551.jpg",
        capacity: 100,
    },
    {
        name: "Amazon",
        location: "Seattle WA",
        image: "https://www.cleveland.com/resizer/rfHAAShH5uRIiQkcaQEYUeae4v0=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/expo.advance.net/img/76779fc90a/width2048/f54_amazonamazon1724237213.jpeg",
        capacity: 100,
    },
    {
        name: "Verizon",
        location: "Irving, TX",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVYg8JekrtJGlwEqup_lcZkUizn9mbEE0Pcw&usqp=CAU",
        capacity: 100,
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