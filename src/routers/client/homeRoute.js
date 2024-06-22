const exprees = require("express");
const roter = exprees.Router();

const { index } = require("../../controller/client/homeController");
/**
 *  .đay là trang chủ
 */
roter.get("/", index);

module.exports = roter;
