import {Document} from "mongoose";

// Checks if the token used belongs to a user
export default function isAuthenticated(
	userToken: string | undefined,
	user: Document
) {
	if (userToken) {
		// @ts-ignore
		for (let i in user.tokens) {
			// @ts-ignore
			// noinspection JSUnfilteredForInLoop
			if (userToken == user.tokens[i]._id) {
				return true;
			}
		}
	} else {
		return false;
	}
}
