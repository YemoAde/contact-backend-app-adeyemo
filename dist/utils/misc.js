'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateToken = exports.responseHandler = exports.STATUS_ERROR = exports.STATUS_SUCCESS = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STATUS_SUCCESS = exports.STATUS_SUCCESS = 'success';
var STATUS_ERROR = exports.STATUS_ERROR = 'error';

var responseHandler = exports.responseHandler = function responseHandler(res, status_code, message) {
    var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var status = status_code == 200 ? STATUS_SUCCESS : STATUS_ERROR;

    if (data == null) {
        res.status(status_code).json({
            'status': status,
            'message': message
        });
    } else {
        res.status(status_code).json({
            'status': status,
            'message': message,
            'data': data
        });
    }
};

var generateToken = exports.generateToken = function generateToken(data) {
    var token = _jsonwebtoken2.default.sign(data, process.env.JWT_SECRET, { expiresIn: 86400 });
    return token;
};

exports.default = {
    responseHandler: responseHandler,
    generateToken: generateToken,
    STATUS_SUCCESS: STATUS_SUCCESS,
    STATUS_ERROR: STATUS_ERROR
};