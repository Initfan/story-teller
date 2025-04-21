import Layout from "@/Layout";
import App from "@/pages/App";
import Story from "@/pages/Story";
import { createBrowserRouter } from "react-router";

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
			},
		],
	},
]);

export default router;
