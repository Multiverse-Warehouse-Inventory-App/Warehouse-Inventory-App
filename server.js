const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { sequelize } = require("./db");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const warehouseDB = require("./routes/routes");

app.use('/', warehouseDB);

// support the parsing of incoming requests with urlencoded payloads (e.g. form POST)
app.use(express.urlencoded({ extended: true }));
// support the parsing of incoming requests with json payloads
app.use(express.json());
// serve static assets from the public/ folder
app.use(express.static(__dirname + "/public"));

// setup our templating engine
const handlebars = expressHandlebars.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.listen(port, () => {
  sequelize.sync(() => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});