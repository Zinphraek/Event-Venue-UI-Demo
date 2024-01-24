import Errors from "../../utilities/constants/Errors";
//import KeycloakService from "../config/KeycloakService";
import HttpClient from "../../utilities/functions/HttpClient";
import CustomToast from "../../utilities/components/CustomToast";
import { REVIEWS_ENDPOINT } from "../../utilities/constants/ServerEndPoints";

export const getReviews = async (setReviews, params) => {
	await HttpClient.getAxiosClient()
		.get(`${REVIEWS_ENDPOINT}`, { params })
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.then((data) => setReviews(data))
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

export const getReviewById = async (setReview, id) => {
	await HttpClient.getAxiosClient()
		.get(`${REVIEWS_ENDPOINT}/${id}`)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.then((data) => setReview(data))
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
 * Create a new review.
 * @param {object} review - The review to create.
 * @param {Function} setApiError - The function to set the api error. 
 * @param {Function} setState - The function to update the state. 
 * @param {Function} setIsLoading - The function to set the loading state.
 */
export const createReview = async (review, setApiError, setState, setIsLoading) => {

	const requestData = new FormData();
	requestData.append(
		"review",
		new Blob([JSON.stringify(review)], { type: "application/json" })
	);

	await HttpClient.getAxiosClient()
		.post(`${REVIEWS_ENDPOINT}`, requestData)
		.then((response) => {
			if (response.status === 201) {
				CustomToast("Thank you for sharing your thought with us!", "success");
				setState !== undefined && setState((prev) => !prev);
			}
		})
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
		})
		.finally(() => setIsLoading(false));
};

/**
 * Update a review.
 * @param {object} review  - The review to update.
 * @param {Function} setApiError - The function to set the api error.
 * @param {Function} setState - The function to update the state.
 */
export const updateReview = async (review, setApiError, setState, setIsLoading) => {
	await HttpClient.getAxiosClient()
		.put(`${REVIEWS_ENDPOINT}/${review.id}`, review)
		.then((response) => {
			if (response.status === 200) {
				setState !== undefined && setState((prev) => !prev);
			}
		})
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
		})
		.finally(() => setIsLoading(false));
};

/**
 * Delete a review.
 * @param {number} id - The id of the review to delete.
 * @param {Function} setApiError - The function to set the api error.
 * @param {Function} setState - The function to update the state.
 * @param {Function} setIsLoading - The function to set the loading state.
 */
export const deleteReview = async (id, setApiError, setState, setIsLoading) => {
	await HttpClient.getAxiosClient()
		.delete(`${REVIEWS_ENDPOINT}/${id}`)
		.then((response) => {
			if (response.status === 200) {
				setState !== undefined && setState((prev) => !prev);
			}
		})
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
		})
		.finally(() => setIsLoading(false));
};
