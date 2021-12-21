const express = require("express");
const app = express();
const port = 3000;
const { Warehouse, Pallet } = require("./models");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

// support the parsing of incoming requests with urlencoded payloads (e.g. form POST)
app.use(express.urlencoded({ extended: true }));
// support the parsing of incoming requests with json payloads
app.use(express.json());
//serve static assets from public folder
app.use(express.static("public"));
// setup our templating engine
const handlebars = expressHandlebars.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.redirect("/signin");
});

// Routes for Warehouse Model

app.get("/warehouses", async (req, res) => {
  const warehouses = await Warehouse.findAll();
  res.render("warehouses", { warehouses });
});

app.get("/warehouses/:id", async (req, res) => {
  const warehouse = await Warehouse.findByPk(req.params.id);
  res.render("warehouse", { warehouse });
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

// Routes for Pallet Model

app.get("/pallets", async (req, res) => {
  const pallets = await Pallet.findAll();
  res.render("pallets", { pallets });
});

app.get("/pallets/:id", async (req, res) => {
  const pallet = await Pallet.findByPk(req.params.id);
  res.render("pallet", { pallet });
});

app.get("/new-pallet-form", async (req, res) => {
  res.render("palletForm");
});

app.post("/new-pallet", async (req, res) => {
  await Pallet.create(req.body);
  res.redirect("pallets");
});

app.put("/pallets/:id", async (req, res) => {
  await Pallet.update(req.body, {
    where: { id: req.params.id },
  });
  const pallet = await Pallet.findByPk(req.params.id);
  res.render("pallet", { pallet });
});

app.delete("/pallets/:id", async (req, res) => {
    const deletedPallet = await Pallet.destroy({
      where: { id: req.params.id },
    });
    res.send(deletedPallet ? "Deleted" : "Deletion Failed");
  });