import Errors from "../../utilities/constants/Errors";
import HttpClient from "../../utilities/functions/HttpClient";
import CustomToast from "../../utilities/components/CustomToast";
import { USERS_ENDPOINT } from "../../utilities/constants/ServerEndPoints";


/**
 * Get user by id
 * @param {number} id - The id of the user to get.
 * @param {function} setUser - The function to set the user.
 * @returns
 */
export const getUserById = async (id, setUser) => {
	await HttpClient.getAxiosClient()
		.get(`${USERS_ENDPOINT}/${id}`)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.then((data) => setUser(data))
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


/**
 * Update user
 * @param {object} user - The user to update.
 * @param {function} setApiError - The function to set the api error.
 * @param {function} setUser - The function to set the state.
 * @returns
 */
export const updateUser = async (user, setUser, setApiError) => {

	const requestData = new FormData();
	requestData.append(
		"user",
		new Blob([JSON.stringify(user)], { type: "application/json" })
	);

	await HttpClient.getAxiosClient()
		.put(`${USERS_ENDPOINT}/${user.userId}`, requestData)
		.then((response) => {
			if (response.status === 200) {
				CustomToast("User updated successfully.", "success");
				return response.data;
			}
		})
		.then((data) => setUser(data))
		.catch((err) => {
			switch (err.response.status) {
				case 503:
					setApiError(true);
					CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
					throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);

				case 400:
					setApiError(true);
					CustomToast("Please review your data and try again.", "error");
					break;

				default:
					setApiError(true);
					CustomToast(Errors.API_ERROR, "error");
			}
		});
};
