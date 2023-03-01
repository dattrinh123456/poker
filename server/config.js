const dotenv = require("dotenv");
dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  SQL_SERVER,
  SQL_DATABASE,
  SQL_USER,
  SQL_PASSWORD,
  SQL_HOST,
} = process.env;

module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  sql: {
    host: SQL_HOST,
    database: SQL_DATABASE,
    user: SQL_USER,
    password: SQL_PASSWORD,
    port: 3306,
    multipleStatements: true,
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
  },
};
