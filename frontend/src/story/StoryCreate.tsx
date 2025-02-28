import { ChangeEvent, useState, useTransition } from "react";
import { genres, story } from "../utils/definition";

const StoryCreate = ({ story }: { story: (text: story) => void }) => {
	const [genre, setGenre] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	const createStory = async () => {
		setLoading(true);
		const res = await fetch("http://localhost:8000/story/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ genre }),
		});

		const data = await res.json();

		setLoading(false);
		story(data);
	};

	const selectGenre = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setGenre([...(genre || []), e.target.value]);
		} else setGenre(genre?.filter((v) => v !== e.target.value));
	};

	return (
		<div>
			<h1>Story Teller</h1>
			<h3>Pilih genre ceritamu</h3>
			{genres.map((v, i) => (
				<>
					<input
						type="checkbox"
						value={v}
						key={v}
						id={v}
						placeholder={v}
						name="genre"
						onChange={selectGenre}
					/>
					<label htmlFor={v}>{v}</label>
					<br />
				</>
			))}
			<br />
			<button
				onClick={createStory}
				disabled={genre.length === 0 || loading}
			>
				Buat cerita
			</button>
		</div>
	);
};

export default StoryCreate;
