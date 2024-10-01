import Express from "express";
import "reflect-metadata";

const app = Express();
const PORT = 3000;

app.use(Express.json());

app.get("/", (req: Express.Request, res: Express.Response) => {
	res.send("Hello World!");
});

app.listen(PORT, async () => {
	console.log(`App listening on: http://localhost:${PORT}`);
});
