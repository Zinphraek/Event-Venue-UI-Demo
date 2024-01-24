import React from "react";
import FacilityConstants from "../constants/FacilityConstants";

/**
 * ContactInfo component
 * @param {boolean} param0 - The column layout of the contact info.
 * @returns  The contact info component.
 */
const ContactInfo = ({ columnLayout }) => {
	const chatMediums = [
		{
			medium: "SMS",
			href: `sms:${FacilityConstants.PHONE.format4}`,
			iconUrl: "/assets/icons/message_icon.svg",
			value: FacilityConstants.PHONE.format2,
		},
		{
			medium: "Email",
			href: `mailto:${FacilityConstants.EMAILS.info}`,
			iconUrl: "/assets/icons/email_icon.svg",
			value: FacilityConstants.EMAILS.info,
		},
	];
	return (
		<div
			className={`grid gap-6 grid-cols-1 text-white my-4 mx-2 md:mx-6 ${
				columnLayout ? "items-stretch" : " items-stretch md:grid-cols-2"
			} xl:grid-cols-2`}
		>
			<div className="flex flex-col items-center bg-slate-200 rounded-md py-4 md:py-6">
				<div className="flex flex-row">
					<img
						className="hidden md:block w-14 h-14"
						src="/assets/icons/phone_icon.svg"
						alt="Phone"
					/>
					<h2 className="text-xl text-blue-700 text-center mx-auto px-2 font-semibold uppercase md:text-left md:text-5xl md:pl-4">
						Call Us
					</h2>
				</div>
				<p className="flex font-bold p-4 text-gray-900 md:w-full md:pl-10 xl:justify-center">
					Hi there, we are always one call away to asist you. Dial the number
					below and one of our representatives will assist you.
				</p>
				<div className="flex flex-row space-x-1 items-start space-y-2 my-2">
					<img
						className="w-10 h-10"
						src="/assets/icons/call_icon.svg"
						alt="Call"
					/>
					<address>
						<a
							href={`tel:${FacilityConstants.PHONE.format4}`}
							className="text-blue-800 p-4 font-semibold"
						>
							{FacilityConstants.PHONE.format2}
						</a>
					</address>
				</div>
			</div>
			<div className="flex flex-col items-center bg-slate-200 rounded-md py-4 md:py-4">
				<div className="flex flex-row">
					<img
						className="hidden md:block w-14 h14"
						src="/assets/icons/chat_icon.svg"
						alt="Chat"
					/>
					<h2 className="text-lg text-blue-700 text-center mx-auto px-2 font-semibold uppercase md:text-left md:text-5xl md:pl-4">
						Chat with Us
					</h2>
				</div>
				<p className="flex font-bold p-4 text-gray-900 md:w-full md:pl-10 xl:justify-center">
					Prefer writing? Don't worry. We answer at the addresses below.
				</p>
				<div className={`flex flex-col items-start ${columnLayout ? "" : "lg:flex-row lg:justify-around lg:space-x-20"}`}>
					{chatMediums.map((medium) => (
						<address
							key={medium.medium}
							className="flex flex-row space-x-1 items-start my-2"
						>
							<img
								className="w-12 h-12"
								src={medium.iconUrl}
								alt={medium.medium}
							/>
							<a href={medium.href} className="text-blue-800 py-2 font-semibold lg:p-4">
								{medium.value}
							</a>
						</address>
					))}
				</div>
			</div>
		</div>
	);
};

export default ContactInfo;
