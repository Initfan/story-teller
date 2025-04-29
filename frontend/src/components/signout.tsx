import { useCookies } from "react-cookie";
import { Button } from "./ui/button";

const SignOut = () => {
	const [, setCookies] = useCookies(["user"]);

	const onSignout = async () => {
		await fetch("http://localhost:8000/auth/logout", {
			method: "POST",
			credentials: "include",
		});
		setCookies("user", null);
	};
	return (
		<Button variant="ghost" onClick={onSignout}>
			Sign Out
		</Button>
	);
};

export default SignOut;
