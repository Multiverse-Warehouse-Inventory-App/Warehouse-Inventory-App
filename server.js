const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
// bcrypt encryption imported
const bcrypt = require('bcrypt')
const saltRounds = 10
const { sequelize } = require('./db')
const { Warehouse, Pallet } = require("./tests/index");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

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

app.listen(port, () => {
  sequelize.sync(() => {
  console.log(`Server listening at http://localhost:${port}`);
  })
});

app.get('/signin', (req, res)=>{
    res.render('signin')
})

app.get('/home', (req, res)=>{
  res.render('home')
})

// Post Route triggered by form submit action
app.post('/signin'), async (req,res) =>{
  const theEmployee = await Employee.findOne({
    where: {
        username: req.body.username
    }
  })
  if(!thisEmployee){
    let employeeAlert = 'Sign-in Failed'
    res.render('signin', {employeeAlert})
  }else{
    bcrypt.compare(req.body.password, thisEmployee.password, async function (err, result){
      if (result){
         let employeeAlert = `Welcome back, ${thisEmployee.username}`
         res.render('signin', {employeeAlert})
      }else {
         let employeeAlert = 'Sign-in Failed'
         res.render('signin', {employeeAlert})
      }
      
    })
  }
}


app.get('/signup', async (req,res) =>{
    res.render('signup')
})

// Singup
app.post('/signup', async (req,res) =>{
    const username = req.body.username
    const password = req.body.password
    const confirm = req.body.confirm
      if(password!==confirm){
        let employeeAlert = 'Signup Failed'
        res.render('signup',{username})
    }else {
        bcrypt.hash(password, saltRounds, async function (err,hash){
        // add user to db based on html form data with hashed password
          const newEmployee = await Employee.create({'username':username, 'password':hash}) 
          let employeeAlert = `Welcome, $(newEmployee.username)!`
          const foundEmployee = await Employee.findByPk(newEmployee.id)
          if(foundEmployee){
             res.render('signup',{employeeAlert})
          }else {
            employeeAlert = 'Signup Failed'
            res.render('signup', {employeeAlert})
          }
        
      })
    }
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