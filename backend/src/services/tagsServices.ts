import { Tag } from "../entities/Tag";

export const getAllTags = async () => {
	const tags = await Tag.find({
		relations: ["tasks"],
	});
	return tags;
};

export const getTagById = async (id: number) => {
	const tag = await Tag.findOne({
		where: { id },
		relations: ["tasks"],
	});
	return tag;
};
