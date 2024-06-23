const express = require("express");
const routerProduct = express.Router();

const {
  productsController,
} = require("../../controller/admin/productController");

routerProduct.get("/", productsController);

module.exports = routerProduct;
