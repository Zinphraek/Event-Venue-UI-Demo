import { ReservationModel } from "./ReservationModel";
import { UserModel } from "./UserModel";

export const InvoiceModel = {
	id: "",
	invoiceNumber: "",
	issuedDate: "",
	dueDate: "",
	status: "",
	amoutDue: "",
	amoutPaid: "",
	reservation: ReservationModel,
	user: UserModel,
};
