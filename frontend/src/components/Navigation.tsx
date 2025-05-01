import { Button } from "./ui/button";
import logo from "../assets/images/mythia-logo.png";
import { useCookies } from "react-cookie";
import { Link, NavLink } from "react-router";

const Navigation = () => {
	const [cookies] = useCookies(["user"]);

	return (
		<nav className="py-6 flex justify-between items-center absolute inset-x-0 w-[90%] mx-auto">
			<div className="flex items-center space-x-3">
				<img src={logo} className="w-14" />
				<h2 className="md:text-2xl text-xl font-semibold">Mythia</h2>
			</div>
			{cookies.user && (
				<div className="flex space-x-2">
					<NavLink to="/browse">
						<Button variant="link">Browse</Button>
					</NavLink>
					<NavLink to="/user/story">
						<Button variant="link">My Story</Button>
					</NavLink>
					<NavLink to="/profile/name">
						<Button variant="link">Profile</Button>
					</NavLink>
				</div>
			)}
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
