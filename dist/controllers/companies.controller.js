"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eraseCompanyById = exports.updateCompany = exports.undeleteCompany = exports.deleteCompanyById = exports.getCompanies = exports.getCompanyById = exports.createCompany = void 0;

var _database = _interopRequireDefault(require("../database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createCompany = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      Razon_Social,
      Representante_Legal,
      Actividad_Economica,
      Persona_Contacto,
      Telefono_Contacto,
      IdCompany_PK
    } = req.body;
    var insertData = {
      IdCompany_PK,
      Razon_Social,
      Representante_Legal,
      Actividad_Economica,
      Persona_Contacto,
      Telefono_Contacto
    };

    try {
      var result = yield _database.default.query("INSERT INTO company SET ? ", [insertData]);
      if (result.affectedRows) res.json({
        status: 200,
        data: {},
        msj: "Compañia creada con exito con exito"
      });else res.json({
        status: 204,
        data: {},
        msj: "No se pudo crear compañia, intentelo nuevamente"
      });
    } catch (error) {
      res.json({
        status: 205,
        data: {},
        msj: "No se pudo crear compañia, verifique que no ha sido creada previamente"
      });
    }
  });

  return function createCompany(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createCompany = createCompany;

var getCompanyById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var company = yield _database.default.query("SELECT * FROM company WHERE IdCompany_PK=?", [req.params.id]);
    if (company.length > 0) res.json({
      status: 200,
      data: company,
      msj: "Empresa consultada con exito"
    });else res.json({
      status: 204,
      data: {},
      msj: "No se encontrardo datos para es ID"
    });
  });

  return function getCompanyById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getCompanyById = getCompanyById;

var getCompanies = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var companies = yield _database.default.query("SELECT * FROM company  WHERE Status='active' ");
    res.json({
      status: 200,
      data: companies,
      msj: "Empresas consultadas con exito"
    });
  });

  return function getCompanies(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getCompanies = getCompanies;

var deleteCompanyById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var Status = "delete";
    var result = yield _database.default.query("UPDATE company SET Status=? WHERE  Status='active' AND IdCompany_PK = ?", [Status, req.params.id]);
    if (result.affectedRows) res.json({
      status: 200,
      data: {},
      msj: "Compañia borrada con exito con exito"
    });else res.json({
      status: 204,
      data: {},
      msj: "No se pudo borra compañia, intente mas tarde"
    });
  });

  return function deleteCompanyById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteCompanyById = deleteCompanyById;

var undeleteCompany = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var Status = "active";
    var result = yield _database.default.query("UPDATE company SET Status=? WHERE  Status='delete' AND IdCompany_PK = ?", [Status, req.params.id]);
    if (result.affectedRows) res.json({
      status: 200,
      data: {},
      msj: "Compañia restaurada con exito con exito"
    });else res.json({
      status: 204,
      data: {},
      msj: "No se pudo restaurar compañia, intente mas tarde"
    });
  });

  return function undeleteCompany(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.undeleteCompany = undeleteCompany;

var updateCompany = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    var {
      Razon_Social,
      Representante_Legal,
      Actividad_Economica,
      Persona_Contacto,
      Telefono_Contacto,
      IdCompany_PK
    } = req.body;
    var UpdateData = {
      Razon_Social,
      Representante_Legal,
      Actividad_Economica,
      Persona_Contacto,
      Telefono_Contacto
    };
    var result = yield _database.default.query("UPDATE company SET ? WHERE IdCompany_PK = ?", [UpdateData, IdCompany_PK]);
    if (result.affectedRows) res.json({
      status: 200,
      data: {},
      msj: "Compañia actualizada con exito con exito"
    });else res.json({
      status: 204,
      data: {},
      msj: "No se pudo actualizar, intente mas tarde"
    });
  });

  return function updateCompany(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateCompany = updateCompany;

var eraseCompanyById = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    var Status = "delete";
    var result = yield _database.default.query("UPDATE company SET Status=? WHERE  Status='active' AND IdCompany_PK = ?", [Status, req.params.id]);
    if (result.affectedRows) res.json({
      status: 200,
      data: {},
      msj: "Compañia borrada con exito con exito"
    });else res.json({
      status: 204,
      data: {},
      msj: "No se pudo borra compañia, intente mas tarde"
    });
  });

  return function eraseCompanyById(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.eraseCompanyById = eraseCompanyById;