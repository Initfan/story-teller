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
import { useState } from "react";
import { option } from "@/lib/interface";
import { Form } from "react-router";

type props = {
	option: option[];
	storyAddHandler: (option: string) => void;
};

const StoryAdd = ({ option, storyAddHandler }: props) => {
	const [checked, setChecked] = useState<number | null>();
	const [selectedOption, setSelectedOption] = useState<string>();

	const handleSubmit = () => storyAddHandler(selectedOption!);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="cursor-pointer">
					Tambah
				</Button>
			</DialogTrigger>
			<Form method="post" action="/">
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Kelanjutan cerita</DialogTitle>
						<DialogDescription>
							Pilih atau buat kelanjutan sesuai keinginanmu.
						</DialogDescription>
					</DialogHeader>
					<main>
						<RadioGroup>
							{option.map((v) => (
								<div
									className="flex items-center space-x-3"
									onClick={() => {
										setChecked(v.id);
										setSelectedOption(v.option);
									}}
									key={v.id}
								>
									<RadioGroupItem
										value={`${v.id}`}
										id={`${v.id}`}
										checked={checked === v.id}
									/>
									<Label htmlFor={`${v.id}`}>
										{v.option}
									</Label>
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
								onChange={(e) =>
									setSelectedOption(e.target.value)
								}
							/>
						</div>
					</main>
					<DialogFooter>
						<DialogClose asChild>
							<Button onClick={handleSubmit}>Simpan</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Form>
		</Dialog>
	);
};

export default StoryAdd;
