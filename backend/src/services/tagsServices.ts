import { TagSQLiteModel } from "../entities/Tag";
import type { CreateTagAPIInput, UpdateTagAPIInput } from "../schemas/tagSchemas";

export const getAllTags = async (): Promise<TagSQLiteModel[]> => {
  const tags = await TagSQLiteModel.find();
  return tags;
};

export const getTagById = async (tagId: number): Promise<TagSQLiteModel | null> => {
  const tag = await TagSQLiteModel.findOne({
    where: { id: tagId },
  });
  return tag;
};

export const createNewTag = async (tag: CreateTagAPIInput): Promise<TagSQLiteModel> => {
  const newTag = new TagSQLiteModel();
  newTag.label = tag.label;
  newTag.color = tag.color;
  return await TagSQLiteModel.save(newTag);
};

export const deleteTag = async (tagId: number): Promise<TagSQLiteModel | null> => {
  const selectedTag = await TagSQLiteModel.findOne({
    where: { id: tagId },
  });
  if (!selectedTag) {
    return null;
  }
  return await selectedTag.remove();
};

export const updateTag = async (
  tagId: number,
  data: UpdateTagAPIInput,
): Promise<TagSQLiteModel | null> => {
  const selectedTag = await TagSQLiteModel.findOne({
    where: { id: tagId },
  });
  if (!selectedTag) return null;

  selectedTag.label = data.label;
  selectedTag.color = data.color;
  return await TagSQLiteModel.save(selectedTag);
};
