import Errors from "../../utilities/constants/Errors";
import KeycloakService from "../config/KeycloakService";
import HttpClient from "../../utilities/functions/HttpClient";
import CustomToast from "../../utilities/components/CustomToast";
import {
  RESERVATIONS_ENDPOINT,
  USERS_ENDPOINT,
} from "../../utilities/constants/ServerEndPoints";

/**
 * Fect all reservations present in the database.
 * @param {function} setReservationsData The function to collect the data provided by the backend.
 */
export const getAllReservations = async (setReservationsData, params) => {
  await HttpClient.getAxiosClient()
    .get(`${RESERVATIONS_ENDPOINT}`, { params })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      if (response.status === 503) {
        CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
        throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);
      }
    })
    .then((data) => setReservationsData(data))
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
 * Retrieve a single reservation from the database.
 * @param {Function} setReservationData The function to collect the fetched data.
 * @param {number} id The appointment's id to fetch.
 */
export const getReservationById = async (setReservationData, id) => {
  const userId = KeycloakService.getUserId();
  await HttpClient.getAxiosClient()
    .get(`${USERS_ENDPOINT}/${userId}${RESERVATIONS_ENDPOINT}/${id}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => setReservationData(data))
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
            "The reservation you are trying to retrieve does not exist in the database.",
            "error"
          );
          break;

        default:
          CustomToast(Errors.API_ERROR, "error");
      }
    });
};

/**
 * This function is used to retrieve all the reservations linked to a specific user.
 * @param {String} id The user's id to whose the reservations are linked.
 * @param {Object} params The parameters to filter the data.
 * @param {Function} setReservationData The function to collect the fetched data.
 * @param {Function} setApiError The function to update the api error status.
 * @param {Function} setIsLoading The function to update the loading status.
 */
export const getReservationByUserId = async (
  id,
  params,
  setReservationData,
  setApiError,
  setIsLoading
) => {
  await HttpClient.getAxiosClient()
    .get(`${USERS_ENDPOINT}/${id}${RESERVATIONS_ENDPOINT}`, { params })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => setReservationData(data))
    .catch((err) => {
      setApiError(true);
      switch (err.response.status) {
        case 503:
          CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
          throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);
        case 400:
          CustomToast("Please review your data and try again.", "error");
          throw new Error("Please review your data and try again.");
        case 404:
          CustomToast("No reservations found for this user.", "info");
          break;
        default:
          CustomToast(Errors.API_ERROR, "error");
      }
    })
    .finally(() => setIsLoading(false));
};

/**
 * Cancel an single reservation.
 * @param {number} id The targeted addOn identifier.
 * @param {Function} setState The function to update the flag status for the page refresh.
 * @param {Function} setIsLoading The function to update the loading status.
 * @param {Function} setApiError The function to update the api error status.
 */
export const cancelReservation = async (
  id,
  setState,
  setIsLoading,
  setApiError
) => {
  const userId = KeycloakService.getUserId();
  await HttpClient.getAxiosClient()
    .delete(`${USERS_ENDPOINT}/${userId}${RESERVATIONS_ENDPOINT}/${id}`)
    .then((response) => {
      if (response.status === 204) {
        CustomToast("Reservation successfully cancelled", "success");
        setState((prev) => !prev);
      }
    })
    .catch((err) => {
      setApiError(true);
      switch (err.response.status) {
        case 503:
          CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
          throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);

        case 400:
          CustomToast("Please review your data and try again.", "error");
          break;

        case 404:
          CustomToast(
            "The reservation you are trying to delete does not exist in the database.",
            "error"
          );
          break;

        default:
          CustomToast(Errors.API_ERROR, "error");
      }
    })
    .finally(() => setIsLoading(false));
};

/**
 * Cancel multiple reservations at once.
 * @param {Array} ids A list of identifiers.
 * @param {Function} setState The function to update the flag status for the page refresh.
 * @param {Function} setIsLoading The function to update the loading status.
 * @param {Function} setApiError The function to update the api error status.
 */
export const cancelReservations = async (
  ids,
  setState,
  setIsLoading,
  setApiError
) => {
  const requestData = new FormData();
  requestData.append(
    "ids",
    new Blob([JSON.stringify(ids)], { type: "application/json" })
  );

  await HttpClient.getAxiosClient()
    .delete(`${RESERVATIONS_ENDPOINT}`, requestData)
    .then((response) => {
      if (response.status === 204) {
        CustomToast("Reservations successfully cancelled", "success");
        setState((prev) => !prev);
      }
    })
    .catch((err) => {
      setApiError(true);
      switch (err.response.status) {
        case 400:
          CustomToast("Please review your data and try again.", "error");
          break;

        case 404:
          CustomToast(
            "Some of the reservations you are trying to delete do not exist in the database.",
            "error"
          );
          break;

        case 503:
          CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
          throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);

        default:
          CustomToast(Errors.API_ERROR, "error");
      }
    })
    .finally(() => setIsLoading(false));
};

/**
 * Update an reservation in the database.
 * @param {Object} reservation The updated information of the addOn the targeted addOn.
 * @param {Function} setApiError The function to update the api error status.
 * @param {Function} setState The function to update the flag status for the page refresh.
 * @param {Function} setIsLoading The function to update the loading status.
 */
export const updateReservation = async (
  reservation,
  setApiError,
  setState,
  setIsLoading
) => {
  const requestData = new FormData();
  requestData.append(
    "reservation",
    new Blob([JSON.stringify(reservation)], { type: "application/json" })
  );

  await HttpClient.getAxiosClient()
    .put(
      `${USERS_ENDPOINT}/${reservation.userId}${RESERVATIONS_ENDPOINT}/${reservation.id}`,
      requestData
    )
    .then((response) => {
      if (response.status === 200) {
        CustomToast("Reservation update successfully requested.", "success");
        setState !== undefined && setState((prev) => !prev);
      }
    })
    .catch((err) => {
      setApiError(true);
      switch (err.response.status) {
        case 503:
          CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
          throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);

        case 400:
          CustomToast("Please review your data and try again.", "error");
          break;

        case 404:
          CustomToast(
            "The reservation you are trying to update does not exist in the database.",
            "error"
          );
          break;
        case 409:
          CustomToast(Errors.CONFLICTING_TIME_FRAME_ERROR, "error");
          break;

        default:
          CustomToast(Errors.API_ERROR, "error");
      }
    })
    .finally(() => setIsLoading(false));
};

/**
 * Update an reservation in the database.
 * @param {Object} reservation The updated information of the targeted reservation.
 * @param {Function} setApiError The function to update the api error status.
 * @param {Function} setState The function to update the flag status for the page refresh.
 * @param {Function} setIsLoading The function to update the loading status.
 */
export const createReservation = async (
  reservation,
  setApiError,
  setState,
  setIsLoading
) => {
  const requestData = new FormData();
  requestData.append(
    "reservation",
    new Blob([JSON.stringify(reservation)], { type: "application/json" })
  );

  await HttpClient.getAxiosClient()
    .post(`${RESERVATIONS_ENDPOINT}`, requestData)
    .then((response) => {
      if (response.status === 201) {
        CustomToast("Reservation successfully requested", "success");
        setState((prev) => !prev);
      }
    })
    .catch((err) => {
      setApiError(true);
      switch (err.response.status) {
        case 503:
          CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
          throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);

        case 400:
          CustomToast("Please review your data and try again.", "error");
          break;

        case 409:
          CustomToast(Errors.CONFLICTING_TIME_FRAME_ERROR, "error");
          break;

        default:
          CustomToast(Errors.API_ERROR, "error");
      }
    })
    .finally(() => setIsLoading(false));
};
