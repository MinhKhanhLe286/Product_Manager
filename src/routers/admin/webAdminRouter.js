const routerDashboard = require("./dashboardRouter");
const routerProduct = require("./productRouter");
const systemConfig = require("../../config/system");
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefix;

  app.use(PATH_ADMIN + "/dashboard", routerDashboard);

  app.use(PATH_ADMIN + "/products", routerProduct);
};
