import { TagSQLiteModel } from "../entities/Tag";
import { TaskSQLiteModel } from "../entities/Task";
import { In } from "typeorm";
import type {
	CreateTaskAPIInput,
	UpdateTaskAPIInput,
	UpdateTaskStatusAPIInput,
} from "../schemas/taskSchemas";

export const getAllTasks = async (): Promise<TaskSQLiteModel[]> => {
	const tasks = await TaskSQLiteModel.find({
		relations: ["tags"],
	});
	return tasks;
};

export const getTaskById = async (
	taskId: number,
): Promise<TaskSQLiteModel | null> => {
	const task = await TaskSQLiteModel.findOne({
		where: { id: taskId },
		relations: ["tags"],
	});
	return task;
};

export const createNewTask = async (
	task: CreateTaskAPIInput,
): Promise<TaskSQLiteModel> => {
	const newTask = new TaskSQLiteModel();
	newTask.title = task.title;
	newTask.description = task.description;
	newTask.isComplete = false;
	newTask.createdAt = new Date();

	if (task.tags && task.tags.length > 0) {
		const tagIds = task.tags.map((tag) => tag.id);
		console.log("Tags Ids:", tagIds);
		const tags = await TagSQLiteModel.findBy({ id: In(tagIds) });
		newTask.tags = tags;
	}
	return await TaskSQLiteModel.save(newTask);
};

export const deleteTask = async (
	taskId: number,
): Promise<TaskSQLiteModel | null> => {
	const selectedTask = await TaskSQLiteModel.findOne({
		where: { id: taskId },
	});
	if (!selectedTask) {
		return null;
	}
	return await selectedTask.remove();
};

export const updateTask = async (
	taskId: number,
	data: UpdateTaskAPIInput,
): Promise<TaskSQLiteModel | null> => {
	const selectedTask = await TaskSQLiteModel.findOne({
		where: { id: taskId },
		relations: ["tags"],
	});
	if (!selectedTask) return null;

	selectedTask.title = data.title;
	selectedTask.description = data.description;
	if (data.tags?.length) {
		const tags = await TagSQLiteModel.findBy({
			id: In(data.tags.map((tag) => tag.id)),
		});
		selectedTask.tags = tags;
	} else if (data.tags) {
		selectedTask.tags = [];
	}
	return await TaskSQLiteModel.save(selectedTask);
};

export const updateTaskStatus = async (
	taskId: number,
	data: UpdateTaskStatusAPIInput,
) => {
	const selectedTask = await TaskSQLiteModel.findOne({
		where: { id: taskId },
	});
	if (!selectedTask) return null;

	selectedTask.isComplete = data.isComplete;
	return await TaskSQLiteModel.save(selectedTask);
};
