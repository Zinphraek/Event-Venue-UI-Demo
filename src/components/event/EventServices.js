import CustomToast from "../../utilities/components/CustomToast";
import HttpClient from "../../utilities/functions/HttpClient";
import ServerEndpoints from "../../utilities/constants/ServerEndPoints";
import Errors from "../../utilities/constants/Errors";

/**
 * Fetch all data from the backend.
 * @param {Function} setEventsData The function to collect and set the data from the database.
 */
export const getAllEvents = async (setEventsData) => {
	try {
		const response = await HttpClient.getAxiosClient().get(
			`${ServerEndpoints.EVENTS_ENDPOINT}`
		);
		if (response.status === 200) {
			setEventsData(response.data);
		} else {
			// handle non-200 responses
		}
	} catch (err) {
		if (!err.response) {
			// Handle network errors here
			CustomToast(Errors.NETWORK_ERROR, "error");
		} else {
			// Handle HTTP errors
			switch (err.response.status) {
				case 503:
					CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
					break;

				case 400:
					CustomToast("Please review your data and try again.", "error");
					break;

				case 404:
					break;

				default:
					CustomToast(Errors.API_ERROR, "error");
			}
		}
	}
};

/**
 * Retrieve a single event from the database.
 * @param {Function} setEventData The function to collect the fetched data.
 * @param {number} id The event's id to fetch.
 */
export const getEventById = async (setEventData, id) => {
	await HttpClient.getAxiosClient()
		.get(`${ServerEndpoints.EVENTS_ENDPOINT}/${id}`)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.then((data) => setEventData(data))
		.catch((err) => {
			switch (err.response.status) {
				case 503:
					CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
					throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);

				case 400:
					CustomToast("Please review your data and try again.", "error");
					break;

				case 404:
					CustomToast(
						"The event you are trying to retrieve does not exist in the database.",
						"error"
					);
					break;

				default:
					CustomToast(Errors.API_ERROR, "error");
			}
		});
};

/**
 * Fetch all media related to an event from the backend.
 * @param {Function} setMediaData The function to collect and set the data from the database.
 * @param {number} id The id of the targeted event.
 * @returns The media data.
 * @throws {Error} The error message.
 */
export const getMediaByEventId = async (setMediaData, id) => {
	await HttpClient.getAxiosClient()
		.get(`${ServerEndpoints.EVENTS_ENDPOINT}/${id}/media`)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.then((data) => {
			setMediaData(data);
		})
		.catch((err) => {
			switch (err.response.status) {
				case 503:
					CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
					break;

				case 400:
					CustomToast("Please review your data and try again.", "error");
					break;

				case 404:
					CustomToast(
						"The media you are trying to retrieve does not exist in the database.",
						"error"
					);
					break;

				default:
					CustomToast(Errors.API_ERROR, "error");
			}
		})
}

/**
 * Delete an single event.
 * @param {number} id The targeted event identifier.
 * @param {Function} setState The function to update the flag status for the page refresh.
 */
export const deleteEvent = async (id, setState) => {
	await HttpClient.getAxiosClient()
		.delete(`${ServerEndpoints.EVENTS_ENDPOINT}/${id}`)
		.then((response) => {
			if (response.status === 204) {
				CustomToast("Event successfully deleted", "success");
				setState((prev) => !prev);
			}
		})
		.catch((err) => {
			switch (err.response.status) {
				case 503:
					CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
					throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);

				case 400:
					CustomToast("Please review your data and try again.", "error");
					break;

				case 404:
					CustomToast(
						"The evenr you are trying to delete does not exist in the database.",
						"error"
					);
					break;

				default:
					CustomToast(Errors.API_ERROR, "error");
			}
		});
};

/**
 * Update an event in the database.
 * @param {Object} event The updated information of the targeted event.
 */
export const updateEvent = async (event, media) => {
	const requestData = new FormData();
	const arrayOfFiles = [...media];
	requestData.append(
		"event",
		new Blob([JSON.stringify(event)], { type: "application/json" })
	);

	arrayOfFiles.forEach((file) => requestData.append("media", file));
	await HttpClient.getAxiosClient()
		.put(`${ServerEndpoints.EVENTS_ENDPOINT}/${event.id}`, requestData)
		.then((response) => {
			if (response.status === 200) {
				CustomToast("Event successfully updated", "success");
			}
		})
		.catch((err) => {
			switch (err.response.status) {
				case 503:
					CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
					throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);

				case 400:
					CustomToast("Please review your data and try again.", "error");
					break;

				case 404:
					CustomToast(
						"The event you are trying to update does not exist in the database.",
						"error"
					);
					break;

				default:
					CustomToast(Errors.API_ERROR, "error");
			}
		});
};

/**
 * Save an event in the database.
 * @param {Object} event The updated information of the targeted event.
 */
export const createEvent = async (event, media) => {
	const requestData = new FormData();
	const arrayOfFiles = [...media];
	requestData.append(
		"event",
		new Blob([JSON.stringify(event)], { type: "application/json" })
	);

	arrayOfFiles.forEach((file) => requestData.append("media", file));

	await HttpClient.getAxiosClient()
		.post(`${ServerEndpoints.EVENTS_ENDPOINT}`, requestData)
		.then((response) => {
			if (response.status === 201) {
				CustomToast("Event successfully created", "success");
			}
		})
		.catch((err) => {
			switch (err.response.status) {
				case 503:
					CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
					throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);

				case 400:
					CustomToast("Please review your data and try again.", "error");
					break;

				case 409:
					CustomToast("An event with the provided id already exist", "error");
					break;

				default:
					CustomToast(Errors.API_ERROR, "error");
			}
		});
};

// Comments services

/**
 * Fetch all comments related to an event from the backend.
 * @param {Function} setEventsData The function to collect and set the data from the database.
 * @param {number} eventId The id of the targeted event.
 */
export const getCommentsByEventId = async (setEventsData, eventId) => {
	await HttpClient.getAxiosClient()
		.get(`${ServerEndpoints.EVENTS_ENDPOINT}/${eventId}/comments`)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.then((data) => setEventsData(data))
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
 * Fetch all comments related to an event from the backend.
 * @param {Function} setRepliesData The function to collect and set the data from the database.
 * @param {number} eventId The id of the targeted event.
 * @param {number} baseCommentId The id of the targeted baseComment.
 */
export const getReplies = async (setRepliesData, eventId, baseCommentId) => {
	await HttpClient.getAxiosClient()
		.get(
			`${ServerEndpoints.EVENTS_ENDPOINT}/${eventId}/comments/${baseCommentId}/replies`
		)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.then((data) => setRepliesData(data))
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
 * Retrieve a single eventComment from the database.
 * @param {Function} setEventData The function to collect the fetched data.
 * @param {number} id The eventComment's id to fetch.
 * @param {number} eventId The id of the targeted event.
 */
export const getEventCommentById = async (setEventData, id, eventId) => {
	await HttpClient.getAxiosClient()
		.get(`${ServerEndpoints.EVENTS_ENDPOINT}/${eventId}/comments/${id}`)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.then((data) => setEventData(data))
		.catch((err) => {
			switch (err.response.status) {
				case 503:
					CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
					throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);

				case 400:
					CustomToast("Please review your data and try again.", "error");
					break;

				case 404:
					CustomToast(
						"The comment you are trying to retrieve does not exist in the database.",
						"error"
					);
					break;

				default:
					CustomToast(Errors.API_ERROR, "error");
			}
		});
};

/**
 * Delete an single event.
 * @param {number} id The targeted eventComment identifier.
 * @param {Function} setState The function to update the flag status for the page refresh.
 * @param {number} eventId The id of the targeted event.
 */
export const deleteEventComment = async (id, setState, eventId) => {
	await HttpClient.getAxiosClient()
		.delete(`${ServerEndpoints.EVENTS_ENDPOINT}/${eventId}/comments/${id}`)
		.then((response) => {
			if (response.status === 204) {
				CustomToast("Event successfully deleted", "success");
				setState((prev) => !prev);
			}
		})
		.catch((err) => {
			switch (err.response.status) {
				case 503:
					CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
					throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);

				case 400:
					CustomToast("Please review your data and try again.", "error");
					break;

				case 404:
					CustomToast(
						"The comment you are trying to delete does not exist in the database.",
						"error"
					);
					break;

				default:
					CustomToast(Errors.API_ERROR, "error");
			}
		});
};

/**
 * Update an eventComment in the database.
 * @param {Object} eventComment The updated information of the targeted eventComment.
 */
export const updateEventComment = async (eventComment) => {
	const requestData = new FormData();
	requestData.append(
		"eventComment",
		new Blob([JSON.stringify(eventComment)], { type: "application/json" })
	);

	await HttpClient.getAxiosClient()
		.put(
			`${ServerEndpoints.EVENTS_ENDPOINT}/${eventComment.event.id}/comments/${eventComment.id}`,
			requestData
		)
		.then((response) => {
			if (response.status === 200) {
				CustomToast("Comment successfully updated", "success");
			}
		})
		.catch((err) => {
			switch (err.response.status) {
				case 503:
					CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
					throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);

				case 400:
					CustomToast("Please review your data and try again.", "error");
					break;

				case 404:
					CustomToast(
						"The comment you are trying to update does not exist in the database.",
						"error"
					);
					break;

				default:
					CustomToast(Errors.API_ERROR, "error");
			}
		});
};

/**
 * Save an eventComment in the database.
 * @param {Object} eventComment The newly created information of the targeted eventComment.
 */
export const createEventComment = async (eventComment, setRefresh) => {
	const requestData = new FormData();
	requestData.append(
		"eventComment",
		new Blob([JSON.stringify(eventComment)], { type: "application/json" })
	);

	await HttpClient.getAxiosClient()
		.post(
			`${ServerEndpoints.EVENTS_ENDPOINT}/${eventComment.eventId}/comments`,
			requestData
		)
		.then((response) => {
			if (response.status === 201) {
				CustomToast("Thank you for sharing your thought!", "success");
				setRefresh((prev) => !prev);
			}
		})
		.catch((err) => {
			switch (err.response.status) {
				case 503:
					CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
					throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);

				case 400:
					CustomToast("Please review your data and try again.", "error");
					break;

				case 409:
					CustomToast("A comment with the provided id already exist", "error");
					break;

				default:
					CustomToast(Errors.API_ERROR, "error");
			}
		});
};

/**
 * Like or dislike an event.
 * @param {number} id The targeted event identifier.
 * @param {string} userId The targeted user identifier.
 * @param {string} likeOrDislike The targeted action.
 * @param {number} eventId The targeted event identifier.
 */
export const likeOrDislikeEvent = async (
	id,
	userId,
	likeOrDislike,
	eventId
) => {
	const requestData = new FormData();
	const eventLikesDislikes = {
		id,
		userId,
		likeOrDislike,
		eventId,
	};
	requestData.append(
		"likes",
		new Blob([JSON.stringify(eventLikesDislikes)], { type: "application/json" })
	);
	await HttpClient.getAxiosClient()
		.put(
			`${ServerEndpoints.EVENTS_ENDPOINT}/${eventId}/likes/${id}`,
			requestData
		)
		.then((response) => {
			if (response.status === 200) {
				switch (likeOrDislike) {
					case "like":
						CustomToast("We are honored you like it!", "info");
						break;

					case "dislike":
						CustomToast("Thanks for sharing your sentiment!", "info");
						break;

						default:
						CustomToast("Thanks for sharing your sentiment!", "info");
						break;
				}
			}
		})
		.catch((err) => {
			switch (err.response.status) {
				case 409:
					CustomToast("You already liked this event", "error");
					break;

				case 404:
					CustomToast("The event you are trying to update does not exist");
					break;

				default:
					CustomToast(Errors.API_ERROR, "error");
			}
		});
};

/**
 * Like or dislike a comment.
 * @param {number} id The targeted event identifier.
 * @param {string} userId The targeted user identifier.
 * @param {string} likeOrDislike The targeted action.
 * @param {number} commentId The targeted comment identifier.
 * @param {number} eventId The targeted event identifier.
 */
export const likeOrDislikeComment = async (
	id,
	userId,
	likeOrDislike,
	commentId,
	eventId
) => {
	const requestData = new FormData();
	const commentLikesDislikes = {
		id,
		userId,
		likeOrDislike,
		commentId,
	};
	requestData.append(
		"likes",
		new Blob([JSON.stringify(commentLikesDislikes)], {
			type: "application/json",
		})
	);
	await HttpClient.getAxiosClient()
		.put(
			`${ServerEndpoints.EVENTS_ENDPOINT}/${eventId}/comments/${commentId}/likes/${id}`,
			requestData
		)
		.then((response) => {
			if (response.status === 200) {
				CustomToast("Thanks for sharing your sentiment!", "info");
			}
		})
		.catch((err) => {
			switch (err.response.status) {
				case 409:
					CustomToast("You already liked this comment", "error");
					break;

				case 404:
					CustomToast("The comment you are trying to update does not exist");
					break;

				default:
					CustomToast(Errors.API_ERROR, "error");
			}
		});
};
