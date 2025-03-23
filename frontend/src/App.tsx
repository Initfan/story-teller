import { useState } from "react";
import StoryCreate from "./story/StoryCreate";
import { storyType } from "./utils/definition";
import StoryView from "./story/StoryView";

const App = () => {
	const [story, setStory] = useState<storyType>();

	const createStory = async (formData: FormData) => {
		const req = await fetch("http://localhost:8000/story/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				genre: formData.getAll("genre"),
			}),
		});

		const res = await req.json();

		setStory(res.data);
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
