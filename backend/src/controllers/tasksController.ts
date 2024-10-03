import type { Request, Response } from "express";
import * as tasksServices from "../services/tasksServices";

import * as tasksSchemas from "../schemas/taskSchemas";

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await tasksServices.getAllTasks();
  res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
  const taskId = Number(req.params.id);
  const task = await tasksServices.getTaskById(taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
  return task;
};

export const createNewTask = async (req: Request, res: Response) => {
  const { title, description, tags } = tasksSchemas.updateTaskSchema.parse(req.body);
  const newTask = await tasksServices.createNewTask({ title, description, tags });
  res.status(201).json({ message: "Task has successfully been created:", newTask });
};

export const deleteTag = async (req: Request, res: Response) => {
  const taskId = Number(req.params.id);
  const task = await tasksServices.deleteTask(taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).send("Task has successfully been deleted");
};

export const updateTask = async (req: Request, res: Response) => {
  const taskId = Number(req.params.id);
  const { title, description, tags } = tasksSchemas.updateTaskSchema.parse(req.body);

  const updatedTask = await tasksServices.updateTask(taskId, {
    title,
    description,
    tags,
  });

  res.status(200).json({ message: "Task has successfully been updated", updatedTask });
};
