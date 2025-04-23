import Layout from "@/Layout";
import App from "@/pages/App";
import Story from "@/pages/Story";
import { createBrowserRouter } from "react-router";
import { generateStory } from "./action";

const router = createBrowserRouter([
	{
		path: "/",
		Component: Layout,
		children: [
			{
				index: true,
				Component: App,
			},
			{
				path: "/story",
				Component: Story,
				action: generateStory,
			},
		],
	},
]);

export default router;
