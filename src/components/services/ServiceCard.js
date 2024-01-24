import React from "react";
import PropTypes from "prop-types";

const ServiceCard = (props) => {
	const { service, bookingHandler } = props;
	return (
		<button onClick={() => bookingHandler(service)} className="flex items-center w-full p-2 mx-auto bg-white rounded-md shadow-lg shadow-gray-400 space-x-4 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-100 md:w-90% md:p-3">
			<img className="w-12 h-12" src={service.imageSource} alt={service.title} />
			<div className="flex flex-col items-start justify-start">
				<div className="text-xl font-bold text-black">{service.title}</div>
				<p className="text-slate-500 text-xs text-left">{service.description}</p>
			</div>
		</button>
	);
};

ServiceCard.propTypes = {
	service: PropTypes.object.isRequired,
};

export default ServiceCard;
