require("dotenv").config();
const methodOverride = require("method-override");
const express = require("express");
const viewEngine = require("./config/viewEngine");
const clientRouter = require("./routers/client/webRouterCilent");
const adminRouter = require("./routers/admin/webAdminRouter");
const app = express();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

const system = require("./config/system.js");
// use mongoose connection to database

const { connectMONGODB } = require("./config/database");
connectMONGODB();
// end use mongoose connection to database

// config app use methodoverride
app.use(methodOverride("_method"));
// end code

// config view engine và static file
viewEngine(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// end config view engine và static file
// setup local Variable;
app.locals.prefixAdmin = system.prefix;

// use router clinet && admin
clientRouter(app);
adminRouter(app);
// end use router clinet && admin
app.get("/xinchao", (req, res) => {
  res.render("demo.pug");
});

app.listen(port, hostname, () => {
  console.log("###########################################");
  console.log(`# Example app listening on ${hostname}:${port} `);
  console.log("###########################################");
});
