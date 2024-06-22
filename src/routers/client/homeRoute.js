const exprees = require("express");
const roter = exprees.Router();
/**
 *  .đay là trang chủ
 */
roter.get("/", (req, res) => {
  res.send("Trang chủ ");
});

module.exports = roter;
