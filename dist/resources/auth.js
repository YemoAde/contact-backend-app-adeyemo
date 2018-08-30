'use strict';

var _auth = require('../controllers/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
	app.route('/auth/login').post(_auth2.default.login);
	app.route('/auth/signup').post(_auth2.default.signup);

	/*** BONUS POINTS ***/
	app.route('/auth/forgotPassword').post(_auth2.default.forgotPassword);
	app.route('/auth/resetPassword').post(_auth2.default.resetPassword);
};