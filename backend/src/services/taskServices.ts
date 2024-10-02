import { Task } from "../entities/Task";

export const getAllTasks = async () => {
	const tasks = await Task.find({
		relations: ["tags"],
	});
	return tasks;
};

export const getTaskById = async (id: number) => {
	const task = await Task.findOne({
		where: { id },
		relations: ["tags"],
	});
	return task;
};
