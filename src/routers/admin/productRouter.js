const express = require("express");
const routerProduct = express.Router();

const {
  productsController,
  changeStatusFeature,
  changeMultiFeater,
} = require("../../controller/admin/productController");

routerProduct.get("/", productsController);
routerProduct.patch("/change-status/:status/:id", changeStatusFeature);
routerProduct.patch("/change-multi", changeMultiFeater);

module.exports = routerProduct;
