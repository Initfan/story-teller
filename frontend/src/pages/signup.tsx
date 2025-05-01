/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import logo from "../assets/images/mythia-logo.png";
import bg from "../assets/images/sci-fi.jpg";
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
import Wrapper from "@/components/wrapper";
import { ModeToggle } from "@/components/mode-toggle";
import { Checkbox } from "@/components/ui/checkbox";

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
		<Wrapper Bg={false} className="w-full! grid grid-cols-2 h-screen">
			<main className="p-8 relative">
				<div className="flex items-center justify-between absolute inset-x-0 px-8">
					<div className="flex items-center space-x-3">
						<img src={logo} className="w-12" />
						<h2 className="text-lg font-semibold">Mythia</h2>
					</div>
					<ModeToggle />
				</div>
				<div className="flex flex-col justify-center items-center space-y-8 h-full">
					<h1 className="text-3xl">
						Sign Up to <span className="font-semibold">Mythia</span>
					</h1>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-1/2 space-y-3"
						>
							<FormField
								name="name"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="name">
											Username
										</FormLabel>
										<FormControl>
											<Input {...field} type="name" />
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
											<Input {...field} type="email" />
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
							<div className="flex space-x-2">
								<Checkbox id="remember" className="mt-1" />
								<label
									htmlFor="remember"
									className="text-sm cursor-pointer "
								>
									I agree to the{" "}
									<span className="text-blue-500">
										Terms and Policies
									</span>{" "}
									and{" "}
									<span className="text-blue-500">
										Privacy Policy
									</span>
								</label>
							</div>
							<Button
								type="submit"
								className="w-full"
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting && (
									<Loader2 className="animate-spin" />
								)}
								Register
							</Button>
						</form>
						<p className="text-sm text-shadow-background">
							Already have an account?{" "}
							<Link to="/auth/signin" className="underline">
								Sign In
							</Link>
						</p>
					</Form>
				</div>
			</main>
			<section className="mix-blend-luminosity rounded-l-xl overflow-hidden relative">
				<div className="bg-slate-950 absolute inset-0 opacity-60"></div>
				<img
					src={bg}
					alt=""
					className="w-full h-full size-fit object-center object-cover"
				/>
			</section>
		</Wrapper>
	);
};

export default signup;
