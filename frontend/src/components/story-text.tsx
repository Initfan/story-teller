import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

type props = {
	stories: string[];
	loading?: boolean;
};

const StoryText = ({ stories, loading }: props) => {
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
			{loading && (
				<div className="space-y-3">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-2/3" />
				</div>
			)}
		</ScrollArea>
	);
};

export default StoryText;
