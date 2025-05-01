import { ReactNode } from "react";
import bg from "../assets/images/sci-fi.jpg";

type typeProps = {
	children: ReactNode;
	className?: string;
};

const Wrapper = ({ children, className }: typeProps) => {
	const style = `w-[95%] md:w-[90%] mx-auto flex flex-col ${className}`;
	return (
		<main className={style}>
			<div className="h-screen absolute inset-0 -z-10 overflow-hidden mix-blend-overlay">
				<img
					src={bg}
					alt=""
					className="w-full h-full size-fit object-center"
				/>
			</div>
			{children}
		</main>
	);
};

export default Wrapper;
