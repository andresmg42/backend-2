"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPermission = exports.setPermission = exports.unDelete = exports.erase = exports.del = exports.update = exports.getById = exports.getAll = exports.signup = void 0;

var _database = _interopRequireDefault(require("../database"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _helpers = require("../libs/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signup = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      IdUser_PK,
      UserName,
      UserEmail,
      UserLastName,
      IdCompany_FK,
      avatar
    } = req.body;
    var password = yield (0, _helpers.encryptPassword)(IdUser_PK + "**");
    var userPermission = (0, _helpers.encodeUserPermission)(_helpers.permissionInit, IdUser_PK);
    var maxroll = (0, _helpers.encodeUserPermission)((0, _helpers.maxRoll)(_helpers.permissionInit), IdUser_PK);
    var newUser = {
      IdUser_PK,
      UserName,
      password,
      UserLastName,
      IdCompany_FK,
      userPermission,
      UserEmail,
      maxRoll: maxroll,
      avatar
    }; // Saving in the Database

    try {
      var result = yield _database.default.query("INSERT INTO users SET ? ", newUser);

      if (result.affectedRows > 0) {
        newUser.TOKEN = _jsonwebtoken.default.sign({
          id: IdUser_PK
        }, _config.default.SECRET, {
          expiresIn: 86400 // 24 horas

        });
        newUser.Roles = [0];
        res.json({
          status: 200,
          data: {
            newUser
          },
          msj: "Usuario creado con exito"
        });
      } else {
        res.json({
          status: 204,
          data: {},
          msj: "No se pudo crear usuario, intente mas tarde"
        });
      }
    } catch (error) {
      console.log(error.sqlMessage);
      var users = yield _database.default.query("SELECT * FROM users WHERE  IdUser_PK=? AND Status ='active' ", [IdUser_PK]);
      console.log(users);

      if (users.length > 0) {
        return res.json({
          status: 204,
          data: {},
          msj: "el usuario se encuentra creado previamente"
        });
      } else {
        var usersDelete = yield _database.default.query("SELECT * FROM users WHERE IdUser_PK=? AND Status ='delete' ", [IdUser_PK]);

        if (usersDelete.length > 0) {
          return res.json({
            status: 205,
            data: {},
            msj: "el usuario se encuentra creado previamente, pero esta borrado, ¿desea restaurarlo?"
          });
        } else {
          return res.json({
            status: 206,
            data: {},
            msj: error.sqlMessage
          });
        }
      }
    }
  });

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signup = signup;

var getAll = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var users = yield _database.default.query("SELECT * FROM users WHERE Status = 'active' ");
    if (users.length < 1) return res.json({
      status: 204,
      data: {},
      msj: "No se pudo realizar consulta de usuarios"
    });
    return res.json({
      status: 200,
      data: users,
      msj: "Consulta de usuarios exitosa"
    });
  });

  return function getAll(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAll = getAll;

var getById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var {
      ColumnName,
      Value
    } = req.body;

    try {
      var SqlString = "SELECT * FROM users WHERE " + ColumnName + " LIKE '" + Value + "' AND Status='active'";
      console.log(SqlString);
      var users = yield _database.default.query(SqlString);
      if (users.length < 1) return res.json({
        status: 204,
        data: {},
        msj: "No se encontraron resultados"
      });
      return res.json({
        status: 200,
        data: users,
        msj: "Consulta de usuarios exitosa"
      });
    } catch (error) {
      return res.json({
        status: 205,
        data: {},
        msj: error.sqlMessage
      });
    }
  });

  return function getById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getById = getById;

var update = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var updateUser = {};
    var {
      IdUser_PK
    } = req.body;
    if (req.body.UserName != undefined) updateUser.UserName = req.body.UserName;
    if (req.body.Password != undefined) updateUser.Password = req.body.Password;
    if (req.body.UserLastName != undefined) updateUser.UserLastName = req.body.UserLastName;
    if (req.body.IdCompany_FK != undefined) updateUser.IdCompany_FK = req.body.IdCompany_FK;
    if (req.body.UserEmail != undefined) updateUser.UserEmail = req.body.UserEmail;
    if (req.body.avatar != undefined) updateUser.avatar = req.body.avatar;
    if (req.body.Status != undefined) updateUser.Status = req.body.Status;

    if (req.body.userPermission != undefined) {
      updateUser.userPermission = req.body.userPermission;
      updateUser.maxRoll = (0, _helpers.encodeUserPermission)((0, _helpers.maxRoll)((0, _helpers.decodeUserPermission)(updateUser.userPermission, IdUser_PK)), IdUser_PK);
    }

    ;

    try {
      var result = yield _database.default.query("UPDATE users SET ? WHERE IdUser_PK = ?", [updateUser, IdUser_PK]);
      if (result.affectedRows) res.json({
        status: 200,
        data: {},
        msj: "Usuario actualizado con exito"
      });else res.json({
        status: 204,
        data: {},
        msj: "No se pudo actualizar, intente mas tarde"
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 206,
        data: {},
        msj: error.sqlMessage
      });
    }
  });

  return function update(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.update = update;

var del = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var token = req.header("x-access-token");

    var decode = _jsonwebtoken.default.verify(token, _config.default.SECRET);

    if (req.body.IdUser_PK === decode.id) {
      return res.json({
        status: 207,
        data: {},
        msj: "No se puede borrar un usuario a si mismo"
      });
    }

    try {
      var result = yield _database.default.query("UPDATE users SET Status='delete' WHERE IdUser_PK = ?", [req.body.IdUser_PK]);
      if (result.affectedRows) res.json({
        status: 200,
        data: {},
        msj: "Usuario borrado con exito"
      });else res.json({
        status: 204,
        data: {},
        msj: "No se pudo borrar, intente mas tarde"
      });
    } catch (error) {
      return res.json({
        status: 206,
        data: {},
        msj: error.sqlMessage
      });
    }
  });

  return function del(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.del = del;

var erase = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var result = yield _database.default.query("DELETE FROM users WHERE IdUser_PK = ?", [req.body.IdUser_PK]);

      if (result.affectedRows) {
        yield _database.default.query("DELETE FROM userroles WHERE IdUser_FK = ?", [req.body.IdUser_PK]);
        res.json({
          status: 200,
          data: {},
          msj: "Usuario elminiado permanentemente con exito"
        });
      } else res.json({
        status: 204,
        data: {},
        msj: "No se pudo elminiado, intente mas tarde"
      });
    } catch (error) {
      return res.json({
        status: 206,
        data: {},
        msj: error.sqlMessage
      });
    }
  });

  return function erase(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.erase = erase;

var unDelete = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      var result = yield _database.default.query("UPDATE users SET Status='active' WHERE IdUser_PK = ?", [req.body.IdUser_PK]);
      if (result.affectedRows) res.json({
        status: 200,
        data: {},
        msj: "Usuario restaurado con exito"
      });else res.json({
        status: 204,
        data: {},
        msj: "No se pudo restaurar, intente mas tarde"
      });
    } catch (error) {
      return res.json({
        status: 206,
        data: {},
        msj: error.sqlMessage
      });
    }
  });

  return function unDelete(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); ///--metodos uniamente ara desarrollo, eliminar par productivos


exports.unDelete = unDelete;

var setPermission = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    var {
      IdUser_PK,
      permission
    } = req.body;
    var cryptRol = (0, _helpers.encodeUserPermission)(permission, IdUser_PK);

    try {
      var maxroll = (0, _helpers.encodeUserPermission)((0, _helpers.maxRoll)(permission), IdUser_PK);
      var result = yield _database.default.query("UPDATE users SET userPermission=? , maxRoll=? WHERE IdUser_PK = ?", [cryptRol, maxroll, IdUser_PK]);
      if (result.affectedRows) res.json({
        status: 200,
        data: {},
        msj: "Roles de usuario Configurado con éxito"
      });else res.json({
        status: 204,
        data: {},
        msj: "No se pudo configurar roles, intente mas tarde"
      });
    } catch (error) {
      return res.json({
        status: 206,
        data: cryptRol,
        msj: error.sqlMessage
      });
    }
  });

  return function setPermission(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.setPermission = setPermission;

var getPermission = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res) {
    var {
      IdUser_PK
    } = req.body;

    try {
      var users = yield _database.default.query("SELECT * FROM users WHERE IdUser_PK=? ", [IdUser_PK]);
      console.log(users);
      var decryptRol = (0, _helpers.decodeUserPermission)(users[0].userPermission, IdUser_PK);
      res.json({
        status: 200,
        data: decryptRol,
        msj: "obtener permisos de ususario"
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 204,
        data: {},
        msj: error
      });
    }
  });

  return function getPermission(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.getPermission = getPermission;