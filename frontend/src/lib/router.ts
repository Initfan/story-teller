import Layout from "@/Layout";
import App from "@/pages/App";
import Story from "@/pages/Story";
import { createBrowserRouter } from "react-router";
import { generateStory } from "./action";
import login from "@/pages/signin";
import signup from "@/pages/signup";
import { appLoader } from "./loader";

const router = createBrowserRouter([
	{
		path: "/",
		Component: Layout,
		children: [
			{
				index: true,
				loader: appLoader,
				Component: App,
			},
			{
				path: "/story",
				Component: Story,
				action: generateStory,
			},
			{
				path: "/auth",
				children: [
					{
						path: "signin",
						Component: login,
					},
					{
						path: "signup",
						Component: signup,
					},
				],
			},
		],
	},
]);

export default router;
