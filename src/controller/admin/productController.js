const { productModel } = require("../../model/productModel");

const systemConfig = require("../../config/system");
const prefix = systemConfig.prefix;
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
    .sort({ position: "desc" })
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
    case "delete-all":
      await productModel.updateMany(
        {
          _id: { $in: idsList },
        },
        {
          deleted: true,
          deleteAt: new Date(),
        }
      );
      break;

    case "change-position":
      for (const item of idsList) {
        let [id, position] = item.split("-");
        position = parseInt(position);

        await productModel.updateOne(
          { _id: id },
          {
            position: position,
          }
        );
      }
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
      deleteAt: new Date(),
    }
  );

  res.redirect("back");
};
// [Get] /admin/product/create
createProduct = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTile: "Thêm mới sản phẩm",
  });
};

// [POST] /admin/product/create

createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  console.log(req.body);

  if (req.body.position == "") {
    const countProduct = await productModel.countDocuments();
    req.body.position = countProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const product = new productModel(req.body);
  await product.save();
  res.redirect(`${prefix}/products`);
};
module.exports = {
  productsController,
  changeStatusFeature,
  changeMultiFeater,
  deleteItem,
  createProduct,
  createPost,
};
