import CustomToast from "../../utilities/components/CustomToast";
import HttpClient from "../../utilities/functions/HttpClient";
import ServerEndPoints from "../../utilities/constants/ServerEndPoints";
import Errors from "../../utilities/constants/Errors";

/**
 * Fect all addOns present in the database.
 * @param {function} setAddOnsData The function to collect the data provided by the backend.
 */
export const getAllAddOns = async (setAddOnsData) => {
	await HttpClient.getAxiosClient()
		.get(`${ServerEndPoints.ADDONS_ENDPOINT}`)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.then((data) => setAddOnsData(data))
		.catch((err) => {
			switch (err.response.status) {
				case 503:
					CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
					throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);

				case 400:
					CustomToast("Please review your data and try again.", "error");
					break;

				default:
					CustomToast(Errors.API_ERROR, "error");
			}
		});
};
