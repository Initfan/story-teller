import { useState } from "react";
import StoryCreate from "./story/StoryCreate";
import StoryView from "./story/StoryView";
import { storyType } from "./utils/definition";

const App = () => {
	const [story, setStory] = useState<storyType>();

	console.log(story);

	const createStory = async (formData: FormData) => {
		const req = await fetch("http://localhost:8000/story/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				genre: formData.getAll("genre"),
				option: formData.get("option"),
			}),
		});

		const res = await req.json();

		setStory(JSON.parse(res.data));
	};

	return story ? (
		<StoryView {...story} />
	) : (
		<form action={createStory}>
			<StoryCreate />
		</form>
	);
};

export default App;
