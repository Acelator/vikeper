import * as express from "express";

class TasksRoutes {
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes(): void {
        this.router.get('/:tokenId/', this.getTasks);
    }

    public getTasks(req: express.Request, res: express.Response) {
        const { tokenId } = req.params
        res.status(200);
        res.json({
            token: tokenId,
            status: res.statusCode
        })
    }
}

const tasksRoutes = new TasksRoutes;

export default tasksRoutes.router;
