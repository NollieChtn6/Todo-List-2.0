import { Tag } from "../entities/Tag";
import { Task } from "../entities/Task";
import { In } from "typeorm";

export const getAllTasks = async (): Promise<Task[]> => {
	const tasks = await Task.find({
		relations: ["tags"],
	});
	return tasks;
};

export const getTaskById = async (taskId: number): Promise<Task | null> => {
	const task = await Task.findOne({
		where: { id: taskId },
		relations: ["tags"],
	});
	return task;
};

export const createNewTask = async (data: {
	title: string;
	description?: string;
	tags: { id: number }[];
}): Promise<Task> => {
	const newTask = new Task();
	newTask.title = data.title;
	newTask.description = data.description;
	newTask.isComplete = false;
	newTask.createdAt = new Date();

	if (data.tags && data.tags.length > 0) {
		const tagIds = data.tags.map((tag) => tag.id);
		console.log("Tags Ids:", tagIds);
		const tags = await Tag.findBy({ id: In(tagIds) });
		console.log("Tags:", tags);
		newTask.tags = tags;
	}

	return await Task.save(newTask);
};

export const deleteTask = async (taskId: number): Promise<Task | null> => {
	const selectedTask = await Task.findOne({
		where: { id: taskId },
	});
	if (!selectedTask) {
		console.log("This task does not exist");
		return null;
	}
	console.log("Task to be removed:", selectedTask);
	return await selectedTask.remove();
	// return selectedTask;
};

export const updateTask = async (
	taskId: number,
	data: {
		title?: string;
		description?: string;
		tags?: { id: number }[];
	},
): Promise<Task | null> => {
	const selectedTask = await Task.findOne({
		where: { id: taskId },
		relations: ["tags"],
	});

	if (!selectedTask) {
		console.log("Task not found");
		return null;
	}

	if (data.title) {
		selectedTask.title = data.title;
	}
	if (data.description) {
		selectedTask.description = data.description;
	}

	if (data.tags && data.tags.length > 0) {
		const tagIds = data.tags.map((tag) => tag.id);
		const tags = await Tag.findBy({ id: In(tagIds) });
		selectedTask.tags = tags;
	} else {
		selectedTask.tags = [];
	}
	console.log("Task to be edited:", selectedTask);
	return await selectedTask.save();
	// return selectedTask;
};
