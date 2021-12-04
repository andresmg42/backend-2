"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recoverypsw = exports.signin = exports.isSignin = void 0;

var _database = _interopRequireDefault(require("../database"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _helpers = require("../libs/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isSignin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var token = req.header("x-access-token");
    if (!token) return res.json({
      status: 204,
      data: {},
      msj: "no se encontró TOKEN"
    });

    try {
      var decode = _jsonwebtoken.default.verify(token, _config.default.SECRET);

      req.userId = decode.id;
      var rows = yield _database.default.query("SELECT * FROM users WHERE IdUser_PK = ?", [decode.id]);
      if (rows.length < 1) return res.json({
        status: 204,
        data: {},
        msj: "TOKEN Inivalido "
      }); //*/

      res.json({
        status: 200,
        data: {},
        msj: "Sesion Activa"
      });
    } catch (e) {
      console.log("token incorrecto" + e);
      return res.json({
        status: 204,
        data: {},
        msj: "TOKEN error "
      });
    }
  });

  return function isSignin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.isSignin = isSignin;

var signin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var {
      IdUser_PK,
      Password
    } = req.body;
    var rows = yield _database.default.query("SELECT * FROM users WHERE IdUser_PK = ? AND Status ='active'", [IdUser_PK]);

    if (rows.length > 0) {
      var user = rows[0];
      var validPassword = yield _bcryptjs.default.compare(Password, user.Password);

      if (validPassword) {
        user.TOKEN = _jsonwebtoken.default.sign({
          id: IdUser_PK
        }, _config.default.SECRET, {
          expiresIn: 86400 // 24 horas

        });
        res.json({
          status: 200,
          data: user,
          msj: "Bienvenido " + user.UserName
        });
      } else {
        res.json({
          status: 205,
          data: {},
          msj: "Contraseña Incorrecta"
        });
      }
    } else {
      res.json({
        status: 204,
        data: {},
        msj: "Usuario incorrecto"
      });
    }
  });

  return function signin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signin = signin;

var recoverypsw = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var {
      IdUser_PK,
      UserEmail
    } = req.body;
    var rows = yield _database.default.query("SELECT * FROM users WHERE IdUser_PK = ? AND UserEmail = ? ", [IdUser_PK, UserEmail]);
    if (rows.length < 1) return res.json({
      status: 204,
      data: {},
      msj: "Usuarios o E-mail incorrectos "
    });
    var password = yield (0, _helpers.encryptPassword)(IdUser_PK + "**"); // Updating in the Database

    var result = yield _database.default.query("UPDATE users SET Password=? WHERE IdUser_PK=?", [password, IdUser_PK]);
    if (result.affectedRows) return res.json({
      status: 200,
      data: {},
      msj: "Contraseña actualizada con exito"
    });
    return res.json({
      status: 204,
      data: {},
      msj: " No se pudo actualizar contraseña, intente mas tarde"
    });
  });

  return function recoverypsw(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.recoverypsw = recoverypsw;