import React, { useState } from "react";
import genres from "./utils/genre.ts";

const App = () => {
	const [genre, setGenre] = useState();

	const createStory = async () => {
		const req = await fetch("https://api.deepseek.com/chat/completions", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.REACT_APP_DEEPSEEK_KEY}`,
			},
			body: JSON.stringify({
				model: "deepseek-chat",
				messages: [
					{
						role: "system",
						content: "Jadilah kamu seorang penulis hebat",
					},
					{
						role: "user",
						content: `Buatkan saya sebuah cerita yang bergenre ${genre}. Berikan saya pilihan untuk menentukan kelanjutan alur ceritanya.`,
					},
				],
				stream: false,
			}),
		});

		if (!req.ok) return;

		const res = await req.json();
		console.log(res);
	};

	return (
		<div>
			<h3>Pilih genre ceritamu</h3>
			{genres.map((v, i) => (
				<>
					<input
						type="radio"
						value={v}
						id={i}
						placeholder={v}
						name="genre"
						onChange={() => setGenre(v)}
					/>
					<label htmlFor={i}>{v}</label>
					<br />
				</>
			))}
			<br />
			<button onClick={createStory}>Buat cerita</button>
		</div>
	);
};

export default App;
