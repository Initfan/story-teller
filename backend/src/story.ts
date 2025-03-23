import { Hono } from "hono";
import { generationConfig, model } from "./utils/gemini.js";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import type { storyType } from "./utils/type.js";

const app = new Hono();
const prisma = new PrismaClient();

const chatSession = model.startChat({
	generationConfig,
});

app.post("/generate", async (c) => {
	const req = await c.req.json();

	const validation = z.string().array().safeParse(req.genre);

	if (!validation.success) return c.json(validation.error);

	const prompt = `buatkan cerita beserta judulnya yang bergenre ${req.genre}. berikan saya beberapa pilihan untuk melanjutkan kelanjutan ceritanya`;

	try {
		const result = await chatSession.sendMessage(prompt);

		const data: storyType = JSON.parse(result.response.text());

		const jsonOption = data.pilihan_kelanjutan.map((v) =>
			JSON.stringify(v)
		);

		const story = await prisma.story.create({
			data: {
				title: data.judul,
				genre: data.genre.toString(),
				option: jsonOption.toString(),
				user_id: 1,
			},
		});

		await prisma.story_detail.create({
			data: {
				story: data.cerita,
				story_id: story.id,
			},
		});

		return c.json({
			success: true,
			data,
			messsage: "Story created",
		});
	} catch (error) {
		return c.json({ success: false, error });
	}
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
