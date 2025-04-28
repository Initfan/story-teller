import { Hono, type Context, type Next } from "hono";
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

const authorize = async (c: Context, next: Next) => {
	const token = getCookie(c, "token");
	if (!token) throw new HTTPException(401, { message: "unauthorize" });
	try {
		const user = await prisma.user.findFirst({
			where: { token },
		});
		if (!user) return c.json({ message: "unauthorize" }, 401);
		c.set("user", user);
	} catch (error) {
		console.log(error);
	}
	await next();
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
		const data: storyType = JSON.parse(result.response.text())[0];

		console.log(data.choose_option.toString());

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
						option: {
							createMany: { data: option },
						},
					},
				},
				genre: {
					createMany: { data: genre },
				},
			},
			include: { detail: { include: { option: true } }, genre: true },
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
	const user = c.get("user") as userType;
	const req = await c.req.json();

	const validation = z
		.object({
			option: z.string(),
			storyId: z.number(),
		})
		.safeParse(req);

	if (!validation.success)
		throw new HTTPException(403, {
			message: "Option and storyId is required",
		});

	try {
		const story = await prisma.story.findFirst({
			where: { id: req.storyId, user_id: user.id },
			include: {
				detail: {
					orderBy: { id: "desc" },
					take: 1,
				},
			},
		});

		if (!story)
			throw new HTTPException(404, { message: "Story not found" });

		await prisma.story_detail.update({
			where: { id: story!.detail[0]["id"] },
			data: {
				choosen_option: validation.data.option,
			},
		});

		const prompt = `lanjutkan cerita ini ${
			story!.detail[0]["story_text"]
		} dengan pilihan ${req.option}`;

		const continueStory = await chatSession.sendMessage(prompt);
		const data: storyType = JSON.parse(continueStory.response.text())[0];

		const storyDetail = await prisma.story_detail.create({
			data: {
				story_id: req.storyId,
				story_text: data.story,
			},
		});

		let option: { option: string; detail_id: number }[] = [];
		data.choose_option.map((v) =>
			option.push({ option: v.option, detail_id: storyDetail.id })
		);

		const storyOption = await prisma.story_option.createMany({
			data: option,
		});

		return c.json({
			success: true,
			data: {
				...story,
				option: storyOption,
				detail: storyDetail,
			},
			message: "Story created",
		});
	} catch (error) {
		console.log(error);
		throw new HTTPException(500, error!);
	}
});

app.get("/:id", async (c) => {
	const id = z.number().safeParse(Number(c.req.param("id")));
	if (id.error)
		throw new HTTPException(403, { message: "ID should be number" });

	const user = c.get("user") as userType;
	const story = await prisma.story.findFirst({
		where: { id: id.data, user_id: user.id },
		include: { detail: { include: { option: true } }, genre: true },
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
