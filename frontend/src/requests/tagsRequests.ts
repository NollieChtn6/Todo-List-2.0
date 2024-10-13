import { axiosInstance } from "./axiosInstance";

type AddTagData = {
	label: string;
	color: string;
};

export const addTag = async ({ label, color }: AddTagData) => {
	const response = await axiosInstance.post("/tasks/create", {
		label,
		color,
	});
	return response.data;
};
