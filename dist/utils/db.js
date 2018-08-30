'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

console.log(process.env.DB_USER);
var uri = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@ds211592.mlab.com:11592/contacts';
var dev = "dev";
var connection = _mongoose2.default.connect(uri);

connection.then(function (db) {
	_logger2.default.info('Successfully connected to ' + uri + ' MongoDB cluster in ' + env + ' mode.');
	return db;
}).catch(function (err) {
	if (err.message.code === 'ETIMEDOUT') {
		_logger2.default.info('Attempting to re-establish database connection.');
		_mongoose2.default.connect(uri);
	} else {
		_logger2.default.error('Error while attempting to connect to database:');
		_logger2.default.error(err);
	}
});

exports.default = connection;