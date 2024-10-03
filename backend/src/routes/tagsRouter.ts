export const tagsRouter = require("express").Router();

import * as tagsController from "../controllers/tagsController";

tagsRouter.get("/tags", tagsController.getAllTags);
tagsRouter.get("/tags/:id", tagsController.getTagById);
// tagRouter.get("/tags/id:/tasks")
tagsRouter.post("/tags/create", tagsController.createNewTag);
tagsRouter.patch("/tags/:id/update", tagsController.updateTag);
tagsRouter.delete("/tags/:id/delete", tagsController.deleteTag);
