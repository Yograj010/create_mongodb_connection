// const errorHandler = require("./_helpers/errorHandler");

function apiRoutes(app) {

  app.use("/user", require("./modules/user/index"));

  // app.use(errorHandler);
}

module.exports = apiRoutes;
