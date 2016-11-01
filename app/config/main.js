var ENV = process.env.NODE_ENV || 'local';
var config = require("./environment/" + ENV.toLowerCase());
module.exports = config;
