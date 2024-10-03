import { Tag } from "../entities/Tag";

export const getAllTags = async (): Promise<Tag[]> => {
	const tags = await Tag.find();
	return tags;
};

export const getTagById = async (tagId: number): Promise<Tag | null> => {
	const tag = await Tag.findOne({
		where: { id: tagId },
	});
	return tag;
};

export const createNewTag = async (
	label: string,
	color: string,
): Promise<Tag> => {
	const tag = await Tag.findOne({ where: { label } });
	if (!tag) {
		const newTag = new Tag();
		newTag.label = label;
		newTag.color = color;
		await Tag.save(newTag);
		return newTag;
	}
	return tag;
};

export const deleteTag = async (tagId: number): Promise<Tag | null> => {
	const selectedTag = await Tag.findOne({
		where: { id: tagId },
	});
	if (!selectedTag) {
		console.log("This tag does not exist");
		return null;
	}
	console.log("Tag to be removed:", selectedTag);
	return await selectedTag.remove();
};
