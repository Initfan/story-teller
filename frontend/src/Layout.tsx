import { Outlet } from "react-router";
import { ThemeProvider } from "./components/theme-provider";

const Layout = () => {
	return (
		<ThemeProvider defaultTheme="system" storageKey="theme">
			<Outlet />
		</ThemeProvider>
	);
};

export default Layout;
