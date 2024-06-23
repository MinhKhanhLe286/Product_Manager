const productModel = require("../../model/product.model");

productsController = async (req, res) => {
  const products = await productModel.find({
    deleted: false,
  });

  res.render("admin/pages/products/index", {
    pageTile: "PRODUCTS",
    products: products,
  });
};
module.exports = productsController;
