var http = require("http");
var express = require('express');
var passport = require("passport");
var app = express();
var config = require("./app/config/main");
app.set("root", __dirname);
config.root = __dirname;
app.set("config", config);
app.set("passport", passport);
require("./app/config/mongoose").init(app);
require("./app/config/express").init(app);
require("./app/config/routes").init(app);
require("./app/config/passport")(passport);

var server = http.createServer(app);

server.listen(config.port, () => {
    console.log('ENV: ' + process.env.NODE_ENV );
    console.log('Started on port: ' + config.port);

});
