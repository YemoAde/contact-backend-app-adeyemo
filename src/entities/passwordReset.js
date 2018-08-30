import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';

export const PasswordResetSchema = new Schema(
	{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            index: true,
            unique: true
		}
	},
	{ collection: 'password-reset' }
)

PasswordResetSchema.plugin(bcrypt);
PasswordResetSchema.plugin(timestamps);
PasswordResetSchema.plugin(mongooseStringQuery);

module.exports = exports = mongoose.model('PasswordReset', PasswordResetSchema);
