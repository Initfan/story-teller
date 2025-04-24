import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { MultiSelect } from "../components/multi-select";
import { Form, Link } from "react-router";
import Wrapper from "@/components/wrapper";

const App = () => {
	const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
	const [genre, setGenre] = useState<string[] | null>(
		JSON.parse(localStorage.getItem("genre")!)
	);

	useEffect(() => {
		if (!genre) {
			fetch("http://localhost:8000/story/genre")
				.then((req) => req.json())
				.then((res) => {
					setGenre(res.data);
					localStorage.setItem("genre", JSON.stringify(res.data));
				});
		}
	}, [genre]);

	return (
		<Wrapper>
			<Form
				className="flex justify-center items-center"
				action="/story"
				method="post"
			>
				<div className="space-y-4 text-center flex flex-col items-center">
					<h1 className="text-5xl">Mythia</h1>
					<p>
						Unleash your creativity with AI-powered story
						generation.
					</p>
					<input type="hidden" value={selectedGenre} name="genre" />
					<MultiSelect
						options={genre!.map((v) => ({
							label: v,
							value: v,
						}))}
						placeholder="Select genre"
						onValueChange={setSelectedGenre}
					/>
					<Button variant="outline" type="submit">
						Generate Story
					</Button>
					<Link to="/auth/login">
						<Button variant="link">Sign In</Button>
					</Link>
				</div>
			</Form>
		</Wrapper>
	);
};

export default App;
