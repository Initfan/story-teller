import { useState } from "react";
import Story from "./story/StoryView";
import StoryCreate from "./story/StoryCreate";
import { story } from "./utils/definition";

const App = () => {
	const [story, setStory] = useState<story>();

	const storyHandler = (text: story) => setStory(text);

	return story ? <Story {...story} /> : <StoryCreate story={storyHandler} />;
};

export default App;
