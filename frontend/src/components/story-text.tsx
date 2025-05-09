import { detail } from "@/lib/interface";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

type props = {
	stories: detail[];
	loading?: boolean;
};

const StoryText = ({ stories, loading }: props) => {
	return (
		<ScrollArea className="h-1/3 flex-1 pr-4">
			{stories.map((v, i) => (
				<p key={i} className="tracking-widest mb-2">
					{v.story_text}
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
