'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendMail = undefined;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendMail = exports.sendMail = function sendMail(sender, receiver, message) {
    var transport = _nodemailer2.default.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    var mailOptions = {
        from: sender, // sender address
        to: receiver, // list of receivers
        subject: 'Password Reset', // Subject line
        html: '\n            <center><p>Your reset token </p>{$}</center>\n        ' // plain text body
    };
};

exports.default = {
    sendMail: sendMail
};