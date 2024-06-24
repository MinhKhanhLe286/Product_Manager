const { productModel } = require("../../model/productModel");
const { filterStatusFunc } = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
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
  // Tìm kiếm
  const objectSearch = searchHelper(req.query);
  if (objectSearch.myRegex) {
    condition.title = objectSearch.myRegex;
  }
  // end search

  // pagination
  let totalDocuments = await productModel.countDocuments(condition);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItem: 4,
    },
    req.query,
    totalDocuments
  );

  // end Pagination
  // Lọc data
  const products = await productModel
    .find(condition)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/index", {
    pageTile: "PRODUCTS",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};
module.exports = { productsController };
