import React from "react";
import { AiOutlineFall } from "react-icons/ai";

function Features() {
	return (
		<section className="bg-gray-900 border border-blue-700">
			<div className="flex flex-wrap max-w-6xl mx-auto border border-white">
				<div className="relative w-full lg:w-1/4 py-10 px-8 text-center border-b lg:border-b-0 lg:border-r border-white">
					<AiOutlineFall className="absolute fill-white w-12 h-12 left-1/2 lg:left-auto lg:-right-6 -bottom-6 lg:bottom-auto" />
					<h3 className="text-lg text-white font-semibold uppercase">
						Monitoring uptime for HTTP(s) / TCP
					</h3>
				</div>
				<div className="relative w-full lg:w-1/4 py-10 px-8 text-center border-b lg:border-b-0 lg:border-r border-white">
					<AiOutlineFall className="absolute fill-white w-12 h-12 left-1/2 lg:left-auto lg:-right-6 -bottom-6 lg:bottom-auto" />
					<h3 className="text-lg text-white font-semibold uppercase">
						Fancy, Reactive, Fast UI/UX.
					</h3>
				</div>
				<div className="relative w-full lg:w-1/4 py-10 px-8 text-center border-b lg:border-b-0 lg:border-r border-white">
					<AiOutlineFall className="absolute fill-white w-12 h-12 left-1/2 lg:left-auto lg:-right-6 -bottom-6 lg:bottom-auto" />
					<h3 className="text-lg text-white font-semibold uppercase">
						Elaborate notification system
					</h3>
				</div>
				<div className="relative w-full lg:w-1/4 py-10 px-8 text-center border-b lg:border-b-0 lg:border-r border-white">
					<AiOutlineFall className="absolute fill-white w-12 h-12 left-1/2 lg:left-auto lg:-right-6 -bottom-6 lg:bottom-auto" />
					<h3 className="text-lg text-white font-semibold uppercase">
						1 second interval
					</h3>
				</div>
			</div>
		</section>
	);
}

export default Features;
