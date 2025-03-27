import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

type Variables = {
	user: any;
};

const app = new Hono<{ Variables: Variables }>();
const prisma = new PrismaClient();

app.on("post", ["register", "login"], async (c, next) => {
	const token = getCookie(c, "token");

	const user = await c.get("user");

	if (token) return c.body("authorize");
	return next();
});

app.on("post", ["logout"], async (c, next) => {
	const token = getCookie(c, "token");

	if (!token) return c.body("unauthorize");
	return next();
});

app.post("logout", (c) => {
	deleteCookie(c, "token");
	return c.json("user logout success");
});

app.post("/register", async (c) => {
	try {
		const validation = z
			.object({
				email: z.string().email(),
				password: z.string().min(6),
				name: z.string().min(1),
			})
			.safeParse(await c.req.json());

		if (!validation.success) {
			return c.json({ error: validation.error.errors }, 400);
		}

		const { email, password, name } = validation.data;

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});
		return c.json({ user });
	} catch (error) {
		return c.json(
			{
				message: "Server error, try again later.",
			},
			400
		);
	}
});

app.post("/login", async (c) => {
	try {
		const validation = z
			.object({
				email: z.string().email(),
				password: z.string().min(6),
			})
			.safeParse(await c.req.json());

		if (!validation.success)
			return c.json({ error: validation.error.errors }, 400);

		const { email, password } = validation.data;
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = crypto.randomUUID().split("-")[0];

			await prisma.user.update({
				where: { email },
				data: {
					token,
				},
			});

			c.set("user", user);

			setCookie(c, "token", token, {
				httpOnly: true,
				// secure: true,
				maxAge: 3600,
				sameSite: "Strict",
			});

			return c.json({ message: "Login success", token: token });
		} else {
			return c.json({ error: "Invalid credentials" }, 401);
		}
	} catch (error) {
		return c.json(
			{
				message: "Server error, try again later.",
				error: error?.toString(),
			},
			400
		);
	}
});

export default app;
