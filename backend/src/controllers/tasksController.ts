import type { Request, Response, NextFunction } from "express";
import * as tasksServices from "../services/tasksServices";

export const getAllTasks = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const tasks = await tasksServices.getAllTasks();
		res.json(tasks);
	} catch (error) {
		next(error);
	}
};

export const getTaskById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const taskId = Number(req.params.id);
		const task = await tasksServices.getTaskById(taskId);
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}
		res.json(task);
	} catch (err) {
		next(err);
	}
};

export const createNewTask = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { title, description, tags } = req.body;
		const newTask = await tasksServices.createNewTask({
			title,
			description,
			tags: tags || [],
		});
		const responseTask = {
			id: newTask.id,
			title: newTask.title,
			description: newTask.description,
			tags: newTask.tags,
		};

		res.status(201).json(responseTask);
	} catch (err) {
		next(err);
	}
};

export const deleteTag = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const taskId = Number(req.params.id);
		const task = await tasksServices.deleteTask(taskId);
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}
		// res.json(task);
		res.status(204).send("Task has successfully been deleted");
	} catch (err) {
		next(err);
	}
};
