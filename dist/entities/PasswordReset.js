'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordResetSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseBcrypt = require('mongoose-bcrypt');

var _mongooseBcrypt2 = _interopRequireDefault(_mongooseBcrypt);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _mongooseStringQuery = require('mongoose-string-query');

var _mongooseStringQuery2 = _interopRequireDefault(_mongooseStringQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PasswordResetSchema = exports.PasswordResetSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    unique: true
  }
}, { collection: 'password-reset' });

PasswordResetSchema.plugin(_mongooseBcrypt2.default);
PasswordResetSchema.plugin(_mongooseTimestamp2.default);
PasswordResetSchema.plugin(_mongooseStringQuery2.default);

module.exports = exports = _mongoose2.default.model('PasswordReset', PasswordResetSchema);