const exprees = require("express");
const roter = exprees.Router();

const { index } = require("../../controller/client/productsController");
/**
 *  .../products/
 *  .../products/create
 *  ...
 */
roter.get("/", index);

module.exports = roter;
