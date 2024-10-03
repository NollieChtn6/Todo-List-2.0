import type { Request, Response, NextFunction } from "express";
import * as tagsServices from "../services/tagsServices";
import * as tagsSchemas from "../schemas/tagSchemas";

export const getAllTags = async (req: Request, res: Response, next: NextFunction) => {
  const tasks = await tagsServices.getAllTags();
  res.json(tasks);
};

export const getTagById = async (req: Request, res: Response, next: NextFunction) => {
  const tagId = Number(req.params.id);
  const tag = await tagsServices.getTagById(tagId);
  if (!tag) {
    return res.status(404).json({ message: "Tag not found" });
  }
  res.json(tag);
};

export const createNewTag = async (req: Request, res: Response, next: NextFunction) => {
  const { label, color } = tagsSchemas.createTagSchema.parse(req.body);
  const newTag = await tagsServices.createNewTag({ label, color });
  return res.status(201).json({ message: "Tag has successfully been created", newTag });
};

export const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
  const tagId = Number(req.params.id);
  const tag = await tagsServices.deleteTag(tagId);
  if (!tag) {
    return res.status(404).json({ message: "Tag not found" });
  }
  res.status(204).send("Tag has successfully been deleted");
};

export const updateTag = async (req: Request, res: Response, next: NextFunction) => {
  const tagId = Number(req.params.id);
  const { label, color } = req.body;

  const updatedTag = await tagsServices.updateTag(tagId, {
    label,
    color,
  });

  res.status(200).json({ message: "Tag has successfully been updated", updatedTag });
};
