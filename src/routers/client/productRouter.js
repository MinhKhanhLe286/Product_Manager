const exprees = require("express");
const roter = exprees.Router();
/**
 *  .../products/
 *  .../products/create
 *  ...
 */
roter.get("/", (req, res) => {
  res.send("Trang chủ products");
});

module.exports = roter;
