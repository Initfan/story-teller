import { Hono } from "hono";
import { generationConfig, model } from "./utils/gemini.js";

const app = new Hono();

app.post("/generate", async (c) => {
	const req = await c.req.json();

	if (!req.genre) return c.json("No genre provided");

	const chatSession = model.startChat({
		generationConfig,
	});

	let result = await chatSession.sendMessage(
		`buatkan cerita beserta judulnya yang bergenre ${req.genre}. berikan saya beberapa pilihan untuk melanjutkan kelanjutan ceritanya`
	);

	return c.json(result.response.text());
});

export default app;
