type option = {
	id: number;
	description: string;
	selectedOption: (option: string) => void;
};

const StoryOption = (props: option) => {
	const selectedOptionHandler = (value: string) =>
		props.selectedOption(value);

	return (
		<div>
			<p>{props.description}</p>
			<button
				key={props.id}
				onClick={() => selectedOptionHandler(props.id.toString())}
			>
				{props.id}
			</button>
		</div>
	);
};

export default StoryOption;
