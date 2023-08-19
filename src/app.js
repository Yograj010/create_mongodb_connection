require("dotenv").config();
const mongoose = require("mongoose");
const config = require("./_helpers/config");
// console.log("/////debug:config ==", config);

let connectionString =  `mongodb://${config.DbHost}:${config.DbPort}`
// console.log("/////debug:connectionString ==", connectionString);

mongoose
  .connect(`${connectionString}/${config.DbName}`)
  .then(() => {
    console.log(`Successfully connected with DB. \nserver running on port ${config.DbPort}`);
  })
  .catch((err) => {
    console.log("Error connecting to Mongo: ", err);
  });
