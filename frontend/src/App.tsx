// import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";

const App = () => {
	// const [genre, setGenre] = useState<string[] | null>(
	// 	JSON.parse(localStorage.getItem("genre")!)
	// );

	return (
		<ThemeProvider defaultTheme="system" storageKey="theme">
			<div className="flex justify-center items-center h-screen">
				<div className="space-y-4 text-center">
					<h1 className="text-5xl">Mythia</h1>
					<p>
						Unleash your creativity with AI-powered story
						generation.
					</p>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default App;
