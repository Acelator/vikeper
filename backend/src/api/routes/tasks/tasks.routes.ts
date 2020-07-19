import * as express from "express";

// Import models
import Task from '../../../models/task.model';

class TasksRoutes {
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes(): void {
        this.router.get('/:tokenId/', this.getTasks);
        this.router.get('/:tokenId/task/:taskId', this.getTask);
        this.router.post('/:tokenId/new', this.createTask);
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

    public async createTask(req: express.Request, res: express.Response) {
        const { tokenId } = req.params;
        const task = req.body
        const newTask = new Task(task)
        await newTask.save()
        res.json({
            Task: newTask,
            token: tokenId
        });
    }

}

const tasksRoutes = new TasksRoutes;

export default tasksRoutes.router;
