index = (req, res) => {
  myObject = {
    title: "Trang chủ",
  };
  res.render("./client/pages/home/index.pug", myObject);
};

module.exports = {
  index,
};
