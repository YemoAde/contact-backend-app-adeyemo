"use strict";

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param Request
 * @param Response
 * @param Next 
 * @return void|mixed|Response
 * Authentication Middleware. 
 * Protects Contact Resources by Authorization token
 */
var authMiddleware = function authMiddleware(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).json({
            status: "unauthorizeds",
            message: "unauthorized"
        });
    }

    var bearerHeader = req.headers.authorization;
    var bearer = bearerHeader.split(" ");
    var token = bearer[1];

    _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET, function (err, data) {
        if (err) res.status(401).json({
            status: "unauthorized",
            message: "unauthorized"
        });
        req.user = data;
    });

    next();
};

module.exports = authMiddleware;