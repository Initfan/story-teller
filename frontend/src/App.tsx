import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";

const App = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="theme">
			<p>Mythica</p>
			<ModeToggle />
			{/* <p>hello world</p> */}
		</ThemeProvider>
	);
};

export default App;
