import { Outlet } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import { CookiesProvider } from "react-cookie";

const Layout = () => {
	return (
		<ThemeProvider defaultTheme="system" storageKey="theme">
			<CookiesProvider defaultSetOptions={{ maxAge: 3600 }}>
				<Outlet />
			</CookiesProvider>
		</ThemeProvider>
	);
};

export default Layout;
