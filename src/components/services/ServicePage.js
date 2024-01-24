import React, {useState} from "react";
import ServiceCard from "./ServiceCard";
import { Services as services } from "../../utilities/models/ServiceModel";
import { useNavigate } from "react-router-dom";
import { useUserRefresh } from "../user/UserProvider";
import KeycloakService from "../config/KeycloakService";
import PagesEndPoints from "../../utilities/constants/PagesEndpoints";
import Modal from "../../utilities/components/Modal";
import LocalizedModal from "../../utilities/components/LocalizedModal";
import { RESERVATIONS } from "../../utilities/constants/AccountScreen";

const ServicePage = () => {
	const navigateTo = useNavigate()
	const [showLoggingDialog, setShowLoggingDialog] = useState(false);
	const setFetchUserFlag = useUserRefresh();

	const singIn = async () => {
		await KeycloakService.doLogin(setFetchUserFlag);
	};

	const handleBookNow = (service) => {
		if (KeycloakService.isLoggedIn()) {
			navigateTo(`${PagesEndPoints.BOOKING_PAGE_URL}/${RESERVATIONS}`, {state : {eventType: service.title}});
		} else {
			setShowLoggingDialog(true);
		}
	}

	return (
		<div className="bg-gray-200">
			<div className="container max-w-7xl mx-auto my-0 py-8 px-6 md:px-0">
				<div className="container mx_auto max-w-7xl p-2 md:p-10">
					<section>
						<div className="text-xl font-bold text-black">
							We Offer a wide variety of services.
						</div>
						<p className="text-slate-500">
							Our commitment is to provide the utmost prestigious facility for
							your celebrations.
						</p>
					</section>
					<section>
						<div className="grid grid-cols-1 gap-6 mt-8 mb-0 md:grid-cols-2 lg:grid-cols-3 w-full">
							{services.map((service) => (
								<ServiceCard key={service.id} service={service} bookingHandler={handleBookNow} />
							))}
						</div>
						<Modal isOpen={showLoggingDialog} onClose={setShowLoggingDialog}>
								<LocalizedModal
									actionHandler={singIn}
									actionText="Sign In"
									cancelText="Go back"
									message="Sign in to book now."
									setOpen={setShowLoggingDialog}
									title="Sign In"
								/>
							</Modal>
					</section>
				</div>
			</div>
		</div>
	);
};

export default ServicePage;
