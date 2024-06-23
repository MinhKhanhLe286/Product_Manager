const { productModel } = require("../../model/productModel");

productsController = async (req, res) => {
  const products = await productModel.find({
    deleted: false,
  });

  res.render("admin/pages/products/index", {
    pageTile: "PRODUCTS",
    products: products,
  });
};
module.exports = { productsController };
