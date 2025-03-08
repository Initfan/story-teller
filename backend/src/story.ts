import { Hono } from "hono";
import { generationConfig, model } from "./utils/gemini.js";

const app = new Hono();

app.post("/generate", async (c) => {
	const req = await c.req.json();

	if (!req.genre) return c.json("No genre provided");

	const chatSession = model.startChat({
		generationConfig,
	});

	let prompt = `buatkan cerita beserta judulnya yang bergenre ${req.genre} `;
	if (req.option) {
		prompt += `.berikan saya beberapa pilihan untuk melanjutkan kelanjutan ceritanya`;
	}

	let result = await chatSession.sendMessage(prompt);

	return c.json({
		success: true,
		data: result.response.text(),
		messsage: "Story created",
	});
});

export default app;
