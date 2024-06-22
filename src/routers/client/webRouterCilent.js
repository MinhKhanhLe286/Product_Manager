const productsRouter = require("./productRouter");
const homeRouter = require("./homeRoute");
module.exports = (app) => {
  app.use("/", homeRouter);
  app.use("/products", productsRouter);
};
