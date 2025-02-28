import React, { useState } from "react";
import genres from "./utils/genre";
import ai from "openai";

const openai = new ai({
	apiKey: process.env.REACT_APP_OPENAI_KEY,
	dangerouslyAllowBrowser: true,
});

const App = () => {
	const [genre, setGenre] = useState<string>();

	const createStory = async () => {
		const res = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "developer",
					content: [
						{
							type: "text",
							text: "Kamu adalah seorang penulis cerita yang luar biasa, mampu menghidupkan imajinasi pembaca dengan alur yang mendalam dan karakter yang begitu nyata, seolah-olah setiap kata yang kamu tulis memiliki jiwa.",
						},
					],
				},
				{
					role: "user",
					content: [
						{
							type: "text",
							text: `Buatkan sebuah cerita yang bergenre ${genre}, berikan saya beberapa pilihan untuk menentukan kelanjutan ceritanya. berikan pilihan dalam format JSON`,
						},
					],
				},
			],
			store: true,
		});

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
						id={v}
						placeholder={v}
						name="genre"
						onChange={() => setGenre(v)}
					/>
					<label htmlFor={v}>{v}</label>
					<br />
				</>
			))}
			<br />
			<button onClick={createStory}>Buat cerita</button>
		</div>
	);
};

export default App;
