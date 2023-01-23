import React from "react";
import Image from "next/image";
import Link from "next/link";

function StatusPage(props) {
	const [isStatusTrue] = React.useState(true);
	const [responseTime,setResponseTime] = React.useState(0);

	React.useEffect(() => {
		(async () => {
			const resTime = await getResponseTime();
			setResponseTime(resTime);
		})();
	},[])

	const getResponseTime = async() => {
		const request_start_at = performance.now();
		const response = await fetch(props.url,{mode:"no-cors"});
		const response_end = performance.now();
		const request_duration = response_end - request_start_at;
		return request_duration;
	}


	return (
		<div className="mt-20 max-w-7xl mx-auto h-screen">
			<div className="flex flex-col lg:flex-row lg:gap-16 mx-auto px-4 md:px-12 lg:px-20">
				<Image
					className="w-full lg:w-1/2"
					src={"data:image/gif;base64," + props.image}
					width={400}
					height={400}
				/>
				<ul className="text-stone-50 text-2xl flex flex-col gap-4 mt-16">
					<li className="text-indigo-200">
						Site Name: <span className="text-white">{props.name}</span>
					</li>
					<li className="text-indigo-200">
						<Link href={props.url}>
							Site URL :{" "}
							<span className="text-white hover:underline">{props.url}</span>{" "}
						</Link>
					</li>
					<li className="text-indigo-200">
						Last check time:{" "}
						<span className="text-white">{props.lastCheck}</span>
					</li>

					<li className="text-indigo-200">
						Status:{" "}
						<span className={isStatusTrue ? "text-green-400" : "text-red-400"}>
							{props.upCheckStatus.toString()}
						</span>
					</li>
					<li className="text-indigo-200">
						Accepted Status code:{" "}
						<span className="text-white">{props.acceptedStatusCodes}</span>
					</li>
					<li className="text-indigo-200">
						Port: <span className="text-white">{props.port}</span>
					</li>
					<li>
						Response Time: <span className="text-indigo-200">{responseTime} ms</span>
					</li>
				</ul>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const monitorId = context.query.page;
	if (typeof monitorId == "undefined") {
		return {
			redirect: { destination: "/404" },
		};
	} else {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		try {
			const response = await fetch(
				process.env.SITE_URI + "/api/monitors?id=" + monitorId,
				requestOptions
			);
			const monitors = await response.json();
			console.log(monitors);
			if (!monitors.data[0]) {
				return {
					redirect: { destination: "/404" },
				};
			} else {
				return {
					props: {
						name: monitors.data[0].name,
						url: monitors.data[0].url,
						heartbeat: monitors.data[0].heartbeat,
						acceptedStatusCodes: monitors.data[0].acceptedStatusCodes,
						monitorType: monitors.data[0].monitorType,
						port: monitors.data[0].port,
						image: monitors.data[0].image,
						lastCheck: monitors.data[0].lastCheck,
						upCheckStatus: monitors.data[0].upCheckStatus,
					},
				};
			}
		} catch (err) {
			console.log(err);
		}
	}
	return { props: {} };
}
export default StatusPage;
