import { useState } from "react";

const StoryView = (props: any) => {
	let { data } = props.props;

	const [story, setStory] = useState(JSON.parse(data)[0]);

	console.log(story);

	return (
		<>
			<h1>{story.judul}</h1>
			<small></small>
			<p>{story.cerita}</p>
			<div>
				{story.pilihan_kelanjutan.map((v: any, i: number) => (
					<>
						<p>{v.deskripsi}</p>
						<button key={v.id}>{v.id}</button>
					</>
				))}
			</div>
		</>
	);
};

export default StoryView;
