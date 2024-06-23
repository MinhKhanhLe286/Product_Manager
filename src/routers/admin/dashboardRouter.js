const dashloardConttroler = require("../../controller/admin/dashboardController");

const express = require("express");
const routerDashboard = express.Router();

routerDashboard.get("/", dashloardConttroler);

module.exports = routerDashboard;
