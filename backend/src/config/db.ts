import { DataSource } from "typeorm";

import { Tag } from "../entities/Tag";
import { Task } from "../entities/Task";

export const dataSource = new DataSource({
	type: "sqlite",
	database: "./to-do-list.sqlite",
	entities: [Task, Tag],
	synchronize: true,
});
