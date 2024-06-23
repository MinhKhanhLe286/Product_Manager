const express = require("express");
const routerProduct = express.Router();

const productController = require("../../controller/admin/product.controller");

routerProduct.get("/", productController);

module.exports = routerProduct;
