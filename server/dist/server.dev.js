"use strict";

var express = require('express');

var app = express();
app.use(express.json());
app.get('/', function (req, res, next) {
  res.status(200).send({
    message: "This is the homepage of my API, Hello there"
  });
});
var port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log("Listening on port ".concat(port, "....."));
});