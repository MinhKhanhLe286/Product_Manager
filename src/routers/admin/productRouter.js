const express = require("express");
const routerProduct = express.Router();

const {
  productsController,
  changeStatusFeature,
} = require("../../controller/admin/productController");

routerProduct.get("/", productsController);
routerProduct.patch("/change-status/:status/:id", changeStatusFeature);

module.exports = routerProduct;
