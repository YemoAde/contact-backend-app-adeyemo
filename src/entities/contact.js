import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';

export const ContactSchema = new Schema(
    {
        //  define the necessary fields for your contact list
        firstname: {
			type: String,
			lowercase: true,
			trim: true,
			required: true
        },
        lastname: {
            type: String,
			lowercase: true,
			trim: true,
			required: true
        },
        phone_number: {
            type: String,
			lowercase: Number,
			trim: true,
            index: true,
            unique: true,
			required: true
		},
		email: {
			type: String,
			lowercase: true,
			trim: true,
            index: true,
            unique: true,
			required: true
		},
		address: {
            type: String,
			lowercase: true,
			trim: true,
			required: true
		},
		user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
		}
    },
    { collection: 'contacts' }
)

ContactSchema.plugin(timestamps);
ContactSchema.plugin(mongooseStringQuery);

ContactSchema.index({ email: 1, phone_number: 1 });

module.exports = exports = mongoose.model('Contact', ContactSchema);
export default mongoose.model('Contact', ContactSchema);
