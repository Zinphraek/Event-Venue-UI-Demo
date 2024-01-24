import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { getAllEvents } from "./EventServices";
import { EntitiesListResponseModel } from "../../utilities/models/EntitiesListResponseModel";
import EventPreviewCard from "./EventPreviewCard";
import { NavLink } from "react-router-dom";
import { CONTACT_PAGE_URL } from "../../utilities/constants/PagesEndpoints";

const EventsPage = () => {
	const [events, setEventsData] = useState(EntitiesListResponseModel);

	useEffect(() => {
		getAllEvents(setEventsData);
	}, []);
	return (
		<div>
			<div className="container min-h-screen max-w-7xl mx-auto bg-gray-200 my-0 px-0">
				<section>
					<div className="bg-blue-500 min-w-full text-white mt-0 py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6 lg:px-8 text-center shadow-lg max-w-full sm:max-w-md">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">
							Welcome to Our Event Page!
						</h2>
						<p className="text-sm sm:text-base md:text-lg">
							We're glad you're here. Dive into our library and explore how
							others have enjoyed our prestigious facility and made priceless
							memories. Enjoy, and don't hesitate to{" "}
							<NavLink
								to={CONTACT_PAGE_URL}
								className="underline text-yellow-300"
							>
								reach us
							</NavLink>{" "}
							if you have any questions.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 xlg:grid-cols-4 gap-4 m-2">
						{events.content.map((event, index) => (
							<div
								key={`${event.title}-${index}`}
								className="shadow-lg shadow-gray-300 rounded-xl p-0"
							>
								<EventPreviewCard key={event.id} event={event} />
							</div>
						))}
					</div>
					{events.content.length === 0 && (
						<div className="flex flex-col items-center justify-center min-h-full">
							<h2 className="m-4 p-2 font-semibold text-sm text-gray-700 sm:text-lg md:text-2xl">
								No events have been posted yet as of now.
							</h2>
							<h2 className="m-4 p-2 font-semibold text-gray-700 text-sm sm:text-lg md:text-2xl">
								We appreciate your patience and kindly request you to check back
								at a later time for updates.
							</h2>
							<h2 className="m-4 p-2 font-semibold text-gray-700 text-sm sm:text-lg md:text-2xl">
								Thank you for your interest.
							</h2>
						</div>
					)}
				</section>
			</div>
			<ToastContainer />
		</div>
	);
};

export default EventsPage;
