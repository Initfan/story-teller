import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Wrapper from "@/components/wrapper";

const Story = () => {
	return (
		<Wrapper centered={false} className="overflow-hidden py-4">
			<main className="my-2 md:my-4">
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-4xl font-bold">
							Lorem ipsum dolor sit.
						</h2>
						<div className="flex space-x-3 mt-3 h-4 items-center">
							{["misteri", "mistis"].map((v) => (
								<>
									<div className="font-medium text-accent">
										{v}
									</div>
									<Separator orientation="vertical" />
								</>
							))}
						</div>
					</div>
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline">Edit Profile</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Edit profile</DialogTitle>
								<DialogDescription>
									Make changes to your profile here. Click
									save when you're done.
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label
										htmlFor="name"
										className="text-right"
									>
										Name
									</Label>
									<Input
										id="name"
										value="Pedro Duarte"
										className="col-span-3"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label
										htmlFor="username"
										className="text-right"
									>
										Username
									</Label>
									<Input
										id="username"
										value="@peduarte"
										className="col-span-3"
									/>
								</div>
							</div>
							<DialogFooter>
								<Button type="submit">Save changes</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</main>
			<ScrollArea className="h-1/3 flex-1 pr-4">
				{Array.from({ length: 7 }, (_, i) => (
					<p key={i} className="tracking-widest mb-1">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Labore incidunt cumque quibusdam voluptates eaque nihil
						consequatur nemo a, beatae delectus voluptatum accusamus
						odio placeat minima doloribus at omnis eligendi dolor.
					</p>
				))}
			</ScrollArea>
			{/* <section>
				<h4 className="text-xl">Pilih / buat kelanjutan cerita</h4>
				<div className="grid grid-cols-2 space-x-4 my-3">
					{Array.from({ length: 2 }, (_, i) => (
						<Card key={i} className="cursor-pointer select-none">
							<CardContent>
								<p className="text-sm">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Sint similique soluta,
									tempore quod voluptatem impedit.
								</p>
							</CardContent>
						</Card>
					))}
				</div>
				<Input placeholder="Masukan kelanjutan ceritamu.." />
			</section> */}
		</Wrapper>
	);
};

export default Story;
