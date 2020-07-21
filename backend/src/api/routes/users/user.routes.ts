import {Request, Response, Router} from "express";

// Import models
import User from "../../../models/user.model";

class UsersRoutes {
    public router = Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes(): void {
        this.router.get('/:userId', this.basicUserInfo);
        this.router.get('/:tokenId/:userId', this.userInfo);
        // this.router.post('/new', this.newUser);
        // this.router.post('/userId', this.updateUser);
        // this.router.post('/:userId/token/new', this.createToken);
        // this.router.get('/:userId/token/:tokenId/delete', this.deleteToken);
    }

    public async basicUserInfo(req: Request, res: Response) {
        const {userId} = req.params;
        const user = await User.findById({_id: userId})
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log();
                console.log(`User with id ${userId} not found in the db`);
                console.log(err.name)
                res.status(404);
            })
        if (res.statusCode === 200) {
            res.json({
                user: user,
                status: res.statusCode
            })
        } else if (res.statusCode === 404) {
            res.json({
                error: `User with id ${userId} not found in the db`,
                status: res.statusCode
            })
        } else {
            res.json({
                status: "error"
            })
        }
        // @ts-ignore
        // let newUser = user.tokens;
        // let data = {
        //     tokenExpiration: Date.now(),
        //     permissions: {
        //         userData: false
        //     }
        // }
        // newUser.push(data);
        // const user = {
        //     username: "corbla",
        //     email: "corbla04@gmail.com",
        //     password: "test",
        //     tokens: [{
        //         tokenExpiration: Date.now(),
        //         permissions: {
        //             userData: false
        //         }
        //     }
        // ];
        // await user.save();
    }

    public async userInfo(req: Request, res: Response) {
        const {userId, tokenId} = req.params
        res.json({
            user: userId,
            token: tokenId,
            status: res.statusCode
        })
    }

    // private async newUser(req: Request, res:Response) {
    //     // TODO: Create new token for the user
    // }

    // private createToken(req: Request, res: Response) {
    //
    // }

    // private deleteToken(req: Request, res: Response) {
    //
    // }

    // private updateUser(req: Request, res: Response) {
    //
    // }
}

const usersRoutes = new UsersRoutes;

export default usersRoutes.router;
