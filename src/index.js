require("dotenv").config();
const express = require("express");
const viewEngine = require("./config/viewEngine");
const clientRouter = require("./routers/client/webRouterCilent");

const app = express();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

// use mongoose connection to database

const { connectMONGODB } = require("./config/database");
connectMONGODB();
// end use mongoose connection to database

// config view engine và static file
viewEngine(app);
// end config view engine và static file

// use router clinet
clientRouter(app);
// end use router clinet
app.get("/xinchao", (req, res) => {
  res.render("demo.pug");
});

app.listen(port, hostname, () => {
  console.log("###########################################");
  console.log(`# Example app listening on ${hostname}:${port} `);
  console.log("###########################################");
});
