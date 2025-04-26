import { LoaderFunctionArgs, redirect } from "react-router";

export const appLoader = async () => {
	const genre = localStorage.getItem("genre");
	if (genre) return { genre };

	const req = await fetch("http://localhost:8000/story/genre");
	const res = await req.json();

	localStorage.setItem("genre", JSON.stringify(res.data));
	return { genre };
};

export const storyLoader = async ({ params }: LoaderFunctionArgs) => {
	const { id } = params;

	try {
		const req = await fetch(`http://localhost:8000/story/${id}`, {
			credentials: "include",
		});
		const res = await req.json();
		return res;
	} catch (error) {
		console.log(error);
		return redirect("/");
	}
};
