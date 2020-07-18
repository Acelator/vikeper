import * as express from "express";

class TasksRoutes {
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes(): void {
        this.router.get('/:tokenId/', this.getTasks);
        this.router.get('/:tokenId/:taskId', this.getTask);
    }

    // Sends back all the Tasks that correspond to the user
    public getTasks(req: express.Request, res: express.Response): void {
        const {tokenId} = req.params
        res.status(200);
        res.json({
            token: tokenId,
            status: res.statusCode
        })
    };

    // Sends back a specific task
    public getTask(req: express.Request, res: express.Response): void {
        const { tokenId, taskId } = req.params;
        res.status(200);
        res.json({
            token: tokenId,
            task: taskId,
            status: res.statusCode
        })
    }
}

const tasksRoutes = new TasksRoutes;

export default tasksRoutes.router;
