import StoryAdd from "@/components/story-add";
import StoryText from "@/components/story-text";
import { Separator } from "@/components/ui/separator";
import Wrapper from "@/components/wrapper";

const Story = () => {
	const storyAddHandler = (option: number, story: string) => {};

	return (
		<Wrapper centered={false} className="overflow-y-hidden py-4">
			<main className="my-2 md:my-4">
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-4xl font-bold">
							Lorem ipsum dolor sit.
						</h2>
						<div className="flex space-x-3 mt-3 h-4 items-center">
							{["misteri", "mistis"].map((v) => (
								<>
									<div className="font-medium text-accent">
										{v}
									</div>
									<Separator orientation="vertical" />
								</>
							))}
						</div>
					</div>
					<StoryAdd
						option={["mati", "hidup", "respawn"]}
						storyAddHandler={storyAddHandler}
					/>
				</div>
			</main>
			<StoryText stories={["1", "2"]} />
		</Wrapper>
	);
};

export default Story;
