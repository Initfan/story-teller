import { redirect } from "react-router";

type actionType = {
	request: Request;
};

export const generateStory = async ({ request }: actionType) => {
	const formData = await request.formData();
	const genre = formData.getAll("genre");

	try {
		const res = await fetch("http://localhost:8000/story/generate", {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ genre: genre }),
		});

		if (res.status === 401) return redirect("/auth/signin");

		const data = await res.json();
		return redirect(`/story/${data.id}`);
	} catch (error) {
		console.error("Error:", error);
	}
};
