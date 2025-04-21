import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { MultiSelect } from "../components/multi-select";
import { Link } from "react-router";
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
			<div className="flex justify-center items-center">
				<div className="space-y-4 text-center">
					<h1 className="text-5xl">Mythia</h1>
					<p>
						Unleash your creativity with AI-powered story
						generation.
					</p>
					<MultiSelect
						options={genre!.map((v) => ({
							label: v,
							value: v,
						}))}
						onValueChange={setSelectedGenre}
					/>
					<Link to="/story">
						<Button variant="outline" className="cursor-pointer">
							Generate Story
						</Button>
					</Link>
				</div>
			</div>
		</Wrapper>
	);
};

export default App;
