import { object, string, number, date, array, bool } from "yup";
import FacilityConstants from "../constants/FacilityConstants";
import {
	isDateAfterDeclaredStartingDate,
	isDateInTheFuture,
	isTimeBetweenBoundaries,
} from "../functions/Helpers";

export const reservationSchema = object().shape({
	id: number().notRequired(),
	startingDateTime: date()
		.transform((value, originalValue) => {
			return originalValue ? new Date(originalValue) : null;
		})
		.test("is-in-the-future", "Date and time must be in the future", (value) =>
			isDateInTheFuture(value)
		)
		.test("is-between", "Time must be between 9:00 AM and 10:00 PM", (value) =>
			isTimeBetweenBoundaries(
				value,
				{ hours: 9, minutes: 0 },
				{ hours: 22, minutes: 0 }
			)
		)
		.required("Starting date and time are required"),
	endingDateTime: date()
		.transform((value, originalValue) => {
			return originalValue ? new Date(originalValue) : null;
		})
		.test("is-in-the-future", "Date and time must be in the future", (value) =>
			isDateInTheFuture(value)
		)
		.test(
			"is-after-starting-date",
			"Ending date and time must be after the starting date and time",
			function (value) {
				return isDateAfterDeclaredStartingDate(
					value,
					this.parent.startingDateTime
				);
			}
		)
		.required("Ending date and time are required"),
	effectiveEndingDateTime: date()
		.notRequired()
		.transform((value, originalValue) => {
			return originalValue ? new Date(originalValue) : null;
		})
		.test(
			"is-in-the-future",
			"Date and time must be in the future",
			(value) => {
				if (!value) {
					return true;
				} else {
					isDateInTheFuture(value);
				}
			}
		)
		.test(
			"is-after-starting-date",
			"Effective ending date and time must be after the starting date and time",
			function (value) {
				if (!value) {
					return true;
				} else {
					return isDateAfterDeclaredStartingDate(
						value,
						this.parent.startingDateTime
					);
				}
			}
		),
	eventType: string().required("Event type is required"),
	numberOfSeats: number("Guest count must be a number")
		.integer("Guest count must be an integer")
		.positive("Guest count must be positive number")
		.required("Guest count is required")
		.max(200, "The facility maximum seats capacity is 200"),
	addOns: array().notRequired(),
	addOnsTotalCost: number().required(),
	status: string().required(),
	fullPackage: bool().required(),
	securityDepositRefunded: bool().notRequired(),
	taxRate: number().required(),
	totalPrice: number().required(),
	priceComputationMethod: string().required(),
	userId: string().required(),
});

const Rates = {
	cleaningRate: 0,
	facilityRate: 0,
	overtimeRate: 0,
	seatRate: 0,
};

export const ReservationModel = {
	id: "",
	startingDateTime: "",
	endingDateTime: "",
	effectiveEndingDateTime: "",
	eventType: "",
	numberOfSeats: 0,
	addOns: [],
	addOnsTotalCost: 0,
	status: "Pending",
	fullPackage: false,
	securityDepositRefunded: false,
	subTotal: 0,
	taxRate: FacilityConstants.TAXE_RATE,
	totalPrice: 0,
	rates: Rates,
	priceComputationMethod: "Auto",
	userId: "",
};

export const ReservKeysName = {
	id: "ID",
	userId: "Users",
	startingDateTime: "Starting Date",
	endingDateTime: "Ending Date",
	effectiveEndingDateTime: "Effective Ending Date",
	eventType: "Event Type",
	numberOfSeats: "Guest Count",
	fullPackage: "Is Full Package",
	securityDepositRefunded: "Refunded Security Deposit",
	status: "Status",
	addOnsTotalCost: "AddOns Total ($)",
	taxRate: "Tax Rate",
	totalPrice: "Total Price ($)",
	totalPriceComputationMethod: "Total Price Computation Method",
};

export const SubtotalBreakDown = {
	addOnsTotal: 0,
	facilityRental: 0,
	facilityCleaningFees: 0,
	overtime: { hours: 0, totalCost: 0, overtimeRate: 0 },
	seats: { seatRateTotal: 0, seatsCount: 0, seatPrice: 0 },
};
