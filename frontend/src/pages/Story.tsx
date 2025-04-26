import StoryAdd from "@/components/story-add";
import StoryText from "@/components/story-text";
import { Separator } from "@/components/ui/separator";
import Wrapper from "@/components/wrapper";
import { storyInterface } from "@/lib/interface";
import { useEffect } from "react";
import { useActionData, useNavigate } from "react-router";

const Story = () => {
	const action = useActionData();
	const navigate = useNavigate();
	const { data }: { data: storyInterface } = action;

	useEffect(() => {
		if (!action) navigate("/");
	});

	const storyAddHandler = () => {};

	return (
		<Wrapper centered={false} className="overflow-y-hidden py-4">
			<main className="my-2 md:my-4">
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-4xl font-bold">{data.judul}</h2>
						<div className="flex space-x-3 mt-3 h-4 items-center">
							{data.genre.map((v) => (
								<div key={v}>
									<div className="font-medium text-accent">
										{v}
									</div>
									<Separator orientation="vertical" />
								</div>
							))}
						</div>
					</div>
					<StoryAdd
						option={data.pilihan_kelanjutan}
						storyAddHandler={storyAddHandler}
					/>
				</div>
			</main>
			<StoryText stories={[data.cerita]} />
		</Wrapper>
	);
};

export default Story;
