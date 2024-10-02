import type { Request, Response, NextFunction } from "express";
import * as taskServices from "../services/taskServices";

export const getAllTasks = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const tasks = await taskServices.getAllTasks();
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
		const task = await taskServices.getTaskById(taskId);
		if (task === null) {
			return res.status(404).json({ message: "Task not found" });
		}
		res.json(task);
	} catch (err) {
		next(err);
	}
};
