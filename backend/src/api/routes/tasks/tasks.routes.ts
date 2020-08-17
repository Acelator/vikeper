import {Request, Response, Router} from "express";
import chalk from "chalk";

// Import models
import Task from "../../../models/task.model";

class TasksRoutes {
	public router = Router();

	constructor() {
		this.initRoutes();
	}

	// Change tokenId to be include in Authentication header
	public initRoutes(): void {
		this.router.get("/:tokenId/", this.getTasks);
		this.router.post("/:tokenId/new", this.createTask);
		this.router.get("/:tokenId/task/:taskId", this.getTask);
		this.router.post("/:tokenId/task/:taskId", this.updateTask);
		this.router.get("/:tokenId/task/:taskId/delete", this.deleteTask);
	}

	// Sends back all the Tasks that correspond to the user
	public async getTasks(req: Request, res: Response) {
		const {tokenId} = req.params;

		const tasks = await Task.find();
		res.json({
			token: tokenId,
			tasks: tasks,
			status: res.statusCode,
		});
	}

	// Sends back a specific task
	public async getTask(req: Request, res: Response) {
		const {tokenId, taskId} = req.params;

		const task = await Task.findOne({_id: taskId})
			.then(task => {
				return task;
			})
			.catch(err => {
				res.status(404);
				console.log();
				console.log(chalk.red(err.name));
			});

		res.json({
			token: tokenId,
			task: task,
			status: res.statusCode,
		});
	}

	// Create a task with the information send in the request and saved it in the db
	public async createTask(req: Request, res: Response) {
		const {tokenId} = req.params;
		const task = req.body;

		const newTask = new Task(task);
		await newTask.save().catch(err => console.log(err));

		res.json({
			Task: newTask,
			token: tokenId,
		});
	}

	// Update a task and saved it again to the db
	public async updateTask(req: Request, res: Response) {
		const {tokenId, taskId} = req.params;
		const updatedTask = req.body;

		const task = await Task.findByIdAndUpdate({_id: taskId}, updatedTask)
			.then(task => {
				return task;
			})
			.catch(err => console.log(chalk.red(err.name)));

		res.json({
			token: tokenId,
			task: task,
			status: res.statusCode,
		});
	}

	// Delete a task from the db
	public async deleteTask(req: Request, res: Response) {
		const {tokenId, taskId} = req.params;

		await Task.findByIdAndRemove({_id: taskId}).catch(err =>
			console.log(chalk.red(err.name))
		);

		res.json({
			token: tokenId,
			task: `Deleted task with id ${taskId}`,
			status: res.statusCode,
		});
	}
}

const tasksRoutes = new TasksRoutes();

export default tasksRoutes.router;
