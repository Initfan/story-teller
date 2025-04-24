export const appLoader = async () => {
	const genre = localStorage.getItem("genre");
	if (genre) return { genre };

	const req = await fetch("http://localhost:8000/story/genre");
	const res = await req.json();

	localStorage.setItem("genre", JSON.stringify(res.data));
	return { genre };
};
