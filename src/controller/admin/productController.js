const { productModel } = require("../../model/productModel");
const { filterStatusFunc } = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
// [GET] admin/products
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
      limitItem: 8,
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
// [PATCH] /admin/products/change-status/:status/:id
changeStatusFeature = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await productModel.updateOne(
    { _id: id },
    {
      status: status,
    }
  );
  res.redirect("back");
};
// [PATCH] /admin/products/change-multi
changeMultiFeater = async (req, res) => {
  const { type, ids } = req.body;
  let idsList = ids.split(", ");

  switch (type) {
    case "active":
      await productModel.updateMany(
        {
          _id: { $in: idsList },
        },
        {
          status: "active",
        }
      );
      break;

    case "inactive":
      await productModel.updateMany(
        {
          _id: { $in: idsList },
        },
        {
          status: "inactive",
        }
      );
      break;

    default:
      break;
  }

  res.redirect("back");
};
// [DELETE] /admin/product/delete/:id
deleteItem = async (req, res) => {
  const id = req.params.id;
  await productModel.updateOne(
    { _id: id },
    {
      deleted: true,
    }
  );

  res.redirect("back");
};

module.exports = {
  productsController,
  changeStatusFeature,
  changeMultiFeater,
  deleteItem,
};
