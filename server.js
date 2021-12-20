const express = require('express')
const app = express()
const port = 3000
const {Warehouse} = require('./models/warehouse')


app.use(express.json())
app.listen(port, () => {console.log(`Server listening at http://localhost:${port}`)})

app.get('/warehouses', async (req, res) => {
    const warehouses = await Warehouse.findAll();
    res.json({warehouses});
})

app.post('/warehouses', async (req, res) => {
    const warehouses = await Warehouse.create(req.body);
    res.json({warehouses});
})

app.put("/warehouses/:id", async (req, res) => {
    await Warehouse.update(req.body, {
        where : {id : req.params.id}
    })
    const warehouse = await Warehouse.findByPk(req.params.id)
    res.json({warehouse})

})

app.delete('/warehouses/:id', async (req,res)=>{
    const deletedWarehouse = await Warehouse.destroy({
        where: {id:req.params.id}
    })
    res.send(deletedWarehouse ? 'Deleted' : 'Deletion Failed')
})