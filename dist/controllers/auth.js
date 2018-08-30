'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.forgotPassword = exports.signup = exports.login = undefined;

var _user = require('../entities/user');

var _user2 = _interopRequireDefault(_user);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _misc = require('./../utils/misc');

var _misc2 = _interopRequireDefault(_misc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Given a json request 
 * {"username": "<...>", "password": "<...>"}
 * Verify the user is valid and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
var login = exports.login = function login(req, res) {
	if (!req.body.username || !req.body.password) {
		_misc2.default.responseHandler(res, 401, 'Email and Password Required');
	}
	_user2.default.findOne({ username: req.body.username }, function (err, user) {
		if (err || !user) {
			return _misc2.default.responseHandler(res, 401, 'User not Found');
		};
		user.verifyPassword(req.body.password).then(function (valid) {
			if (valid) {
				var payload = {
					_id: user._id,
					email: user.email,
					username: user.username,
					name: user.name
				};
				var _token = _misc2.default.generateToken(payload);

				_misc2.default.responseHandler(res, 200, "login_successful", { token: _token });
			} else {
				_misc2.default.responseHandler(res, 401, "invalid_credentials");
			}
		}).catch(function (err) {
			_misc2.default.responseHandler(res, 401, "failed");
		});
	});
};
/**
 * Given a json request 
 * {"username": "<...>", "password": "<...>"}
 * Create a new user and return some authentication token 
 * which can be used to verify protected resources'
 * {"user": <{...}>, "token": "<...>""}
 */
var signup = exports.signup = function signup(req, res) {

	var new_user = new _user2.default(req.body);
	new_user.save(function (err, user) {
		if (err) return _misc2.default.responseHandler(res, 400, 'Could not add User', err);

		/**
   * Node =< 8.2.1  !support spread operator
   */
		var payload = {
			_id: user._id,
			email: user.email,
			username: user.username,
			name: user.name
		};
		var _token = _misc2.default.generateToken(payload);

		_misc2.default.responseHandler(res, 200, "user_created", { token: _token });
	});
};
/**
 * Implement a way to recover user accounts
 */
var forgotPassword = exports.forgotPassword = function forgotPassword(req, res) {

	res.status(404).json({ err: "not implemented" });
};

exports.default = {
	login: login,
	signup: signup,
	forgotPassword: forgotPassword
};