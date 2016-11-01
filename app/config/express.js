var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var config = require("./main");
var morgan = require("morgan");
var passport = require("passport");

module.exports.init = initExpress;
function initExpress (app) {

    app.use(bodyParser.urlencoded ({ extend : true}));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static( app.get("root") + "/public"));
    
}
