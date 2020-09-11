"use strict";

var express = require("express");

var app = express();

var mongoose = require("mongoose");

var morgan = require("morgan");

var bodyParser = require("body-parser");

var cors = require("cors");

var userRoutes = require('./signin/routes/user');

var blogger = require("./controller/blogs"); //connect("mongodb://localhost:27017/updates", { useNewUrlParser: true })


mongoose.connect("mongodb+srv://Happy:RA2WH9nFd5erM52@datastore.jdhkk.mongodb.net/Store?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log('database connected');
})["catch"](function () {
  console.log('connection has failed');
});
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
app.get('/', function (req, res) {
  res.json({
    "message": "Welcome to My Backend"
  });
});

var allowCrossDomain = function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);
app.use("/", blogger);
app.use("/user", userRoutes);
var port = 3000 || process.env.PORT;
app.listen(port, function () {
  console.log("Server is listening on port ".concat(port, "...."));
}); // Connect to MongoDB database
//"mongodb://localhost:27017/updates"
//mongodb+srv://Happy:<password>@datastore.jdhkk.mongodb.net/<dbname>?retryWrites=true&w=majority