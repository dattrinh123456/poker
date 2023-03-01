var mysql = require("mysql");
var config = require("./config");
var pool = mysql.createPool(config.sql);

module.exports = pool;
