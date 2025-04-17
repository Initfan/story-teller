import { Hono } from "hono";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { generationConfig, model } from "../utils/gemini.js";
import type { storyType, userType } from "../utils/type.js";
import { getCookie } from "hono/cookie";

type Variables = {
	user: userType;
};

const app = new Hono<{ Variables: Variables }>();
const prisma = new PrismaClient();

const chatSession = model.startChat({
	generationConfig,
});

app.on(
	["post", "get"],
	["generate", "continue", "", "/:id"],
	async (c, next) => {
		const token = getCookie(c, "token");
		if (!token) return c.body("unauthorize", 400);
		const user = await prisma.user.findFirst({
			where: { token },
		});
		c.set("user", user as userType);
		await next();
	}
);

app.get("/:id", async (c) => {
	const req = c.req.param("id");
	const user = c.get("user") as userType;
	if (!user) return c.body("unauthorize", 401);

	const story = await prisma.story.findFirst({
		where: { id: Number(req), user_id: user.id },
	});

	if (!story) return c.body("story not found", 404);

	const storyDetail = await prisma.story_detail.findFirst({
		where: { story_id: story.id },
	});

	if (!storyDetail) return c.body("story detail not found", 404);

	return c.json({
		success: true,
		data: {
			...story,
			story_detail: storyDetail.story,
		},
	});
});

app.get("", async (c) => {
	const user = c.get("user") as userType;
	console.log("unathorize");
	if (!user) return c.body("unauthorize", 401);

	const stories = await prisma.story.findMany({
		where: { user_id: user.id },
		// include: {
		// 	story_detail: true,
		// },
	});

	return c.json({
		success: true,
		data: stories,
	});
});

app.post("/generate", async (c) => {
	const req = await c.req.json();

	const validation = z.string().array().safeParse(req.genre);

	if (!validation.success) return c.body("genre not valid");

	const prompt = `buatkan cerita beserta judulnya yang bergenre ${req.genre}. berikan saya beberapa pilihan untuk melanjutkan kelanjutan ceritanya`;

	try {
		const user = c.get("user") as userType;
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
				user_id: user.id,
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
