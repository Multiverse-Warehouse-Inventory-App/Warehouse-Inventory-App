const express = require('express')
const app = express()
const port = 3000
const {Warehouse} = require('./models/warehouse')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// support the parsing of incoming requests with urlencoded payloads (e.g. form POST)
app.use(express.urlencoded({ extended: true }));
// support the parsing of incoming requests with json payloads
app.use(express.json());
// serve static assets from the public/ folder
app.use(express.static(__dirname + '/public'));

// setup our templating engine
const handlebars = expressHandlebars.create({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set("views", "./views");

app.listen(port, () => {console.log(`Server listening at http://localhost:${port}`)})

app.get('/', (req,res)=>{
    res.redirect('/home')
})

app.get('/warehouses', async (req, res) => {
    const warehouses = await Warehouse.findAll();
    res.render("warehouses", {warehouses});
})

app.post('/warehouses', async (req, res) => {
    const warehouses = await Warehouse.create(req.body);
    res.render("warehouses", {warehouses});
})

app.put("/warehouses/:id", async (req, res) => {
    const updatedWarehouse = await Warehouse.update(req.body, {
        where : {id : req.params.id}
    })
    const warehouse = await Warehouse.findByPk(req.params.id)
    res.send(updatedWarehouse ? 'Deleted' : 'Deletion Failed')

})

app.delete('/warehouses/:id', async (req,res)=>{
    const deletedWarehouse = await Warehouse.destroy({
        where: {id:req.params.id}
    })
    res.send(deletedWarehouse ? 'Deleted' : 'Deletion Failed')
})