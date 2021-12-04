"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _package = _interopRequireDefault(require("../package.json"));

var _config = _interopRequireDefault(require("./config"));

var _cors = _interopRequireDefault(require("cors"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import {createRoles} from "./libs/initialSetup";
var {
  database,
  port
} = _config.default;
var app = (0, _express.default)(); //createRoles();

app.use(_express.default.json());
app.set('pkg', _package.default);
app.use((0, _morgan.default)('dev'));
app.use((0, _cors.default)()); // Settings

app.set("port", port);
app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
    author: app.get('pkg').author
  });
});
app.use(_index.default);
var _default = app;
exports.default = _default;