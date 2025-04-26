import Layout from "@/Layout";
import App from "@/pages/App";
import Story from "@/pages/Story";
import { createBrowserRouter } from "react-router";
// import { generateStory } from "./action";
import login from "@/pages/signin";
import signup from "@/pages/signup";
import { appLoader, storyLoader } from "./loader";
import { generateStory } from "./action";

const router = createBrowserRouter([
	{
		path: "/",
		Component: Layout,
		action: generateStory,
		children: [
			{
				index: true,
				loader: appLoader,
				Component: App,
			},
			{
				path: "/story/:id",
				loader: storyLoader,
				Component: Story,
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
