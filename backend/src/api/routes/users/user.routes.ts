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
        let user = await User.findById({_id: '5f16f6bfe4fe8b40886fdeff'});
        // @ts-ignore
        let newUser = user.tokens;
        let data = {
            tokenExpiration: Date.now(),
            permissions: {
                userData: false
            }
        }
        newUser.push(data);
        // user.tokens.forEach(addToArray);
        // function addToArray(item: any, index: any) {
        //     newUser.push()
        // }
        // @ts-ignore
        // user.tokens = [
        //     {
        //         tokenExpiration: Date.now(),
        //         permissions: {
        //             userData: false
        //         }
        //     }
        // ];
        await user.save();
        res.json({
            user: user,
            status: res.statusCode
        })
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
