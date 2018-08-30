'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.UserSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseBcrypt = require('mongoose-bcrypt');

var _mongooseBcrypt2 = _interopRequireDefault(_mongooseBcrypt);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _mongooseStringQuery = require('mongoose-string-query');

var _mongooseStringQuery2 = _interopRequireDefault(_mongooseStringQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = exports.UserSchema = new _mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		trim: true,
		index: true,
		unique: true,
		required: true
	},
	username: {
		type: String,
		lowercase: true,
		trim: true,
		index: true,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true,
		bcrypt: true
	},
	name: {
		type: String,
		trim: true,
		required: true
	}
}, { collection: 'users' });

UserSchema.plugin(_mongooseBcrypt2.default);
UserSchema.plugin(_mongooseTimestamp2.default);
UserSchema.plugin(_mongooseStringQuery2.default);
UserSchema.index({ email: 1, username: 1 });

module.exports = exports = _mongoose2.default.model('User', UserSchema);