export const tasksRouter = require("express").Router();

import * as tasksController from "../controllers/tasksController";

tasksRouter.get("/tasks", tasksController.getAllTasks);
tasksRouter.get("/tasks/:id", tasksController.getTaskById);
// tasksRouter.post("/tasks/create");
// tasksRouter.put("/tasks/task:id/edit");
// tasksRouter.delete("/tasks/task:id/delete");
