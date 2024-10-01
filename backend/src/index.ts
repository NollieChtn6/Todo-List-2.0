import Express from "express";
import "reflect-metadata";
import { router } from "./routes/router";

import { dataSource } from "./config/db";

const app = Express();
const PORT = 3000;

app.use(Express.json());

app.use("/api", router);

app.listen(PORT, async () => {
	await dataSource.initialize();
	console.log(`App listening on: http://localhost:${PORT}`);
});
