const { productModel } = require("../../model/productModel");
const { filterStatusFunc } = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");

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

  let objectPagination = {
    currentPage: 1,
    limitItem: 4,
  };
  if (req.query.page) {
    objectPagination.currentPage = parseInt(req.query.page);
  }
  console.log(">>>check pagination = " + objectPagination.currentPage);
  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItem;

  let totalDocuments = await productModel.countDocuments(condition);

  objectPagination.totalPage = Math.ceil(
    totalDocuments / objectPagination.limitItem
  );

  console.log(">>>> check doucs =", totalDocuments);

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
