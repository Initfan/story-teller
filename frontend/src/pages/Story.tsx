import StoryAdd from "@/components/story-add";
import StoryText from "@/components/story-text";
import { Separator } from "@/components/ui/separator";
import Wrapper from "@/components/wrapper";
import { storyInterface } from "@/lib/interface";
import { useLoaderData } from "react-router";

const Story = () => {
	const action = useLoaderData();
	const { data }: { data: storyInterface } = action;

	const storyAddHandler = () => {};

	return (
		<Wrapper centered={false} className="overflow-y-hidden py-4">
			<main className="my-2 md:my-4">
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-4xl font-bold">{data.title}</h2>
						<div className="flex space-x-3 mt-3 h-4 items-center">
							{data.genre.map((v) => (
								<div key={v.id}>
									<div className="font-medium text-accent">
										{v.genre}
									</div>
									<Separator orientation="vertical" />
								</div>
							))}
						</div>
					</div>
					<StoryAdd
						option={data.option}
						storyAddHandler={storyAddHandler}
					/>
				</div>
			</main>
			<StoryText stories={data.detail} />
		</Wrapper>
	);
};

export default Story;
