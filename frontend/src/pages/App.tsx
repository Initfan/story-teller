import { useState } from "react";
import { Button } from "../components/ui/button";
import { MultiSelect } from "../components/multi-select";
import { Form, Link, useLoaderData, useNavigation } from "react-router";
import Wrapper from "@/components/wrapper";
import { Loader2 } from "lucide-react";

const App = () => {
	const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
	const { genre }: { genre: string } = useLoaderData();
	const navigate = useNavigation();

	return (
		<Wrapper>
			<Form
				className="flex justify-center items-center"
				method="post"
				action="/"
			>
				<div className="space-y-4 text-center flex flex-col items-center">
					<h1 className="text-5xl">Mythia</h1>
					<p>
						Unleash your creativity with AI-powered story
						generation.
					</p>
					<input type="hidden" value={selectedGenre} name="genre" />
					<MultiSelect
						options={JSON.parse(genre).map((v: string) => ({
							label: v,
							value: v,
						}))}
						placeholder="Select genre"
						onValueChange={setSelectedGenre}
					/>
					<Button
						variant="outline"
						type="submit"
						disabled={navigate.state != "idle"}
					>
						{navigate.state != "idle" && (
							<Loader2 className="animate-spin" />
						)}
						Generate Story
					</Button>
					<Link to="/auth/signin">
						<Button variant="link">Sign In</Button>
					</Link>
				</div>
			</Form>
		</Wrapper>
	);
};

export default App;
