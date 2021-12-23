var express = require('express');
var router = express.Router();
const { Warehouse, Pallet} = require("../tests/index");

const {Employee} = require("../models/employee");
// bcrypt encryption imported
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get('/', (req, res) =>{
    res.redirect('/home')
})

router.get("/signin", (req, res) => {
    res.render("signin");
  });
  
  router.get("/home", (req, res) => {
    res.render("home");
  });
  
  // Post Route triggered by form submit action
  router.post("/signin"),
    async (req, res) => {
      console.log(req.body.username);
      console.log(req.body.password);
      const theEmployee = await Employee.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (!thisEmployee) {
        let employeeAlert = "Sign-in Failed";
        res.render("signin", { employeeAlert });
      } else {
        bcrypt.compare(
          req.body.password,
          thisEmployee.password,
          async function (err, result) {
            if (result) {
              let employeeAlert = `Welcome back, ${thisEmployee.username}`;
              res.render("signin", { employeeAlert });
            } else {
              let employeeAlert = "Sign-in Failed";
              res.render("signin", { employeeAlert });
            }
          }
        );
      }
    };
  
  router.get("/signup", async (req, res) => {
    res.render("signup");
  });
  
  // Singup
  router.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirm = req.body.confirm;
    console.log(`Username: ${username} Password: ${password}`)
    if (password !== confirm) {
      let employeeAlert = "Signup Failed";
      res.render("signup", { username });
    } else {
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        // add user to db based on html form data with hashed password
        const newEmployee = await Employee.create({
          username: username,
          password: hash,
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
  
  router.get("/warehouses", async (req, res) => {
    const warehouses = await Warehouse.findAll();
    res.render("warehouses", { warehouses });
  });
  
  router.get("/warehouses/:id", async (req, res) => {
    const warehouse = await Warehouse.findByPk(req.params.id);
    res.render("warehouse", { warehouse });
  });
  
  router.get("/new-warehouse-form", async (req, res) => {
    res.render("warehouseForm");
  });
  
  router.post("/warehouses", async (req, res) => {
    await Warehouse.create(req.body);
    res.redirect("warehouses");
  });
  
  router.put("/warehouses/:id", async (req, res) => {
    const updatedWarehouse = await Warehouse.update(req.body, {
      where: { id: req.params.id },
    });
    const warehouse = await Warehouse.findByPk(req.params.id);
    res.send(updatedWarehouse ? "Deleted" : "Deletion Failed");
  });
  
  router.delete("/warehouses/:id", async (req, res) => {
    const deletedWarehouse = await Warehouse.destroy({
      where: { id: req.params.id },
    });
    res.send(deletedWarehouse ? "Deleted" : "Deletion Failed");
  });
  
  // Pallet Routes
  
  router.get("/pallets", async (req, res) => {
    const pallets = await Pallet.findAll();
    res.render("pallets", { pallets });
  });
  
  router.get("/pallets/:id", async (req, res) => {
    const pallet = await Pallet.findByPk(req.params.id);
    res.render("pallet", { pallet });
  });
  
  router.get("/new-pallet-form", async (req, res) => {
    res.render("palletForm");
  });
  
  router.post("/new-pallet", async (req, res) => {
    await Pallet.create(req.body);
    res.redirect("pallets");
  });
  
  router.put("/pallets/:id", async (req, res) => {
    const updatedPallet = await Pallet.update(req.body, {
      where: { id: req.params.id },
    });
    await Pallet.findByPk(req.params.id);
    res.send(updatedPallet ? "Deleted" : "Deletion Failed");
  });
  
  router.delete("/pallets/:id", async (req, res) => {
    const deletedPallet = await Pallet.destroy({
      where: { id: req.params.id },
    });
    res.send(deletedPallet ? "Deleted" : "Deletion Failed");
  });
  
  module.exports = router;
