const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();
const config = require("./app/_helpers/config");
const errorHandler = require("./app/_helpers/errorHandler");

const app = express();

/*----hosting_localhost_folder_on_localhost----*/
app.use("/assets",express.static('public'));

/*--To parse incoming POST request data --*/
// parse application/json
app.use(express.json({limit: '50mb'}));    //will handle data in JSON request, we have fixed the limit
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));    //will handle data in request is in URL-encoded format, like from forms, here we have extended the limit
/*----------------------------------------*/
app.use(errorHandler);
require("./app/routes")(app);

/*----------Create mongoDb connection---------*/
const connectionString = `mongodb://${config.mongoDBHost}:${config.mongoDBPort}/${config.mongoCollection}`

// Connect to the MongoDB database
mongoose.connect(connectionString)

// Get the default connection
const db = mongoose.connection;

//see logs in console/terminal 
mongoose.set('debug', true)

// Event handler for connection errors
db.on('error', console.error.bind(console,"MongoDb Connection error: "));

// Event handler for successful connection
db.once('open', () => {
  console.log("Successfully connected to mongoDb: "+ config.mongoCollection,)
});
/*--------------------------------------------*/

/*-----Creating Express server----*/
const serverType = config.serverType;
const host = config.serverHost;

/* Normalize a port into a number or false. */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(config.serverPort);

app.listen(port, host, () => {
  console.log(`Server is running at ${serverType}://${host}:${port}`);
});
/*-----------------------------*/