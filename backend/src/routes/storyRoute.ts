import { Hono, type Next } from "hono";
import { z } from "zod";
import { Prisma, PrismaClient } from "@prisma/client";
import {
	genAI,
	generationConfig,
	model as geminiModel,
} from "../utils/gemini.js";
import type { storyType, userType } from "../utils/type.js";
import { getCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";

type Variables = {
	user: userType;
};

const app = new Hono<{ Variables: Variables }>();
const prisma = new PrismaClient();

const storyInstruction = `
	Kamu adalah seorang penulis dan pencerita yang hebat. 
	kamu dikenal dengan karya-karya mu yang begitu indah. 
	bisakah kamu menceritakan sebuah kisah untuk seseorang agar membuatnya bahagia akan ceritamu.
	berikan respon dalam tipe data json berikut 
	{
		title: string,
		genre: array,
		story: string,
		choose_option: [
			{
				id: integer,
				option: string,
			}
		]
	}
`;

const model = genAI.getGenerativeModel({
	model: "gemini-2.0-flash",
	systemInstruction: storyInstruction,
});

const chatSession = model.startChat({
	generationConfig,
});

const authorize = async (c: any, next: Next) => {
	const token = getCookie(c, "token");
	if (!token) throw new HTTPException(401, { message: "unauthorize" });
	try {
		const user = await prisma.user.findFirst({
			where: { token },
		});
		c.set("user", user);
		await next();
	} catch (error) {
		console.log(error);
	}
};

app.get("/genre", async (c) => {
	const chat = geminiModel.startChat({ generationConfig });
	const genre = await chat.sendMessage("Berikan 10 genre pada cerita");
	return c.json({
		success: true,
		data: JSON.parse(genre.response.text()),
		message: "all story genre",
	});
});

app.use(authorize);

app.get("", async (c) => {
	const user = c.get("user") as userType;

	const stories = await prisma.story.findMany({
		where: { user_id: user.id },
	});

	return c.json({
		success: true,
		data: stories,
	});
});

app.post("/generate", async (c) => {
	const req = await c.req.json();

	const validation = z.string().array().safeParse(req.genre);

	if (!validation.success)
		throw new HTTPException(403, {
			message: "Genre is required",
		});

	const prompt = `buatkan cerita beserta judulnya yang bergenre ${req.genre}. berikan saya beberapa pilihan untuk melanjutkan kelanjutan ceritanya`;

	try {
		const user = c.get("user");
		const result = await chatSession.sendMessage(prompt);
		const data: storyType = JSON.parse(result.response.text());

		let option: { option: string }[] = [];
		data.choose_option.map((v) => option.push({ option: v.option }));
		let genre: { genre: string }[] = [];
		data.genre.map((v) => genre.push({ genre: v }));

		const story = await prisma.story.create({
			data: {
				user_id: user.id,
				title: data.title,
				auto_generated: true,
				detail: {
					create: {
						story_text: data.story,
					},
				},
				option: {
					createMany: { data: option },
				},
				genre: {
					createMany: { data: genre },
				},
			},
			include: { detail: true, option: true, genre: true },
		});

		return c.json({
			success: true,
			data: story,
			messsage: "Story created",
		});
	} catch (error) {
		console.log(error);
		throw new HTTPException(500, error!);
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

app.get("/:id", async (c) => {
	const id = z.number().safeParse(Number(c.req.param("id")));
	if (id.error)
		throw new HTTPException(403, { message: "ID should be number" });

	const user = c.get("user") as userType;
	const story = await prisma.story.findFirst({
		where: { id: id.data, user_id: user.id },
		include: { detail: true, option: true, genre: true },
	});

	if (!story) throw new HTTPException(404, { message: "Story not found" });

	return c.json({
		success: true,
		data: story,
	});
}).delete(async (c) => {
	const user = c.get("user") as userType;
	const id = z.number().safeParse(Number(c.req.param("id")));
	if (id.error)
		throw new HTTPException(403, {
			message: id.error.flatten().formErrors.toString(),
		});

	await prisma.story.deleteMany({
		where: { id: id.data, user_id: user.id },
	});

	return c.json({
		success: true,
		message: "Delete story success",
	});
});

export default app;
