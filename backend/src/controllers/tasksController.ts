import type { Request, Response, NextFunction } from "express";
import * as tasksServices from "../services/tasksServices";

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await tasksServices.getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
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

export const createNewTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, tags } = req.body;
    const newTask = await tasksServices.createNewTask({
      title,
      description,
      tags: tags || [],
    });
    const createdTask = {
      id: newTask.id,
      title: newTask.title,
      description: newTask.description,
      tags: newTask.tags,
    };

    res.status(201).json(createdTask);
  } catch (err) {
    next(err);
  }
};

export const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
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

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = Number(req.params.id);
    const { title, description, tags } = req.body;

    const updatedTask = await tasksServices.updateTask(taskId, {
      title,
      description,
      tags,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).json(updatedTask);
  } catch (err) {
    next(err);
  }
};
