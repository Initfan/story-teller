import { Button } from "./ui/button";
import logo from "../assets/images/mythia-logo.png";
import { useCookies } from "react-cookie";
import { Link } from "react-router";

interface props {
	userMenu?: boolean;
}

const Navigation = ({ userMenu = false }: props) => {
	const [cookies] = useCookies(["user"]);

	return (
		<nav className="py-6 flex justify-between items-center">
			<div className="flex items-center space-x-3">
				<img src={logo} className="w-14" />
				<h2 className="md:text-2xl text-xl font-semibold">Mythia</h2>
			</div>
			{userMenu}
			{cookies.user && <p>Hello welcome back, {cookies.user.name}</p>}
			{!cookies.user && (
				<div className="flex items-center space-x-3">
					<Link to="/auth/signin">
						<Button variant="outline">Login</Button>
					</Link>
					<Link to="/auth/signup">
						<Button className="bg-purple-500 hover:bg-purple-600 text-white hidden md:block">
							Sign Up
						</Button>
					</Link>
				</div>
			)}
		</nav>
	);
};

export default Navigation;
