import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Input } from "./ui/input";
import { useRef, useState } from "react";

type props = {
	option: string[];
	storyAddHandler: (option: number, story: string) => void;
};

const StoryAdd = ({ option, storyAddHandler }: props) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [checked, setChecked] = useState<number | null>();

	const handleSubmit = () =>
		storyAddHandler(checked!, inputRef.current!.value);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="cursor-pointer">
					Tambah
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Kelanjutan cerita</DialogTitle>
					<DialogDescription>
						Pilih atau buat kelanjutan sesuai keinginanmu.
					</DialogDescription>
				</DialogHeader>
				<main>
					<RadioGroup>
						{option.map((v, i) => (
							<div
								className="flex items-center space-x-3"
								onClick={() => setChecked(i)}
								key={i}
							>
								<RadioGroupItem
									value={`${i}`}
									id={`${i}`}
									checked={checked === i}
								/>
								<Label htmlFor={`${i}`}>{v} </Label>
							</div>
						))}
					</RadioGroup>
					<div
						className="w-full max-w-sm grid gap-1.5 my-2"
						onChange={() => setChecked(null)}
					>
						<Label htmlFor="picture">Cerita</Label>
						<Input
							id="story"
							placeholder="Masukan ceritamu"
							ref={inputRef}
						/>
					</div>
				</main>
				<DialogFooter>
					<DialogClose asChild>
						<Button onClick={handleSubmit}>Simpan</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default StoryAdd;
