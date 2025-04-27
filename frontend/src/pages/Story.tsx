import StoryAdd from "@/components/story-add";
import StoryText from "@/components/story-text";
import { Separator } from "@/components/ui/separator";
import Wrapper from "@/components/wrapper";
import { detail, storyInterface } from "@/lib/interface";
import { useState } from "react";
import { useLoaderData } from "react-router";

const Story = () => {
	const action = useLoaderData();
	const { data }: { data: storyInterface } = action;
	const [story, setStory] = useState<detail[]>(data.detail);
	const [loading, setLoading] = useState(false);

	const storyAddHandler = async (option: string) => {
		setLoading((p) => !p);
		const req = await fetch("http://localhost:8000/story/continue", {
			credentials: "include",
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ option, storyId: data.id }),
		});
		const res = await req.json();
		console.log(res);
		setStory((p) => [...p, ...res.detail]);
		setLoading((p) => !p);
	};

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
						option={story[story.length - 1].option}
						storyAddHandler={storyAddHandler}
					/>
				</div>
			</main>
			<StoryText stories={story} loading={loading} />
		</Wrapper>
	);
};

export default Story;
