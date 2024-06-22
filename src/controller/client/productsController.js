index = (req, res) => {
  myObject = {
    title: "Products",
  };
  res.render("./client/pages/products/index.pug", myObject);
};

module.exports = {
  index,
};
