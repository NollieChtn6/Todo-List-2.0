export const tasksRouter = require("express").Router();

import * as tasksController from "../controllers/tasksController";
import { tagsRouter } from "./tagsRouter";

tasksRouter.get("/tasks", tasksController.getAllTasks);
tasksRouter.get("/tasks/:id", tasksController.getTaskById);
// taskRouter.get("/tasks/:id/tags")
tasksRouter.post("/tasks/create", tasksController.createNewTask);
tasksRouter.patch("/tasks/:id/update", tasksController.updateTask);
tagsRouter.patch("/tasks/:id/toggle-status", tasksController.updateTaskStatus);
tasksRouter.delete("/tasks/:id/delete", tasksController.deleteTag);
