import {Request, Response, Router} from "express";
import chalk from "chalk";

// Import models
import User from "../../../models/user.model";

// Helpers
import {
	isAuthenticated,
	getAuthorizationToken,
} from "../../../helpers/Authentication";

// Users related routes
class UsersRoutes {
	public router = Router();

	constructor() {
		this.initRoutes();
	}

	public initRoutes(): void {
		this.router.post("/new", this.newUser);
		this.router.get("/:userId", this.userInfo);
		this.router.post("/:userId/update", this.updateUser);
		this.router.post("/:userId/tokens/new", this.createToken);
		this.router.get("/:userId/tokens/delete", this.deleteToken);
	}

	// Creates a new user
	public async newUser(req: Request, res: Response) {
		const user = req.body;

		// Create a new token for the user
		user.tokens = {
			tokenExpiration: Date.now(),
			permissions: {
				userData: false,
			},
		};

		// Create and saves a user
		const newUser = new User(user);
		await newUser.save().catch(err => {
			res.status(500);
			res.json({
				status: res.statusCode,
				msg: "An error has happened. Tried again",
				err: err,
			});
		});

		res.json({
			headers: req.header("userToken"),
			user: newUser,
		});
	}

	// Return the user data
	public async userInfo(req: Request, res: Response) {
		const {userId} = req.params;
		const authorization: string = getAuthorizationToken(
			req.header("Authorization")
		);

		const user = await User.findById({_id: userId})
			.then(user => {
				return user;
			})
			.catch(err => {
				console.log();
				console.log(chalk.red(err.name));
			});

		if (user) {
			if (isAuthenticated(authorization, user)) {
				res.json({
					user: user,
					token: req.header("userToken"),
					status: res.statusCode,
				});
			} else {
				res.status(401);
				res.json({
					error: `Token ${authorization} doesn't belong to user ${userId}`,
					status: res.statusCode,
				});
			}
		} else {
			res.status(404);
			res.json({
				error: `User with id ${userId} not found in the db`,
				status: res.statusCode,
			});
		}
	}

	// Updates user information
	public updateUser(req: Request, res: Response) {
		res.json({
			body: req.body,
			method: "updateUser",
		});
	}

	// Creates a new token for the authenticated user
	public createToken(req: Request, res: Response) {
		res.json({
			body: req.body,
			method: "newToken",
		});
	}

	// Deletes a token for the authenticated user
	public deleteToken(req: Request, res: Response) {
		res.json({
			body: req.body,
			method: "deleteToken",
		});
	}
}

const usersRoutes = new UsersRoutes();

export default usersRoutes.router;
