"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _middelwares = require("../middelwares");

var userCtrl = _interopRequireWildcard(require("../controllers/user.controller"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.post('/', userCtrl.signup);
router.get('/', _middelwares.verifyToken, userCtrl.getAll);
router.post('/getById', _middelwares.verifyToken, userCtrl.getById);
router.put('/', _middelwares.verifyToken, userCtrl.update);
router.delete('/', _middelwares.verifyToken, userCtrl.del);
router.lock('/', _middelwares.verifyToken, userCtrl.unDelete);
router.link('/', _middelwares.verifyToken, userCtrl.erase); ///--metodos uniamente ara desarrollo, eliminar par productivos

router.post('/permission', userCtrl.setPermission);
router.put('/permission', userCtrl.getPermission);
var _default = router;
exports.default = _default;