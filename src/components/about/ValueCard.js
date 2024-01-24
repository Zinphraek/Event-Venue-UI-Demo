import React from "react";

const ValueCard = ({ name, description }) => {
	return (
		<div className="flex flex-col h-full max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
			<div className="px-6 py-4 bg-gradient-to-r from-gray-900 to-yellow-500 text-white">
				<div className="font-bold text-xl mb-2">{name}</div>
			</div>
			<div className="px-6 py-4 flex-grow items-stretch">
				<p className="text-gray-700 text-base">{description}</p>
			</div>
		</div>
	);
};

export default ValueCard;
