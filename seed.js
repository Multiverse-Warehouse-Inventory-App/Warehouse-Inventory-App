const { sequelize } = require('./db')
const { Warehouse, Pallet } = require('./tests/index');

const seedWarehouse = [
    {
        name: "Verizon",
        location: "Irving, TX",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVYg8JekrtJGlwEqup_lcZkUizn9mbEE0Pcw&usqp=CAU",
        capacity: 100,
    },
    {
        name: "Google",
        location: "Seattle WA",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Googleplex_HQ_%28cropped%29.jpg",
        capacity: 100,
    },
    {
        name: "Wal-Mart",
        location: "Sacramento, CA",
        image: "https://media.gettyimages.com/photos/trailers-wait-to-be-transported-at-a-large-walmart-regional-center-picture-id1148428586?k=20&m=1148428586&s=612x612&w=0&h=Ry1t_hX21fyysmkb9alkfSz9DDwHa-D0y9HBx_wNAiI=",
        capacity: 100,
    },
    {
        name: "Apple",
        location: "Elk Grove CA",
        image: "https://img.112.international/original/2020/09/22/291551.jpg",
        capacity: 100,
    },
    {
        name: "Amazon",
        location: "Seattle WA",
        image: "https://www.cleveland.com/resizer/rfHAAShH5uRIiQkcaQEYUeae4v0=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/expo.advance.net/img/76779fc90a/width2048/f54_amazonamazon1724237213.jpeg",
        capacity: 100,
    }

]

const seedPallet = [{
    isAvailable:true,
    capacity: 10,
    currentCapacity: 0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDt_rrQQu6EapIVslzDGrS1zGYCWfFqheUIw&usqp=CAU",
    WarehouseId: 1,
},
{
    isAvailable:true,
    capacity: 35,
    currentCapacity: 0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDt_rrQQu6EapIVslzDGrS1zGYCWfFqheUIw&usqp=CAU",
    WarehouseId: 1,
},

{
    isAvailable:true,
    capacity: 50,
    currentCapacity: 0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDt_rrQQu6EapIVslzDGrS1zGYCWfFqheUIw&usqp=CAU",
    WarehouseId: 2,
},
{
    isAvailable:true,
    capacity: 20,
    currentCapacity: 0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDt_rrQQu6EapIVslzDGrS1zGYCWfFqheUIw&usqp=CAU",
    WarehouseId: 3,
},
{
    isAvailable:true,
    capacity: 15,
    currentCapacity: 0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDt_rrQQu6EapIVslzDGrS1zGYCWfFqheUIw&usqp=CAU",
    WarehouseId: 4,
},
{
    isAvailable:true,
    capacity: 19,
    currentCapacity: 0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDt_rrQQu6EapIVslzDGrS1zGYCWfFqheUIw&usqp=CAU",
    WarehouseId: 5,
},
]

const seed = async() => {
        try {
        await sequelize.sync({ force: true});
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