import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Image from "next/image";
import { md5 } from "request/lib/helpers";
import { HiX } from "react-icons/hi";

import alertitLogo from "../public/alertit-logo-nobg.png";
import HamburgerIcon from "../public/images/icons/hamburger-menu.svg";

function Navigation() {
	const { data: session } = useSession();
	const router = useRouter();
	const [isNavOpen, setIsNavOpen] = useState(false);

	return (
		<>
			<nav className="max-w-7xl w-full mx-auto px-6 md:px-12 flex justify-between items-center">
				<Link
					className="self-start"
					href="/"
					onClick={() => setIsNavOpen(false)}
				>
					<Image
						className="h-full object-none"
						src={alertitLogo}
						alt="Alertit logo"
						height={175}
					/>
				</Link>
				<Image
					className="lg:hidden"
					src={HamburgerIcon}
					alt="Two white dashes"
					onClick={() => setIsNavOpen((prev) => !prev)}
				/>
				<div
					className={`flex flex-col justify-start lg:flex-row items-center lg:justify-between lg:flex-wrap pt-0 px-4 text-white ${
						isNavOpen ? "showMenuNav" : "hideMenuNav"
					}`}
				>
					<HiX
						className="fill-white h-8 w-8 mt-10 self-end mr-4 lg:hidden"
						onClick={() => setIsNavOpen(false)}
					/>

					{session ? (
						<ul className="flex flex-col text-center self-start lg:flex-row text-lg items-left lg:items-center text-white mt-8 lg:m-0 mx-auto gap-4">
							<li className="p-3 w-[200px] active:bg-white active:text-black focus:bg-white focus:text-black focus-within:bg-white focus-within:text-black lg:w-auto">
								<Link href="/dashboard"> Dashboard </Link>
							</li>

							<li className="p-3 w-[200px] active:bg-white active:text-black focus:bg-white focus:text-black focus-within:bg-white focus-within:text-black  lg:w-auto">
								<Link href="/status"> Status </Link>
							</li>
							<li className="p-3 w-[200px] active:bg-white active:text-black focus:bg-white focus:text-black focus-within:bg-white focus-within:text-black  lg:w-auto">
								<Link
									className="flex items-center justify-center gap-3"
									href="/dashboard/user"
								>
									{"Edit profile"}
									<Image
										alt="profile-pic"
										src={
											"https://www.gravatar.com/avatar/" + md5(session.email)
										}
										width={100}
										height={100}
										className="w-10 h-10 rounded-full"
									></Image>
								</Link>
							</li>
						</ul>
					) : (
						<ul className="flex gap-4 text-white">
							<li>
								<Link href="/register">
									<button
										className="text-xl bg-gray-500 text-white px-8 py-4 rounded-xl"
										onClick={() => {
											router.push("/api/auth/signin");
										}}
									>
										Account
									</button>
								</Link>
							</li>
						</ul>
					)}
				</div>
			</nav>
			<style>{`

			@media screen and (max-width: 1023px) {
				.hideMenuNav {
				display: none;
			}
		 }
		 .showMenuNav {
		   position: fixed;
		   width: 100%;
		   height: 100vh;
		   top: 0;
		   left: 0;
		   background: #1e293b;
		   z-index: 100;
		   display: flex;
		   flex-direction: column;
		   align-items: center;
		 }
	   `}</style>
		</>
	);
}

export default Navigation;
