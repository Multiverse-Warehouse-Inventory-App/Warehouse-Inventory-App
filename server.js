const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { sequelize } = require("./db");
const { Warehouse, Pallet } = require("./tests/index");
const { Employee } = require('./models/employee')
// bcrypt encryption imported
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const handlebars = expressHandlebars.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

// serve static assets from the public/ folder
app.use(express.static(__dirname + "/public"));
// support the parsing of incoming requests with json payloads
app.use(express.json());
// support the parsing of incoming requests with urlencoded payloads (e.g. form POST)
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) =>{
  res.redirect('/signin')
})

app.get("/home", (req, res) => {
res.render("home");
});

app.get("/about", (req, res) => {
res.render("about");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

// Post Route triggered by form submit action
app.post('/signin', async (req,res) =>{
  const theEmployee = await Employee.findOne({
      where: {
          username: req.body.username
      }
  })
    if (!theEmployee) {
      let employeeAlert = "Sign-in Failed";
      res.render("signin", { employeeAlert });
    } else {
      bcrypt.compare(
        req.body.password,
        theEmployee.password,
        async function (err, result) {
          if (result) {
            let employeeAlert = `Welcome back, ${theEmployee.username}`;
            res.redirect("warehouses");
          } else {
            let employeeAlert = "Sign-in Failed";
            res.render("signin", { employeeAlert });
          }
        }
      );
    }
  });

app.get("/signup", async (req, res) => {
  res.render("signup");
});

// Signup
app.post("/signup", async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const confirm = req.body.confirm
  console.log(`Username: ${username} Password: ${password}`)
  if (password !== confirm) {
    let employeeAlert = "Signup Failed";
    res.render("signup", { employeeAlert });
  } else {
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      // add user to db based on html form data with hashed password
      const newEmployee = await Employee.create({
        username: username,
        password: hash
      });
      let employeeAlert = `Welcome, ${newEmployee.username}!`;
      const foundEmployee = await Employee.findByPk(newEmployee.id);
      if (foundEmployee) {
        res.render("signup", { employeeAlert });
      } else {
        employeeAlert = "Signup Failed";
        res.render("signup", { employeeAlert });
      }
    });
  }
});

// Warehouse Routes

app.get("/warehouses", async (req, res) => {
  const warehouses = await Warehouse.findAll();
  res.render("warehouses", { warehouses });
});

app.get("/warehouses/:id", async (req, res) => {
  const thisWarehouse = await Warehouse.findByPk(req.params.id, {include: {all:true}})
  res.render("warehouse", { thisWarehouse});
});

app.get("/new-warehouse-form", async (req, res) => {
  res.render("warehouseForm");
});

app.post("/warehouses", async (req, res) => {
  await Warehouse.create(req.body);
  res.redirect("warehouses");
});

app.put("/warehouses/:id", async (req, res) => {
  const updatedWarehouse = await Warehouse.update(req.body, {
    where: { id: req.params.id },
  });
  const warehouse = await Warehouse.findByPk(req.params.id);
  res.send(updatedWarehouse ? "Deleted" : "Deletion Failed");
});

app.delete("/warehouses/:id", async (req, res) => {
  const deletedWarehouse = await Warehouse.destroy({
    where: { id: req.params.id },
  });
  res.send(deletedWarehouse ? "Deleted" : "Deletion Failed");
});

// Pallet Routes

app.get("/pallets", async (req, res) => {
  const pallets = await Pallet.findAll();
  res.render("pallets", { pallets });
});

app.get("/pallets/:id", async (req, res) => {
  const pallet = await Pallet.findByPk(req.params.id);
  res.render("pallet", { pallet });
});


app.put("/pallets/:id", async (req, res) => {
  const updatedPallet = await Pallet.update(req.body, {
    where: { id: req.params.id },
  });
  await Pallet.findByPk(req.params.id);
  res.send(updatedPallet ? "Deleted" : "Deletion Failed");
});

app.delete("/pallets/:id", async (req, res) => {
  const deletedPallet = await Pallet.destroy({
    where: { id: req.params.id },
  });
  res.send(deletedPallet ? "Deleted" : "Deletion Failed");
});

app.get('/addPallet', async (req, res) =>{
  const allWarehouses = await Warehouse.findAll()
  res.render('addPallet', {allWarehouses})
})

app.post('/addPallet', async (req,res) => {
  const newPallet = await Pallet.create(req.body);
  const thisWarehouse = await Warehouse.findByPk(newPallet.WarehouseId)
  const Pallets = await Pallet.findAll()  
  res.redirect('/warehouses/'+ thisWarehouse.id)
})

app.listen(port, () => {
  sequelize.sync(() => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});