import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import cors from "./utils/cors.js";
import storyRoute from "./routes/storyRoute.js";
import authRoute from "./routes/authRoute.js";

const app = new Hono();

app.use(cors);

app.route("/story", storyRoute);
app.route("/auth", authRoute);

serve(
	{
		fetch: app.fetch,
		port: 8000,
	},
	async (info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	}
);
