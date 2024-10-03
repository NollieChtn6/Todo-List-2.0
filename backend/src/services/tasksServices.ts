import { Tag } from "../entities/Tag";
import { Task } from "../entities/Task";
import { In } from "typeorm";

export const getAllTasks = async () => {
	const tasks = await Task.find({
		relations: ["tags"],
	});
	return tasks;
};

export const getTaskById = async (taskId: number) => {
	const task = await Task.findOne({
		where: { id: taskId },
		relations: ["tags"],
	});
	return task;
};

// export const createNewTask = async (data: {
// 	title: string;
// 	description?: string;
// 	tags: { id: number, label: string, color: string }[];
// }) => {
// 	const newTask = new Task();
// 	newTask.title = data.title;
// 	newTask.description = data.description;
// 	newTask.isComplete = false;
// 	newTask.createdAt = new Date();

// 	const getTagsId = await Tag.find()

// 	const tagsInTask = await Tag.findOneBy({id: tagId})

// 	// if (data.tags && data.tags.length > 0) {
// 	// 	const tagIds = data.tags.map((tag) => tag.id);
// 	// 	const existingTags = await Tag.find({
// 	// 		where: { id: In(tagIds) },
// 	// 	});
// 	// 	console.log("Existing tags:", existingTags);
// 	// 	newTask.tags = existingTags;
// 	// }

// 	return await Task.save(newTask);
// };

// app.post("/ads/create", async (req: Express.Request, res: Express.Response) => {
// 	const {
// 		title,
// 		description,
// 		owner,
// 		price,
// 		picture,
// 		location,
// 		createdAt,
// 		categoryId,
// 	} = req.body;
// 	console.log("Req body:", req.body);
// 	try {
// 		const newAd = new Ad();
// 		newAd.title = title;
// 		newAd.description = description;
// 		newAd.owner = owner;
// 		newAd.price = price;
// 		newAd.picture = picture;
// 		newAd.location = location;
// 		newAd.createdAt = createdAt;

// 		const category = await Category.findOneBy({ id: categoryId });
// 		if (category) {
// 			newAd.category = category;
// 		}
// 		newAd.save();
// 		res.status(201).send(newAd);
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).send(err);
// 	}
// });
