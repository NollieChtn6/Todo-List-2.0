import Express from "express";
import "reflect-metadata";

import { dataSource } from "./config/db";

const app = Express();
const PORT = 3000;

app.use(Express.json());

app.get("/", (req: Express.Request, res: Express.Response) => {
	res.send("Hello World!");
});

app.listen(PORT, async () => {
	await dataSource.initialize();
	console.log(`App listening on: http://localhost:${PORT}`);
});
