const express = require("express");
const routerProduct = express.Router();

const {
  productsController,
  changeStatus,
} = require("../../controller/admin/productController");

routerProduct.get("/", productsController);
routerProduct.get("/change-status/:status/:id", changeStatus);

module.exports = routerProduct;
