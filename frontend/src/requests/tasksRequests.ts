import { axiosInstance } from "./axiosInstance";
import type { Tag } from "../@types/types";

type AddTaskData = {
	title: string;
	description: string;
	tags: Tag[] | [];
};

export const addTask = async ({ title, description, tags }: AddTaskData) => {
	const response = await axiosInstance.post("/tasks/create", {
		title,
		description,
		tags,
	});
	return response.data;
};

type UpdateTaskData = {
	id: number;
	title: string;
	description: string | "";
	tags: Tag[] | [];
	isComplete: boolean;
};

export const updateTask = async ({
	id,
	title,
	description,
	tags,
	isComplete,
}: UpdateTaskData) => {
	const response = await axiosInstance.patch(`/tasks/${id}/update`, {
		id,
		title,
		description,
		tags,
		isComplete,
	});
	return response.data;
};

type MarkTaskAsCompleteData = {
	id: number;
	isComplete: boolean;
};

export const markTaskAsComplete = async ({
	id,
	isComplete,
}: MarkTaskAsCompleteData) => {
	const response = await axiosInstance.patch(`/tasks/${id}/toggle-status`, {
		isComplete,
	});
	return response.data;
};

type DeleteTaskParams = {
	id: number;
};

export const deleteTask = async ({ id }: DeleteTaskParams) => {
	const response = await axiosInstance.delete(`/tasks/${id}/delete`);
	return response.data;
};
