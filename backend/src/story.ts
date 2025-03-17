import { Hono } from "hono";
import { generationConfig, model } from "./utils/gemini.js";
import { z } from "zod";

const app = new Hono();

const chatSession = model.startChat({
	generationConfig,
});

app.post("/generate", async (c) => {
	const req = await c.req.json();

	if (!req.genre) return c.json("No genre provided");

	const prompt = `buatkan cerita beserta judulnya yang bergenre ${req.genre}. berikan saya beberapa pilihan untuk melanjutkan kelanjutan ceritanya`;

	const result = await chatSession.sendMessage(prompt);

	return c.json({
		success: true,
		data: result.response.text(),
		messsage: "Story created",
	});
});

app.post("/continue", async (c) => {
	const req = await c.req.json();

	const validation = z
		.object({
			option: z.string(),
		})
		.safeParse(req);

	if (!validation.success) return c.json(validation.error);

	try {
		const newStory = await chatSession.sendMessage(validation.data.option);
		return c.json({
			success: true,
			data: newStory.response.text(),
			message: "Story created",
		});
	} catch (error) {
		return c.json({ success: false, error });
	}
});

export default app;
