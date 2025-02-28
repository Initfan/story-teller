import { serve } from "@hono/node-server";
import { Hono } from "hono";
import cors from "./utils/cors.js";
import story from "./story.js";

const app = new Hono();

app.use(cors);

app.route("/story", story);
app.get("/", (c) => {
	return c.text("Hello Hono!");
});

serve(
	{
		fetch: app.fetch,
		port: 8000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	}
);
