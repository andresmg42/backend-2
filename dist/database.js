"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _util = require("util");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var {
  database
} = _config.default;

var pool = _mysql.default.createPool(database);

pool.getConnection((err, connection) => {
  if (connection) connection.release();
  console.log("DB is Connected");

  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }

    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has to many connections");
    }

    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
    }
  }

  return;
}); // Promisify Pool Querys

pool.query = (0, _util.promisify)(pool.query);
var _default = pool;
exports.default = _default;