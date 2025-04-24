/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(6, { message: "Password must be at least 8 characters" }),
	remember: z.boolean().optional(),
});

const login = () => {
	const navigate = useNavigate();
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const req = await fetch("http://localhost:8000/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const res = await req.json();
		if (res.token) {
			return navigate("/");
		}
	};

	return (
		<main className="w-2/3 mx-auto flex h-screen items-center ">
			<Card className="w-full max-w-sm ">
				<CardContent>
					<h1 className="text-2xl mb-4 text-center">
						Sign In to <span className="font-bold">Mythia</span>
					</h1>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<FormField
								name="email"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="username">
											Username
										</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							></FormField>
							<FormField
								name="password"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="password">
											Password
										</FormLabel>
										<FormControl>
											<Input {...field} type="password" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							></FormField>
							<Button
								variant="default"
								type="submit"
								className="w-full"
								disabled={form.formState.isSubmitted}
							>
								{form.formState.isSubmitted && (
									<Loader2 className="animate-spin" />
								)}
								Submit
							</Button>
							<Link to="/auth/signup">
								<Button variant="link">Sign Up</Button>
							</Link>
						</form>
					</Form>
				</CardContent>
			</Card>
		</main>
	);
};

export default login;
