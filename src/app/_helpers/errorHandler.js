const config = require("./config");
const baseController = require("./base");
const baseCtrl = new baseController();

function errorHandler(err, req, res, next) {
  let resObj = {
    message: config.globalErrMsg,
    errorDetail: err.stack,
  };
  // console.log("Error_handler: ", response);
  return baseCtrl.errorResponse(res, 500, resObj);
}

module.exports = errorHandler;
