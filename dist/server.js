'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressWinston = require('express-winston');

var _expressWinston2 = _interopRequireDefault(_expressWinston);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _auth = require('./resources/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
START HERE
NOTE:
Don't forget to implement user authentication for the
contact resource
*/
require('dotenv').config();

var app = (0, _express2.default)();

var port = 3001;
var env = "dev";

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use(_expressWinston2.default.logger({
	transports: [new _winston2.default.transports.Console({
		json: true,
		colorize: true
	})],
	meta: true, // optional: control whether you want to log the meta data about the request (default to true)
	msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
	expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
	colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
	ignoreRoute: function ignoreRoute(req, res) {
		return false;
	} // optional: allows to skip some log messages based on request and/or response
}));

app.listen(port, function (err) {
	if (err) {
		_logger2.default.error(err);
		process.exit(1);
	}
	require('./utils/db');

	_fs2.default.readdirSync(_path2.default.join(__dirname, 'resources')).map(function (file) {
		require('./resources/' + file)(app);
	});

	_logger2.default.info('app is now running on port ' + port + ' in ' + env + ' mode');
});

module.exports = app;