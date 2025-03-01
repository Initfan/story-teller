import { useState } from "react";
import Story from "./story/StoryView";
import StoryCreate from "./story/StoryCreate";
import StoryView from "./story/StoryView";

const App = () => {
	const [story, setStory] = useState();

	const storyHandler = (data: any) => {
		setStory(data);
	};

	return story ? (
		<StoryView props={story} />
	) : (
		<StoryCreate story={storyHandler} />
	);
};

export default App;
