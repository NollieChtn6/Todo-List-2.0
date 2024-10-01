export const router = require("express").Router();

import { tasksRouter } from "./tasksRouter";
import { tagsRouter } from "./tagsRouter";

router.use(tasksRouter);
router.use(tagsRouter);
