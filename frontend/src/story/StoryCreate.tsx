import { genres } from "../utils/definition";
import { useFormStatus } from "react-dom";

const StoryCreate = () => {
	const { pending } = useFormStatus();

	return (
		<>
			<h1>Story Teller</h1>
			<h3>Pilih genre ceritamu</h3>
			{genres.map((v, i) => (
				<>
					<input
						type="checkbox"
						value={v}
						id={v}
						placeholder={v}
						name="genre"
					/>
					<label htmlFor={v}>{v}</label>
					<br />
				</>
			))}
			<div>
				<label>Pilih kelanjutan cerita</label>
				<input type="radio" name="option" value="true" /> ya
				<input
					type="radio"
					name="option"
					value="false"
					defaultChecked
				/>
				tidak
			</div>
			<button type="submit" disabled={pending}>
				Buat cerita
			</button>
		</>
	);
};

export default StoryCreate;
