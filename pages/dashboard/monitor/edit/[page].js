import { useSession, getSession } from "next-auth/react";
import { useState } from "react";
import Router from "next/router";
import Head from "next/head";

import { FiChevronDown } from "react-icons/fi";

function EditMonitor(props) {
	const [showDelete, setDeleteMonitor] = useState(false);
	const { data: session } = useSession();
	const submitForm = e => {
		e.preventDefault();

		const name = e.target.name.value;
		const url = e.target.url.value;
		const heartbeat = e.target.heartbeat.value;
		const acceptedStatusCodes = e.target.acceptedStatusCodes.value;
		const monitorType = e.target.monitorType.value;
		const owner = session._doc._id;
		const enabled = e.target.enabled.value == "true" ? true : false;
		const port = e.target.port.value;

		const raw = JSON.stringify({
			id: props.monitorId,
			update: {
				enabled,
				port,
				name,
				url,
				heartbeat,
				acceptedStatusCodes,
				monitorType,
				owner,
			},
		});
		const myHeaders = new Headers();

		myHeaders.append("Content-Type", "application/json");

		const requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(props.SITE_URI + "/api/monitors", requestOptions)
			.then(response => response.json())
			.then(result => {
				if (result.success === true) {
					Router.push("/");
				}
			})
			.catch(error => console.log("error", error));
	};

	function deleteMonitorEvent(e, remove) {
		e.preventDefault();

		if (confirm("Do you want to delete ?") == true) {
			const raw = JSON.stringify({
				id: remove,
			});
			const myHeaders = new Headers();

			myHeaders.append("Content-Type", "application/json");

			const requestOptions = {
				method: "DELETE",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			};

			fetch(props.SITE_URI + "/api/monitors", requestOptions)
				.then(response => response.json())
				.then(result => {
					if (result.success === true) {
						Router.push("/");
					}
				})
				.catch(error => console.log("error", error));
		}
	}

	return (
		<div className="md:w-3/4 xl:w-1/2 max-w-[700px] py-16 px-8 md:px-12 text-white mx-auto">
			<Head>
				<title>Edit Monitor</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<h1 className="text-3xl mb-4">Edit Monitor</h1>

			<form
				className="w-full flex flex-col gap-5"
				method="POST"
				action=""
				onSubmit={submitForm}
			>
				<div>
					<label className="block mb-2 dark:text-white" htmlFor="enabled">
						Enabled
					</label>
					<select
						id="enabled"
						required
						defaultValue={props.enabled}
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
						name="enabled"
					>
						<option defaultValue="true">true</option>
						<option defaultValue="false">false</option>
					</select>
				</div>

				<div>
					<label className="block mb-2 dark:text-white" htmlFor="name">
						Name
					</label>
					<input
						id="name"
						defaultValue={props.name}
						required
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
						type="text"
						name="name"
					/>
				</div>

				<div>
					<label className="block mb-2 dark:text-white" htmlFor="url">
						URL
					</label>
					<input
						id="url"
						required
						defaultValue={props.url}
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
						type="url"
						name="url"
					/>
				</div>

				<div>
					<label className="block mb-2 dark:text-white" htmlFor="heartbeat">
						Heartbeat
					</label>
					<select
						id="heartbeat"
						required
						defaultValue={props.heartbeat}
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
						name="heartbeat"
					>
						<option>Choose heartbeat</option>
						<option defaultValue="1">1</option>
						<option defaultValue="5">5</option>
						<option defaultValue="10">10</option>
						<option defaultValue="30">30</option>
						<option defaultValue="60">60</option>
					</select>
				</div>

				<div>
					<label
						className="block mb-2 dark:text-white"
						htmlFor="acceptedStatusCodes"
					>
						Accepted Status Codes
					</label>
					<select
						defaultValue={props.acceptedStatusCodes}
						id="acceptedStatusCodes"
						required
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
						name="acceptedStatusCodes"
					>
						<option>Choose acceptedStatusCodes</option>
						<option defaultValue="any">Any</option>
						<option defaultValue="0-199">0-199</option>
						<option defaultValue="200-299">200-299</option>
						<option defaultValue="300-399">300-399</option>
						<option defaultValue="400-499">400-499</option>
						<option defaultValue="500-599">500-599</option>
					</select>
				</div>

				<div>
					<label className="block mb-2 dark:text-white" htmlFor="monitorType">
						Monitor Type
					</label>
					<select
						id="monitorType"
						required
						defaultValue={props.monitorType}
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
						name="monitorType"
					>
						<option>Choose a monitor type</option>
						<option defaultValue="https">https</option>
						<option defaultValue="tcp">tcp</option>
					</select>
				</div>

				<div>
					<label className="block mb-2 dark:text-white" htmlFor="port">
						Port
					</label>
					<input
						id="port"
						defaultValue={props.port}
						required
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
						type="number"
						name="port"
					/>
				</div>
				<button
					className="w-1/2 lg:w-full mt-4 lg:mt-[30px] text-white bg-blue-700 hover:ring-2 hover:outline-none hover:ring-blue-300 rounded-lg px-5 py-2.5 text-center"
					type="submit"
				>
					Save
				</button>
			</form>
			<div className="flex flex-col">
				<button
					className="text-lg mt-6 text-left flex items-center gap-3 pb-2 mb-4 border-b border-red-700 text-red-700"
					onClick={() => setDeleteMonitor(prev => !prev)}
					type="button"
				>
					Delete Monitor
					<FiChevronDown
						className={`h-5 w-5 ${showDelete ? "" : "rotate-180"}`}
					/>
				</button>

				<button
					className={`w-1/2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ${
						showDelete ? "block" : "hidden"
					}`}
					onClick={event => deleteMonitorEvent(event, props.monitorId)}
					type="submit"
				>
					Delete
				</button>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: { destination: "/" },
		};
	} else {
		const monitorId = context.query.page;

		if (typeof monitorId == "undefined") {
			return {
				redirect: { destination: "/" },
			};
		}

		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		const response = await fetch(
			process.env.SITE_URI + "/api/monitors?id=" + monitorId,
			requestOptions
		)
			.then(response => response.json())
			.then(result => {
				return {
					props: {
						monitorId: monitorId,
						name: result.data[0].name,
						url: result.data[0].url,
						heartbeat: result.data[0].heartbeat,
						acceptedStatusCodes: result.data[0].acceptedStatusCodes,
						monitorType: result.data[0].monitorType,
						SITE_URI: process.env.SITE_URI,
						enabled: result.data[0].enabled,
						port: result.data[0].port,
					},
				};
			})
			.catch(error => console.log("error", error));

		return response;
	}

	return {
		props: {},
	};
}

export default EditMonitor;
