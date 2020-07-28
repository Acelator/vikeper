import {Schema, model} from "mongoose";

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		lowercase: true,
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
	},
	password: {
		// TODO: Encrypt password before saving a user to the DB
		type: String,
		required: true,
	},
	tokens: [
		{
			tokenExpiration: {
				type: Date,
				required: false,
			},
			// TODO: Finish permissions
			permissions: {
				userData: {
					type: Boolean,
				},
				createNewPost: {
					type: Boolean,
				},
				createNewCollection: {
					type: Boolean,
				},
			},
		},
	],
	// TODO: Add a record that saves the current plan for the user
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default model('user', userSchema)
