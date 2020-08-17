import {Document} from "mongoose";

// Checks if the token used belongs to a user
export function isAuthenticated(
	authorizationToken: string | undefined,
	user: Document
) {
	if (authorizationToken) {
		// @ts-ignore
		for (let i in user.tokens) {
			// @ts-ignore
			// noinspection JSUnfilteredForInLoop
			if (authorizationToken == user.tokens[i].id) {
				return true;
			}
		}
	} else {
		return false;
	}
}

// Takes as argument the Authorization header and split it so we just keep the token itself
export function getAuthorizationToken(req: any) {
	const authorizationArray: Array<any> | undefined = req?.split("Bearer ", 2);
	const authorizationToken: string = authorizationArray?.[1];
	return authorizationToken;
}
