"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _express = require("express");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _database = _interopRequireDefault(require("../database"));

var _helpers = require("../libs/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function convertToBinary(number) {
  if (number > 0) {
    return convertToBinary(parseInt(number / 2)) + number % 2;
  }

  ;
  return '';
}

function verifyPermission(rol, method, route) {
  if (rol != undefined) {
    var urlstart = JSON.stringify(rol).indexOf(route, 1);
    var urlAccess = JSON.stringify(rol).indexOf('access', urlstart) + 8;
    var RouteAccees = JSON.stringify(rol).substring(urlAccess, urlAccess + 1) == "f" ? false : true;
    var PUTStart = JSON.stringify(rol).indexOf('PUT', urlstart) + 5;
    var DELETEStart = JSON.stringify(rol).indexOf('DELETE', urlstart) + 8;
    var POSTStart = JSON.stringify(rol).indexOf('POST', urlstart) + 6;
    var PUTAccees = JSON.stringify(rol).substring(PUTStart, PUTStart + 1) == "f" ? false : true;
    var DELETEAccees = JSON.stringify(rol).substring(DELETEStart, DELETEStart + 1) == "f" ? false : true;
    var POSTAccees = JSON.stringify(rol).substring(POSTStart, POSTStart + 1) == "f" ? false : true;
    console.log(method + "/ " + route + "=> " + RouteAccees + " PUT " + PUTAccees + " DELETE " + DELETEAccees + " POST " + POSTAccees);

    if (rol.superAdmin.access === true) {
      return true;
    } else if (rol.admin.access === true) {
      return true;
    } else {
      if (RouteAccees) {
        if (method === 'POST' && POSTAccees) return true;else if (method === 'PUT' && PUTAccees) return true;else if (method === 'DELETE' && DELETEAccees) return true;else if (method === 'GET') return true;else return false;
      } else return false;
    }
  } else return false;
}

var verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var token = req.header("x-access-token");
    var {
      baseUrl,
      method,
      url
    } = req;
    var route = "" + baseUrl.replace("/api/", "") + "";
    if (!token) return res.json({
      status: 304,
      data: {},
      msj: "no se encontró TOKEN"
    });

    try {
      var decode = _jsonwebtoken.default.verify(token, _config.default.SECRET);

      req.userId = decode.id;
      var rows = yield _database.default.query("SELECT * FROM users WHERE IdUser_PK = ?", [decode.id]);

      if (rows.length > 0) {
        var permission = (0, _helpers.decodeUserPermission)(rows[0].userPermission, decode.id, route);

        if (verifyPermission(permission, method, route)) {
          next();
        } else return res.json({
          status: 305,
          data: {},
          msj: "Usuario no cuenta con permisos para esta realiazar esta accion"
        });
      } else return res.json({
        status: 306,
        data: {},
        msj: "TOKEN Inivalido "
      });
    } catch (e) {
      console.log(e);
      return res.json({
        status: 307,
        data: e,
        msj: e
      });
    }
  });

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;