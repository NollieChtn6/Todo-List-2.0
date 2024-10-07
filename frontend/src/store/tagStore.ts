import axios from "axios";
import { create } from "zustand";
import type { Tag } from "../@types/types";

type TagsStore = {
	tags: Tag[];
	fetchTags: () => Promise<void>;
};

export const useTagsStore = create<TagsStore>((set) => ({
	tags: [],
	fetchTags: async () => {
		try {
			const response = await axios.get("http://localhost:3000/api/tags");
			if (response.data) {
				set({ tags: response.data });
				console.log(response.data);
			} else {
				throw new Error("Failed to fetch tasgs");
			}
		} catch (error) {
			console.error(error);
		}
	},
}));
