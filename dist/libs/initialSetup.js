"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoles = void 0;

var _database = _interopRequireDefault(require("../database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createRoles = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    var roles = yield _database.default.query("SELECT * FROM roles");
    if (roles > 0) return;
    yield _database.default.query("INSERT INTO `roles (`IdRol_PK`, `RolName`, `RolDescription`) VALUES" + "('100', 'SuperAdmin', 'Acceso total')," + "('90', 'Admin ', 'Maximo'), " + "('80', 'Gerente', 'Acceso Total Lectura'), " + "('60', 'Comercial ', 'Control requerimiento'), " + "('50', 'Lider ', 'control Ordenes'), " + "('40', 'Tecnico', 'ordenes'), " + "('30', 'Logitica ', 'a equipos'), " + "('20', 'TalentoHumano', 'Acceso Personal'), " + "('10', 'Cliente ', 'Acceso requerimiento'), " + "('0', 'Basico ', 'Acceso plataforma');");
  });

  return function createRoles() {
    return _ref.apply(this, arguments);
  };
}();

exports.createRoles = createRoles;