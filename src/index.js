const express = require("express");
const app = express();
const port = 3000;
const hostname = "localhost";
const viewEngine = require("./config/viewEngine");

// use mongoose connection to database
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Product-manager");

const Product = mongoose.model("Product", {
  title: String,
  price: Number,
  thimnail: String,
});
// end use mongoose connection to database

// config view engine và static file
viewEngine(app);
// end config view engine và static file
app.get("/", (req, res) => {
  res.send("Lê MInh Khánh learning nodejs expres");
});
app.get("/products", async (req, res) => {
  const products = await Product.find({});
  console.log(products);
  res.send("<h1>Danh sách sản phẩm</h1>");
});
app.get("/xinchao", (req, res) => {
  res.render("demo.pug");
});
app.listen(port, hostname, () => {
  console.log("###########################################");
  console.log(`# Example app listening on ${hostname}:${port} #`);
  console.log("###########################################");
});
