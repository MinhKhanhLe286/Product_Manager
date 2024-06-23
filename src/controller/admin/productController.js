const { productModel } = require("../../model/productModel");
const { filterStatusFunc } = require("../../helper/filterStatus");
productsController = async (req, res) => {
  // use Filter for helper
  const filterStatus = filterStatusFunc(req.query);
  // end user filter status
  let condition = {
    deleted: false,
  };
  if (req.query.status) {
    condition.status = req.query.status;
  }
  keyword = "";
  if (req.query.keyword) {
    keyword = req.query.keyword;

    let regex = new RegExp(keyword, "i");
    condition.title = regex;
  }
  // Lọc data
  const products = await productModel.find(condition);

  res.render("admin/pages/products/index", {
    pageTile: "PRODUCTS",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword,
  });
};
module.exports = { productsController };
