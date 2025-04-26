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
	name: z
		.string()
		.min(4, { message: "Username must be at least 4 characters" }),
	email: z.string().email(),
	password: z
		.string()
		.min(6, { message: "Password must be at least 8 characters" }),
});

const signup = () => {
	const navigate = useNavigate();
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const req = await fetch("http://localhost:8000/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (req.ok) {
			return navigate("/auth/signin");
		}
	};

	return (
		<main className="w-2/3 mx-auto flex h-screen items-center justify-center">
			<Card className="w-full max-w-sm ">
				<CardContent>
					<h1 className="text-2xl text-center mb-4">
						Sign Up to <span className="font-bold">Mythia</span>
					</h1>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<FormField
								name="name"
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
								name="email"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="email">
											Email
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
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting && (
									<Loader2 className="animate-spin" />
								)}
								Submit
							</Button>
						</form>
						<div className="flex items-center">
							Already have account?
							<Link to="/auth/signin">
								<Button
									variant="link"
									className="mx-0 px-1 text-blue-500"
								>
									Sign In
								</Button>
							</Link>
						</div>
					</Form>
				</CardContent>
			</Card>
		</main>
	);
};

export default signup;
