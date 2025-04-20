import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";

const App = () => {
<<<<<<< HEAD
	const [story, setStory] = useState<storyType>();

	const createStory = async (formData: FormData) => {
		const req = await fetch("http://localhost:8000/story/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				genre: formData.getAll("genre"),
<<<<<<< HEAD
				option: formData.get("option"),
=======
>>>>>>> 0451b12d61cce57b98068bc7b34df2cfb388917c
			}),
		});

		const res = await req.json();

<<<<<<< HEAD
		setStory(JSON.parse(res.data));
=======
		setStory(res.data);
>>>>>>> 0451b12d61cce57b98068bc7b34df2cfb388917c
	};

	return story ? (
		<StoryView {...story} />
	) : (
		<form action={createStory}>
			<StoryCreate />
		</form>
=======
	return (
		<ThemeProvider defaultTheme="dark" storageKey="theme">
			<p>Mythica</p>
			<ModeToggle />
			{/* <p>hello world</p> */}
		</ThemeProvider>
>>>>>>> backend
	);
};

export default App;
