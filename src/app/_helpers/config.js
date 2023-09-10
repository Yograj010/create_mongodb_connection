const path = require('path')

settings = {
  serverType: process.env.SERVER_TYPE || "http",
  serverHost: process.env.HOST || "localhost",
  serverPort: process.env.PORT || "3000",

  mongoDBHost: process.env.MONGO_DB_HOST || "localhost",
  mongoDBPort: process.env.MONGO_DB_PORT || 27017,
  mongoCollection: process.env.MONGO_COLLECTION || "TestBase64",
  dbOptions: {},

  saltRounds: process.env.PWD_SALT_ROUND || 10,
  uploadFilePath: "./public/uploaded-files/images/",
  fileEncodingMethod: "utf8",

  globalErrMsg: "Something went wrong, please try again later.",
};

module.exports = settings;
