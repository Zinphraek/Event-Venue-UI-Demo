import React from "react";
import {
	formatDateForDetailsView,
	getTimeString,
} from "../../utilities/functions/Helpers";
import { Services } from "../../utilities/models/ServiceModel";

const ReservationDetailsView = ({ toggleModal, reservation }) => {
	const services = Services.reduce((acc, service) => {
		acc[service.title] = service;
		return acc;
	}, {});
	return (
		<div className="grid grid-cols-12 items-stretch w-screen-xl">
			<div className="hidden col-span-5 md:block">
				<img
					src={`/${services[reservation.eventType].imageSource}`}
					alt={reservation.eventType}
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="flex flex-col col-span-12 gap-4 p-4 bg-lime-500 md:col-span-7">
				<div className="flex flex-col justify-center gap-2">
					<h1 className="text-xl text-white font-extrabold font-alata uppercase md:text-2xl">
						Le Prestige Hall
					</h1>
					<a
						href="https://goo.gl/maps/xg7AUB9CXXY6Hwrn7"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm font-serif text-blue-500"
					>
						740 Lakeview Plaza Blvd, Worthington, OH 43085
					</a>
					<br />
				</div>
				<div className="flex flex-col justify-center gap-2">
					<h2 className="text-xl text-white font-bold font-alata uppercase border-b-2 border-b-white">
						Reservation Details
					</h2>
					<div>
						<div className="flex flex-col justify-center gap-2 border-b-2 border-b-white">
							<div className="flex flex-row justify-between">
								<h3 className="text-md font-bold font-serif">Start time:</h3>
								<h3 className="font-bold text-sm font-serif">
									{formatDateForDetailsView(reservation.startingDateTime)}
								</h3>
							</div>

							<div className="flex flex-row justify-between">
								<h3 className="text-md font-bold font-serif">At:</h3>
								<h3 className="font-bold text-sm font-serif">
									{`${getTimeString(reservation.startingDateTime)}`}
								</h3>
							</div>
							<br />

							<div className="flex flex-row justify-between">
								<h3 className="text-md font-bold font-serif">End time:</h3>
								<h3 className="font-bold text-sm font-serif">
									{formatDateForDetailsView(reservation.endingDateTime)}
								</h3>
							</div>

							<div className="flex flex-row justify-between">
								<h3 className="text-md font-bold font-serif">At:</h3>
								<h3 className="font-bold text-sm font-serif">
									{`${getTimeString(reservation.endingDateTime)}`}
								</h3>
							</div>
							<br />

							<div className="flex flex-row justify-between">
								<h3 className="text-md font-bold font-serif">Guest Count:</h3>
								<h3 className="font-bold text-sm font-serif">
									{reservation.numberOfSeats}
								</h3>
							</div>

							<div className="flex flex-row justify-between">
								<h3 className="text-md font-bold font-serif">Status:</h3>
								<h3 className="font-bold text-sm font-serif text-violet-500">
									{reservation.status}
								</h3>
							</div>
						</div>
					</div>
				</div>
				<div className="flex justify-end">
					<button
						className="px-10 py-2 my-0 font-bold tracking-widest rounded-md border-2 border-black font-alata hover:bg-black hover:text-white md:block"
						onClick={() => toggleModal(false)}
					>
						Go Back
					</button>
				</div>
			</div>
		</div>
	);
};

export default ReservationDetailsView;
