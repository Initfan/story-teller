import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./lib/router.js";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<RouterProvider router={router} />
);
