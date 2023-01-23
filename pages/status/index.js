import React, { useState } from "react";
import { useRouter } from "next/router";

function SearchMonitor(props) {
	const router = useRouter();

	const handleSubmit = async event => {
		event.preventDefault();

		const searchId = event.target.searchInput.value;

		if (isValidMongoId(searchId)) {
			router.push(`/status/${searchId}`);
		} else {
			props.showAlert("Please enter valid ID");
		}
	};

	function isValidMongoId(Id) {
		return Id.match(/^[0-9a-fA-F]{24}$/);
	}

	return (
		<div className="h-screen py-10 max-w-7xl w-full mx-auto px-6 md:px-12">
			<form onSubmit={handleSubmit}>
				<div className="mx-10 relative sm:w-full md:w-1/2 items-center m-auto lg:mx-auto">
					<h2 className="text-white text-3xl md:text-4xl mb-12 md: my-12">
						Search Monitors by ID
					</h2>
					<input
						className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-[1000px]"
						placeholder="Monitor ID"
						type="text"
						name="searchInput"
						required
					/>
					<button
						type="submit"
						className="text-white absolute right-2.5 bottom-2.5  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Search
					</button>
				</div>
			</form>
		</div>
	);
}

export default SearchMonitor;
