import { Button } from "@/components/ui/button";
import bg from "../assets/images/sci-fi.jpg";
import Navigation from "@/components/navigation";

const LandingPage = () => {
	return (
		<main className="w-[90%] mx-auto z-10">
			<div className="h-screen absolute inset-0 -z-10 overflow-hidden mix-blend-overlay">
				<img
					src={bg}
					alt=""
					className="w-full h-full size-fit object-center"
				/>
			</div>

			<Navigation />

			<section className="flex flex-col items-center justify-center h-[80vh] space-y-6">
				<h1 className="md:text-5xl text-2xl font-bold text-center">
					Un<span className="text-yellow-500">leash</span> Your
					<span className="text-purple-500"> Imagin</span>ation
				</h1>
				<p className="md:text-lg text-center max-w-2xl">
					Mythia is a collaborative storytelling platform that allows
					you to create, share, and explore incredible stories with
					others. Join our community of storytellers and let your
					creativity flow!
				</p>
				<Button variant="secondary">Get Started</Button>
			</section>
		</main>
	);
};

export default LandingPage;
