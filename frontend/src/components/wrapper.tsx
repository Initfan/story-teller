import { ReactNode } from "react";

type typeProps = {
	children: ReactNode;
	centered?: boolean;
	className?: string;
};

const Wrapper = ({ children, centered = true, className }: typeProps) => {
	const style = `h-screen w-3/4 md:w-2/3 m-auto flex ${
		centered && "justify-center"
	} flex-col ${className}`;
	return <main className={style}>{children}</main>;
};

export default Wrapper;
