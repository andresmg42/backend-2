"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeUserPermission = exports.encodeUserPermission = exports.permissionInit = exports.matchPassword = exports.maxRoll = exports.encryptPassword = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var encryptPassword = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (password) {
    var salt = yield _bcryptjs.default.genSalt(10);
    var hash = yield _bcryptjs.default.hash(password, salt);
    return hash;
  });

  return function encryptPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.encryptPassword = encryptPassword;

var maxRoll = userPermission => {
  if (userPermission.superAdmin.access) return {
    name: "superAdmin",
    value: 100
  };else if (userPermission.admin.access) return {
    name: "admin",
    value: 90
  };else if (userPermission.manager.access) return {
    name: "gerente",
    value: 80
  };else if (userPermission.humanTalent.access) return {
    name: "talentoHumano",
    value: 60
  };else if (userPermission.leader.access) return {
    name: "lider",
    value: 50
  };else if (userPermission.technical.access) return {
    name: "tecnico",
    value: 40
  };else if (userPermission.logistic.access) return {
    name: "logistica",
    value: 30
  };else if (userPermission.commercial.access) return {
    name: "comercial",
    value: 20
  };else if (userPermission.client.access) return {
    name: "cliente",
    value: 10
  };else return {
    name: "Basico",
    value: 0
  };
};

exports.maxRoll = maxRoll;

var matchPassword = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (password, savedPassword) {
    try {
      return yield _bcryptjs.default.compare(password, savedPassword);
    } catch (e) {
      console.log(e);
    }
  });

  return function matchPassword(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.matchPassword = matchPassword;
var permissionInit = {
  user: {
    access: false,
    PUT: false,
    DELETE: false,
    POST: false
  },
  companies: {
    access: false,
    PUT: false,
    DELETE: false,
    POST: false
  },
  employes: {
    access: false,
    PUT: false,
    DELETE: false,
    POST: false
  },
  client: {
    access: false,
    PUT: false,
    DELETE: false,
    POST: false
  },
  commercial: {
    access: false,
    PUT: false,
    DELETE: false,
    POST: false
  },
  logistic: {
    access: false,
    PUT: false,
    DELETE: false,
    POST: false
  },
  technical: {
    access: false,
    PUT: false,
    DELETE: false,
    POST: false
  },
  leader: {
    access: false,
    PUT: false,
    DELETE: false,
    POST: false
  },
  humanTalent: {
    access: false,
    PUT: false,
    DELETE: false,
    POST: false
  },
  manager: {
    access: false,
    PUT: false,
    DELETE: false,
    POST: false
  },
  admin: {
    access: false,
    PUT: false,
    DELETE: false,
    POST: false
  },
  superAdmin: {
    access: false,
    PUT: false,
    DELETE: false,
    POST: false
  }
};
exports.permissionInit = permissionInit;

var encodeUserPermission = (JSONRoles, key) => {
  return _cryptoJs.default.AES.encrypt(JSON.stringify(JSONRoles), key).toString();
};

exports.encodeUserPermission = encodeUserPermission;

var decodeUserPermission = (encryptedRoles, key) => {
  return JSON.parse(_cryptoJs.default.AES.decrypt(encryptedRoles.toString(), key).toString(_cryptoJs.default.enc.Utf8));
};

exports.decodeUserPermission = decodeUserPermission;