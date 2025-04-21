import { ScrollArea } from "./ui/scroll-area";

type props = {
	stories: string[];
};

const StoryText = ({ stories }: props) => {
	return (
		<ScrollArea className="h-1/3 flex-1 pr-4">
			{stories.map((_, i) => (
				<p key={i} className="tracking-widest mb-1">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Labore incidunt cumque quibusdam voluptates eaque nihil
					consequatur nemo a, beatae delectus voluptatum accusamus
					odio placeat minima doloribus at omnis eligendi dolor.
				</p>
			))}
		</ScrollArea>
	);
};

export default StoryText;
