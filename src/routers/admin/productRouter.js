const express = require("express");
const routerProduct = express.Router();

const {
  productsController,
  changeStatusFeature,
  changeMultiFeater,
  deleteItem,
} = require("../../controller/admin/productController");

routerProduct.get("/", productsController);
routerProduct.patch("/change-status/:status/:id", changeStatusFeature);
routerProduct.patch("/change-multi", changeMultiFeater);

routerProduct.delete("/delete/:id", deleteItem);
module.exports = routerProduct;
