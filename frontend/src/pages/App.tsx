import { FormEvent, useState } from "react";
import { Button } from "../components/ui/button";
import { MultiSelect } from "../components/multi-select";
import { Link, useLoaderData, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Wrapper from "@/components/wrapper";
import { useCookies } from "react-cookie";

const App = () => {
	const [selectedGenre, setSelectedGenre] = useState<string[]>();
	const { genre }: { genre: string } = useLoaderData();
	const [loading, setLoading] = useState(false);
	const [cookies] = useCookies(["user"]);
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
		<Wrapper className="h-screen">
			<Navigation />

			<section className="flex flex-col items-center justify-center flex-1 space-y-4">
				<h1 className="md:text-5xl text-2xl font-bold text-center">
					Un<span className="text-yellow-500">leash</span> Your
					<span className="text-purple-500"> Imagin</span>ation
				</h1>
				<p className="md:text-lg text-center max-w-2xl">
					{/* Unleash your creativity with AI-powered story generation. */}
					Mythia is a collaborative storytelling platform that allows
					you to create, share, and explore incredible stories with
					others. Join our community of storytellers and let your
					creativity flow!
				</p>

				{cookies.user ? (
					<form
						onSubmit={onSubmit}
						className="justify-center flex-col w-1/3 space-y-3 flex items-center"
					>
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
							disabled={loading}
						>
							{loading && <Loader2 className="animate-spin" />}
							Generate
						</Button>
					</form>
				) : (
					<Link to="/auth/signin">
						<Button>Get Started</Button>
					</Link>
				)}
			</section>
		</Wrapper>
	);
};

export default App;
