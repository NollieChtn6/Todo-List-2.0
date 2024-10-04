import axios from "axios";
import { create } from "zustand";
import type { Task } from "../@types/types";

type TasksStore = {
	tasks: Task[];
	fetchTasks: () => Promise<void>;
};

export const useTasksStore = create<TasksStore>((set) => ({
	tasks: [],
	fetchTasks: async () => {
		try {
			const response = await axios.get("http://localhost:3000/api/tasks");
			if (response.data) {
				set({ tasks: response.data });
				console.log(response.data);
			} else {
				throw new Error("Failed to fetch tasks");
			}
		} catch (error) {
			console.error(error);
		}
	},
}));
