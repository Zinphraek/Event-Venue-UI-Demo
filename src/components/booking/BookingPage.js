import React, { useState } from "react";
import FAQs from "../../utilities/components/FAQs";
import { useUserRefresh } from "../user/UserProvider";
import KeycloakService from "../config/KeycloakService";
import ContactInfo from "../../utilities/components/ContactInfo";
import Modal from "../../utilities/components/Modal";
import LocalizedModal from "../../utilities/components/LocalizedModal";
import { Outlet, useNavigate } from "react-router-dom";
import PagesEndPoints from "../../utilities/constants/PagesEndpoints";
import { APPOINTMENTS, RESERVATIONS } from "../../utilities/constants/AccountScreen";

/**
 * The page to book an appointment or make a reservation.
 * @returns  The page to book an appointment or make a reservation.
 */
const BookingPage = ({showApptmForm}) => {
	const navigateTo = useNavigate();
	const [showLoggingDialog, setShowLoggingDialog] = useState(false);
	const setFetchUserFlag = useUserRefresh();


	const singIn = async () => {
		await KeycloakService.doLogin(setFetchUserFlag);
	};

	const bookAppiontment = () => {
		navigateTo(`${PagesEndPoints.BOOKING_PAGE_URL}/${APPOINTMENTS}`);
	}

	const bookReservation = () => {
		if (KeycloakService.isLoggedIn()) {
			navigateTo(`${PagesEndPoints.BOOKING_PAGE_URL}/${RESERVATIONS}`);
		} else {
			setShowLoggingDialog(true);
		}
	}

	return (
		<div className="bg-gray-100">
			<div>
				<section>
					<div
						style={{
							backgroundImage: "url('/assets/images/booking_cover.png')",
							backgroundPosition: "center",
							backgroundSize: "cover",
							backgroundRepeat: "no-repeat",
							height: "70vh",
						}}
						className="hidden h-4/5 w-screen pt-2 pb-2 md:block"
					/>
				</section>
				<section>
					<div className="grid gap-4 items-stretch grid-cols-1 my-4 mx-2 md:mx-6 md:grid-cols-5">
						<div className="hidden col-span-2 items-center justify-center h-full bg-gray-100 border-1 border-blue-700 rounded-md py-4 md:block md:py-6">
							<ContactInfo columnLayout={true} />
							<FAQs columnLayout={true} />
						</div>
						<div className="flex flex-col col-span-3 gap-1 items-center h-full rounded-md py-4 border-1 border-blue-700">
							<div className="flex flex-col md:justify-between items-stretch rounded-md w-3/4 py-4 md:w-4/5 md:px-10 md:flex-row md:py-6 md:space-x-2">
								<div className="flex flex-col items-start rounded-md py-4 h-full md:py-6 w-full">
									<button
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded"
										onClick={bookAppiontment}
									>
										Book An Appointment
									</button>
								</div>
								<div className="flex flex-col items-stretch md:items-end rounded-md py-4 md:py-6 w-full">
									<button
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded"
										onClick={bookReservation}
									>
										Make A Reservation
									</button>
									<Modal
										isOpen={showLoggingDialog}
										onClose={setShowLoggingDialog}
									>
										<LocalizedModal
											actionHandler={singIn}
											actionText="Sign In"
											cancelText="Go back"
											setOpen={setShowLoggingDialog}
											title="Sign In"
											message="Sign in or register to make a reservation."
										/>
									</Modal>
								</div>
							</div>
							<div className="w-4/5">
								<Outlet />
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default BookingPage;
