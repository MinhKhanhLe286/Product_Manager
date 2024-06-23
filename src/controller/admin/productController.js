const { productModel } = require("../../model/productModel");

productsController = async (req, res) => {
  const filterStatus = [
    {
      name: "Tất cả",
      class: "",
      status: "",
    },
    {
      name: "Hoạt động",
      class: "",
      status: "active",
    },
    {
      name: "Dừng hoạt động",
      class: "",
      status: "inactive",
    },
  ];
  if (req.query.status) {
    let index = filterStatus.findIndex((item) => {
      return item.status == req.query.status;
    });
    filterStatus[index].class = "active";
  } else {
    filterStatus[0].class = "active";
  }

  let condition = {
    deleted: false,
  };
  if (req.query.status) {
    condition.status = req.query.status;
  }

  const products = await productModel.find(condition);

  res.render("admin/pages/products/index", {
    pageTile: "PRODUCTS",
    products: products,
    filterStatus: filterStatus,
  });
};
module.exports = { productsController };
