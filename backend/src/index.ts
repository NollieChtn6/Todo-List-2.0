// Useful resources:
// https://blog.treblle.com/egergr/
// https://medium.com/deno-the-complete-reference/node-js-8-best-practices-for-express-middlewares-bb5825ec0844

import Express from "express";
import "reflect-metadata";
import { router } from "./routes/router";
import { dataSource } from "./config/db";
import { catchValidationErrors } from "./middlewares/errorMiddleware";
import cors from "cors";

const app = Express();
const PORT = 3000;

app.use(cors());
app.use(Express.json());
app.use(catchValidationErrors);
app.use("/api", router);

app.listen(PORT, async () => {
	await dataSource.initialize();
	console.log(`App listening on: http://localhost:${PORT}`);
});
