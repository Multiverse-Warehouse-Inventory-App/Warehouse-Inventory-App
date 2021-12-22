//import the associated models from index.js
const { equal } = require('assert-plus')
const {Warehouse, Pallet, Box, sequelize} = require('./index')

//test Warehouse database CRUD
describe('Warehouse Database', () => {

    beforeAll(async() => {
        //reset database
        await sequelize.sync({force:true})
 
        //create array of Warehouses
        const arrayOfWarehouse =[
            {name: 'Amazon', location: 'Dallas,TX',  image: "https://www.cleveland.com/resizer/rfHAAShH5uRIiQkcaQEYUeae4v0=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/expo.advance.net/img/76779fc90a/width2048/f54_amazonamazon1724237213.jpeg",capacity: 3},
            {name: 'Apple', location: 'New York,NY',  image: "https://img.112.international/original/2020/09/22/291551.jpg ",capacity: 1 },
            {name: 'Verizon', location: 'Irving,TX', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVYg8JekrtJGlwEqup_lcZkUizn9mbEE0Pcw&usqp=CAU ",capacity: 4 },
            {name: 'Walmart', location: 'Houston,TX',  image: "https://media.gettyimages.com/photos/trailers-wait-to-be-transported-at-a-large-walmart-regional-center-picture-id1148428586?k=20&m=1148428586&s=612x612&w=0&h=Ry1t_hX21fyysmkb9alkfSz9DDwHa-D0y9HBx_wNAiI=",capacity: 2},

        ]
        //create array of pallets
        const arrayOfPallet = [
            {isAvailable: false, capacity: 4},
            {isAvailable: true, capacity: 3},
            {isAvailable: true, capacity: 2},
            {isAvailable: true, capacity: 1},
        ]
        //create array of boxes
        const arrayOfBox =[
            {isReady: true},
            {isReady: true},
            {isReady: true},
            {isReady: true},

        ]

        //add arrays to database
        await Warehouse.bulkCreate(arrayOfWarehouse)
        await Pallet.bulkCreate(arrayOfPallet)
        await Box.bulkCreate(arrayOfBox)
    })

    test('Warehouses have name', async() => {

        const testWarehouse = await Warehouse.findOne({where: {name: 'Amazon'}});
        expect(testWarehouse.name).toBe('Amazon')
    })

        test('Warehouses have an location', async() => {

        const testWarehouse = await Warehouse.findOne({where: {name: 'Verizon'}});
        expect(testWarehouse.location).toBe('Irving,TX')
    })

        test('Pallets have capacity', async() => {

        const testPallet = await Pallet.findOne({where: {capacity:4}});
        expect(testPallet.capacity).toBe(4)
    })

        test('Boxes status isReady', async() => {

        const testBox = await Box.findOne({where: {isReady: true}});
        expect(testBox.isReady).toStrictEqual (true)


    })
    
        test('can create a Warehouse', async() => {

        const testWarehouse = await Warehouse.findOne({where: {name: 'Amazon'}});
        const testWarehouse2 = await Warehouse.findOne({where: {name: 'Verizon'}});

        expect(testWarehouse.location).toBe('Dallas,TX')
        expect(testWarehouse2.location).toBe('Irving,TX')
    })

        test('Warehouses have many Pallets and Boxes', async()=> {
        //read test Warehouse instance from db
        const testWarehouse = await Warehouse.findOne({where: {name: 'Amazon'}});
        const testWarehouse2 = await Warehouse.findOne({where: {name: 'Verizon'}});  
        // const testPalletA = await Pallet.findOne({where: {isAvailable: false}}); 
        // const testPalletB = await Pallet.findOne({where: {isAvailable: true}});  

        const testPallet1 = await Pallet.findOne({where: {capacity: '4'}})
        const testPallet2 = await Pallet.findOne({where: {capacity: '3'}})
        const testPallet3 = await Pallet.findOne({where: {capacity: '2'}})
        
        const testPallet4 = await Pallet.findOne({where: {capacity: '1'}})
        // const testPallet5 = await Pallet.findOne({where: {capacity: '2'}})
        // const testPallet6 = await Pallet.findOne({where: {capacity: '4'}})

        const testBox1 = await Box.findOne({where: {isReady: true}})
        // const testBox2 = await Box.findOne({where: {isReady: true}})
        // const testBox3 = await Box.findOne({where: {isReady: true}})

        // const testBox4 = await Box.findOne({where: {isReady: true}})
        // const testBox5 = await Box.findOne({where: {isReady: true}})
        // const testBox6 = await Box.findOne({where: {isReady: true}})
        
        //associations-add Pallet and Box to Warehouse
        await testWarehouse.addPallet(testPallet1)
        await testWarehouse.addPallet(testPallet2)
        await testWarehouse.addPallet(testPallet3)

        await testWarehouse2.addPallet(testPallet4)
        // await testWarehouse2.addPallet(testPallet5)
        // await testWarehouse2.addPallet(testPallet6)

        await testPallet1.addBox(testBox1)
        // await testPalletA.addBox(testBox2)
        // await testPalletA.addBox(testBox3)

        // await testPalletB.addBox(testBox4)
        // await testPalletB.addBox(testBox5)        
        // await testPalletB.addBox(testBox6)

        const PalletList = await testWarehouse.getPallets()
        const BoxList = await testPallet1.getBoxes()

        const PalletList2 = await testWarehouse2.getPallets()
        console.log(PalletList2);
        // const BoxList2 = await testPalletB.getBoxes()

        expect(PalletList.length).toBe(3)
        expect(PalletList[0] instanceof Pallet).toBeTruthy()
        expect(PalletList[0].capacity).toBe(4)
        expect(PalletList[1].capacity).toBe(3)
        expect(PalletList[2].capacity).toBe(2)

        expect(PalletList2[0].capacity).toBe(1)

        expect(BoxList.length).toBe(1)
        expect(BoxList[0] instanceof Box).toBeTruthy()
        expect(BoxList[0].isReady).toBe(true)
 
    
    })

    afterAll(async()=> {
        // await sequelize.sync({force:true})
        sequelize.close()
    })

})