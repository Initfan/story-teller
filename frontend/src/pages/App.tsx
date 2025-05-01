import { FormEvent, useState } from "react";
import { Button } from "../components/ui/button";
import { MultiSelect } from "../components/multi-select";
import { Link, useLoaderData, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { useCookies } from "react-cookie";
import SignOut from "@/components/signout";
import Navigation from "@/components/Navigation";

const App = () => {
	const [selectedGenre, setSelectedGenre] = useState<string[]>();
	const { genre }: { genre: string } = useLoaderData();
	const [cookies] = useCookies(["user"]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading((p) => !p);
		if (!selectedGenre) return setLoading((p) => !p);
		try {
			const req = await fetch("http://localhost:8000/story/generate", {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ genre: selectedGenre }),
			});

			if (req.status === 401) return navigate("/auth/signin");

			const res = await req.json();
			return navigate(`/story/${res.data.id}`);
		} catch (error) {
			console.error("Error:", error);
		}
		setLoading((p) => !p);
	};

	return (
		<main className="w-[90%] mx-auto z-10">
			<Navigation />
			<form
				onSubmit={onSubmit}
				className="justify-center items-center hidden"
			>
				<div className="space-y-4 text-center flex flex-col items-center">
					<h1 className="text-5xl">Mythia</h1>
					<p>
						Unleash your creativity with AI-powered story
						generation.
					</p>
					<MultiSelect
						options={JSON.parse(genre).map((v: string) => ({
							label: v,
							value: v,
						}))}
						placeholder="Select genre"
						onValueChange={setSelectedGenre}
					/>
					{cookies.user ? (
						<>
							<Button
								variant="outline"
								type="submit"
								disabled={loading}
							>
								{loading && (
									<Loader2 className="animate-spin" />
								)}
								Generate Story
							</Button>
							<SignOut />
						</>
					) : (
						<>
							<h3>You need to Login</h3>
							<Link to="/auth/signin">
								<Button variant="link">Sign In</Button>
							</Link>
						</>
					)}
				</div>
			</form>
		</main>
	);
};

export default App;
