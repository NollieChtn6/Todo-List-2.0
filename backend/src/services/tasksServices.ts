import { Task } from "../entities/Task";

export const getAllTasks = async () => {
	const tasks = await Task.find({
		relations: ["tags"],
	});
	return tasks;
};

export const getTaskById = async (taskId: number) => {
	const task = await Task.findOne({
		where: { id: taskId },
		relations: ["tags"],
	});
	return task;
};
