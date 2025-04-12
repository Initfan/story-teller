import { useEffect, useState } from "react";
import { storyType } from "../utils/definition";
import StoryOption from "./StoryOption";

const StoryView = ({ judul, cerita, pilihan_kelanjutan, genre }: storyType) => {
	const [story, setStory] = useState<storyType>();
	const [storyList, setStoryList] = useState<string[]>();

	useEffect(() => {
		setStoryList([cerita]);
	}, [cerita]);

	const generateNewStory = async (option: string) => {
		try {
			const req = await fetch("http://localhost:8000/story/continue", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					option,
				}),
			});

			const res = await req.json();
<<<<<<< HEAD
			const data: storyType = JSON.parse(res.data);

			setStory(data);
			setStoryList((p) => [...p!, data.cerita]);
=======

			setStory(res.data);
			setStoryList((p) => [...p!, res.data.cerita]);
>>>>>>> 0451b12d61cce57b98068bc7b34df2cfb388917c
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<h1>{judul || story?.judul}</h1>
			<small>Genre {genre.map((v) => `${v} `)}</small>
			{storyList?.map((v) => (
				<p>{v}</p>
			))}
			{story?.pilihan_kelanjutan
				? story.pilihan_kelanjutan.map(
						(v: { id: number; deskripsi: string }) => (
							<StoryOption
								key={v.id}
								description={v.deskripsi}
								id={v.id}
								selectedOption={generateNewStory}
							/>
						)
				  )
				: pilihan_kelanjutan.map(
						(v: { id: number; deskripsi: string }) => (
							<StoryOption
								key={v.id}
								description={v.deskripsi}
								id={v.id}
								selectedOption={generateNewStory}
							/>
						)
				  )}
		</>
	);
};

export default StoryView;
