import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import Link from "next/link";

import loginBg from "../public/images/login-bg.jpg";
import eyeIcon from "../public/images/icons/eye-open.png";
import eyeHideIcon from "../public/images/icons/eye-close.png";
import Router from "next/router";

export default function Register() {
	const [isEyeOpen, toggleEye] = useState(0);
	const router = useRouter();

	const handleClick = () => {
		toggleEye(!isEyeOpen);
		const type =
			document.getElementById("password").getAttribute("type") === "password"
				? "text"
				: "password";
		document.getElementById("password").setAttribute("type", type);
	};

	const onSubmit = (event) => {
		event.preventDefault();

		const firstName = event.target.firstname.value;
		const lastName = event.target.lastname.value;
		const email = event.target.email.value;
		const password = event.target.password.value;
		const repeatPassword = event.target.repeatpassword.value;

		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			email: email,
			firstName: firstName,
			lastName: lastName,
			password: password,
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		if (firstName && lastName && email && password && repeatPassword) {
			if (password === repeatPassword) {
				fetch(`/api/users`, requestOptions)
					.then((response) => response.json())
					.then((result) => {
						if (result.success === true) {
							Router.push("/signin?success=true");
						} else {
							const errors = JSON.parse(result);
							console.log(errors);
						}
					})
					.catch((error) => console.log("error", error));
				router.push("/signin");
			} else {
				console.log("Passwords are not the same.");
			}
		} else {
			console.log("Missing data");
		}
	};

	return (
		<section className="">
			<div className="">
				<div className="relative h-full">
					<Image
						className="object-cover "
						src={loginBg}
						alt="Log in image"
						priority={true}
						quality={100}
					/>
					<div className="absolute top-10 lg:top-24 px-6 mx-auto w-full md:w-3/4 lg:left-32 xl:w-1/2 xl:left-[25%]">
						<div>
							<div className="text-center">
								<h2 className="text-4xl font-bold text-center text-white">
									Sign Up
								</h2>
							</div>
							<form
								onSubmit={onSubmit}
								className="flex flex-col gap-6 mt-8 text-lg"
								method="post"
								action="/api/auth/callback/credentials"
							>
								<div>
									<label
										htmlFor="firstname"
										className="flex flex-col block text-gray-200"
									>
										First name
									</label>
									<input
										type="text"
										name="firstname"
										placeholder="Enter your first name"
										className="h-12 bg-transparent block w-full px-4 py-2 mt-2 text-gray-200 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
									></input>
								</div>

								<div>
									<label
										htmlFor="lastname"
										className="flex flex-col block text-gray-200"
									>
										Last name
									</label>
									<input
										type="text"
										name="lastname"
										placeholder="Enter your last name"
										className="h-12 text-gray-200 bg-transparent block w-full px-4 py-2 mt-2 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
									></input>
								</div>

								<div>
									<label htmlFor="email" className="block text-gray-200">
										Email
										<input
											placeholder="ex: john@gmail.com"
											className="h-12 bg-transparent block w-full px-4 py-2 mt-2 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
											autoComplete="email"
											name="email"
											type="email"
										/>
									</label>
								</div>

								<div>
									<label
										htmlFor="password"
										className="relative flex flex-col block text-white"
									>
										Password
										<input
											id="password"
											placeholder="Enter your password"
											autoComplete="current-password"
											name="password"
											type="password"
											className="h-12 block bg-transparent w-full px-4 py-2 mt-2 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
										/>
										<button className="absolute bottom-0 right-4" type="button">
											<Image
												className="h-auto w-auto invert"
												src={isEyeOpen ? eyeIcon : eyeHideIcon}
												alt="Eye icon"
												width={30}
												height={30}
												onClick={handleClick}
											/>
										</button>
									</label>
								</div>

								<div>
									<label
										htmlFor="repeatpassword"
										className="relative flex flex-col block text-white"
									>
										Repeat Password
										<input
											placeholder="Re-enter your password"
											autoComplete="current-password"
											name="repeatpassword"
											type="password"
											className="h-12 bg-transparent block w-full px-4 py-2 mt-2 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
										/>
									</label>
								</div>
								<button
									className="mx-auto py-2 px-8 mx-auto border border-transparent rounded-md bg-white fade-out hover:bg-indigo-600 hover:text-white"
									type="submit"
								>
									Sign Up
								</button>

								<p className="text-center text-white text-lg">
									Already have an account?
									<Link
										className="hover:text-indigo-600 underline ml-2"
										href="/signin"
									>
										Sign in.
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
