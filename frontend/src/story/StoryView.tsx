import { story } from "../utils/definition";

const StoryView = (props: story) => {
	return (
		<>
			<h1>{props.title}</h1>
			<small>{props.genre}</small>
			<p>{props.sinopsis}</p>

			<button>1</button>
			<button>2</button>
			<button>3</button>
		</>
	);
};

export default StoryView;
