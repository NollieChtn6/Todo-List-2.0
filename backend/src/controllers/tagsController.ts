import type { Request, Response, NextFunction } from "express";
import * as tagsServices from "../services/tagsServices";

export const getAllTags = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const tasks = await tagsServices.getAllTags();
		res.json(tasks);
	} catch (error) {
		next(error);
	}
};

export const getTagById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const tagId = Number(req.params.id);
		const tag = await tagsServices.getTagById(tagId);
		if (!tag) {
			return res.status(404).json({ message: "Tag not found" });
		}
		res.json(tag);
	} catch (err) {
		next(err);
	}
};

export const createNewTag = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { label, color } = req.body;
		const newTag = await tagsServices.createNewTag(label, color);
		return res.status(201).json(newTag);
	} catch (err) {
		next(err);
	}
};

export const deleteTag = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const tagId = Number(req.params.id);
		const tag = await tagsServices.deleteTag(tagId);
		if (!tag) {
			return res.status(404).json({ message: "Tag not found" });
		}
		// res.json(tag);
		res.status(204).send("Tag has successfully been deleted");
	} catch (err) {
		next(err);
	}
};
