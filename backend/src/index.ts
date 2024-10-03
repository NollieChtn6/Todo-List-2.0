// Useful resources:
// https://blog.treblle.com/egergr/
// https://medium.com/deno-the-complete-reference/node-js-8-best-practices-for-express-middlewares-bb5825ec0844

import Express from "express";
import "reflect-metadata";
import { router } from "./routes/router";
import { dataSource } from "./config/db";
import { errorHandler } from "./middlewares/errorHandler";

const app = Express();
const PORT = 3000;

app.use(Express.json());

app.use("/api", router);
app.use(errorHandler);

app.listen(PORT, async () => {
	await dataSource.initialize();
	console.log(`App listening on: http://localhost:${PORT}`);
});
