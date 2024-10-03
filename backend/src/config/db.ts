import { DataSource } from "typeorm";

import { TagSQLiteModel } from "../entities/Tag";
import { TaskSQLiteModel } from "../entities/Task";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./to-do-list.sqlite",
  entities: [TaskSQLiteModel, TagSQLiteModel],
  synchronize: true,
});
