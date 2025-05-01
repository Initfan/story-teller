import Layout from "@/Layout";
import Story from "@/pages/Story";
import { createBrowserRouter } from "react-router";
import login from "@/pages/signin";
import signup from "@/pages/signup";
import { appLoader, storyLoader } from "./loader";
import { generateStory } from "./action";
import LandingPage from "@/pages/LandingPage";
import App from "@/pages/App";

const router = createBrowserRouter([
	{
		path: "/",
		Component: Layout,
		action: generateStory,
		children: [
			{
				index: true,
				Component: LandingPage,
			},
			{
				path: "/mythia",
				Component: App,
				loader: appLoader,
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
