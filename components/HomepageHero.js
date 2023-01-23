import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

import twoPhones from "../public/images/two-phones.png";

function HomepageHero() {
	return (
		<>
			<section className="relative pb-20 bg-gray-800">
				<div className="absolute bottom-0 inset-x-0 h-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
				<div className="absolute -bottom-[6px] -left-[30px] h-3/5 w-[82%] bg-gradient-to-r from-purple-600 to-blue-600 transform -rotate-6"></div>
				<div className="absolute z-10 top-[120px] md:-top-60 left-1/2 transform translate-y-full translate-x-0 lg:translate-x-[-20%] lg:translate-y-[66%] ">
					<Image
						src={twoPhones}
						alt="Presentation phones showing Alertit dashboard"
					/>
				</div>

				<div className="relative px-8 container pt-12 md:pt-20 mx-auto">
					<div className="hidden 2xl:block absolute bottom-0 w-3/5 mb-40 h-2"></div>
					<div className="w-full lg:w-1/2 2xl:w-2/5 mb-12 mb:mb-0">
						<span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
							Never miss a beat!
						</span>
						<div className="max-w-lg lg:max-w-md 2xl:max-w-none mt-7 mb-12 text-6xl lg:text-7xl 2xl:text-9xl text-white border-b border-white pb-12">
							<h2 className="text-violet-200">
								Welcome to
								<span className="block pt-2 md:pl-16 text-center md:text-left font-bold">
									Alertit
								</span>
							</h2>
						</div>
						<p className="mb-12 lg:mb-16 text-lg lg:text-3xl text-white opacity-90">
							The ultimate & <span className="underline">free</span>{" "}
							<span className="block"> Uptime Monitor</span>
						</p>
						<div className="absolute -bottom-1/2 left-[5%] md:relative lg:left-0 group max-w-max">
							<Link
								href="signin"
								className=" font-semibold text-sm lg:text-lg text-gray-900 uppercase tracking-px overflow-hidden rounded-md"
							>
								<div className="relative p-4 px-11 bg-gradient-to-r from-blue-200 to-green-200 overflow-hidden rounded-md">
									<div className="absolute top-0 left-0 transform -translate-y-full group-hover:-translate-y-0 h-full w-full bg-white transition ease-in-out duration-500"></div>
									<p className="relative z-10">Get Started</p>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</section>
			<div className="h-24 w-full	bg-indigo-400 py-24"></div>
		</>
	);
}

export default HomepageHero;
