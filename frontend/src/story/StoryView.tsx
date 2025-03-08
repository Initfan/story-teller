import { storyType } from "../utils/definition";

const StoryView = ({ judul, cerita, pilihan_kelanjutan, genre }: storyType) => {
	return (
		<>
			<h1>{judul}</h1>
			<small>Genre {genre.map((v) => `${v} `)}</small>
			<p>{cerita}</p>
			<div>
				{pilihan_kelanjutan.map((v: any, i: number) => (
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
