import { TagSQLiteModel } from "../entities/Tag";
import { TaskSQLiteModel } from "../entities/Task";
import { In } from "typeorm";
import type { CreateTaskAPIInput, UpdateTaskAPIInput } from "../schemas/taskSchemas";
import { dataSource } from "../config/db";

export const getAllTasks = async (): Promise<TaskSQLiteModel[]> => {
  const tasks = await TaskSQLiteModel.find({
    relations: ["tags"],
  });
  return tasks;
};

export const getTaskById = async (taskId: number): Promise<TaskSQLiteModel | null> => {
  const task = await TaskSQLiteModel.findOne({
    where: { id: taskId },
    relations: ["tags"],
  });
  return task;
};

export const createNewTask = async (task: CreateTaskAPIInput): Promise<TaskSQLiteModel> => {
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

export const deleteTask = async (taskId: number): Promise<TaskSQLiteModel | null> => {
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
  // data: {
  //   title?: string;
  //   description?: string;
  //   tags?: { id: number }[];
  // },
  data: UpdateTaskAPIInput,
): Promise<TaskSQLiteModel | null> => {
  const selectedTask = await TaskSQLiteModel.findOne({ where: { id: taskId } });
  if (!selectedTask) return null;

  const updatedTask = await TaskSQLiteModel.save({
    id: taskId,
    description: data.description,
    title: data.title,
    tags: data.tags,
  });

  return updatedTask;
};
