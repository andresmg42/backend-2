"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("./users.routes"));

var _auth = _interopRequireDefault(require("./auth.routes"));

var _companies = _interopRequireDefault(require("./companies.routes"));

var _cliente = _interopRequireDefault(require("./cliente.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.use("/api/auth", _auth.default);
router.use("/api/client", _cliente.default);
router.use("/api/user", _users.default);
router.use("/api/companies", _companies.default);
var _default = router;
exports.default = _default;