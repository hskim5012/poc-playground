"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = process.env.PORT || 3006;
app.get("/", function (req, res, next) {
    res.json(Date.now());
});
//3, 2, 1, go!
app.listen(port, function () {
    console.info("Listening on port: " + port);
});
