import { createMiddleware } from "hono/factory";
import type { userType } from "../utils/type.js";

type Env = {
	Variables: {
		setUser: (user: userType) => void;
		user: userType;
	};
};

const userMiddleware = createMiddleware<Env>(async (c, next) => {
	c.set("setUser", (user: userType) => console.log(user));
	await next();
});

export default userMiddleware;
