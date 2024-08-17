const express = require("express");
const routerProduct = express.Router();

const {
  productsController,
  changeStatusFeature,
  changeMultiFeater,
  deleteItem,
  createProduct,
  createPost,
} = require("../../controller/admin/productController");

routerProduct.get("/", productsController);
routerProduct.patch("/change-status/:status/:id", changeStatusFeature);
routerProduct.patch("/change-multi", changeMultiFeater);

routerProduct.delete("/delete/:id", deleteItem);

routerProduct.get("/create", createProduct);

routerProduct.post("/create", createPost);

module.exports = routerProduct;
