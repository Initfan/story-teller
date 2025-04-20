import { cors } from "hono/cors";

export default cors({
	origin: "http://localhost:5173",
	allowHeaders: ["Content-Type"],
	allowMethods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true,
});
