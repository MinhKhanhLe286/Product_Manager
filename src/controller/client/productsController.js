const ProductModel = require("../../model/productModel");

const index = async (req, res) => {
  try {
    const products = await ProductModel.find({
      deleted: false,
      status: "active",
    });

    console.log(products);
    const myObject = {
      title: "Products",
      products: products,
    };
    res.render("./client/pages/products/index.pug", myObject);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  index,
};
