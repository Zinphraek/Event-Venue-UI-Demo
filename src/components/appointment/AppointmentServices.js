import Errors from "../../utilities/constants/Errors";
import KeycloakService from "../config/KeycloakService";
import HttpClient from "../../utilities/functions/HttpClient";
import CustomToast from "../../utilities/components/CustomToast";
import {
  USERS_ENDPOINT,
  APPOINTMENTS_ENDPOINT,
} from "../../utilities/constants/ServerEndPoints";

/**
 * Fetch all appointments from the backend.
 * @param {Function} setAppointmentsData The function to collect and set the data from the database.
 * @param {Object} params The parameters to filter the data.
 * @param {Function} setIsLoading The function to update the loading status.
 * @param {Function} setApiError The function to update the api error status.
 * @returns {Promise<void>} A promise.
 * @throws {Error} An error.
 */
export const getAllAppointments = async (
  setAppointmentsData,
  params,
  setIsLoading,
  setApiError
) => {
  await HttpClient.getAxiosClient()
    .get(`${APPOINTMENTS_ENDPOINT}`, { params })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => setAppointmentsData(data))
    .catch((err) => {
      setApiError(true);
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
    })
    .finally(() => setIsLoading(false));
};

/**
 * Fetch all appointments records for a single user from the backend.
 * @param {Function} setAppointmentsData The function to collect and set the data from the database.
 * @param {string} id The user's id to fetch.
 * @param {Function} setIsLoading The function to update the loading status.
 * @param {Object} params The parameters to filter the data.
 * @returns {Promise<void>} A promise.
 * @throws {Error} An error.
 */
export const getAppointmentsByUserId = async (
  setAppointmentsData,
  id,
  setIsLoading,
  setApiError,
  params
) => {
  await HttpClient.getAxiosClient()
    .get(`${USERS_ENDPOINT}/${id}${APPOINTMENTS_ENDPOINT}`, { params })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => setAppointmentsData(data))
    .catch((err) => {
      setApiError(true);
      switch (err.response.status) {
        case 503:
          CustomToast(Errors.SERVICE_UNAVALAIBLE_ERROR, "error");
          throw new Error(Errors.SERVICE_UNAVALAIBLE_ERROR);
        case 400:
          CustomToast("Please review your data and try again.", "error");
          throw new Error("Please review your data and try again.");
        default:
          CustomToast(Errors.API_ERROR, "error");
          throw new Error(Errors.API_ERROR);
      }
    })
    .finally(() => setIsLoading(false));
};

/**
 * Retrieve a single appointment from the database.
 * @param {Function} setAppointmentData The function to collect the fetched data.
 * @param {number} id The appointment's id to fetch.
 * @param {Function} setIsLoading The function to update the loading status.
 * @param {Function} setApiError The function to update the api error status.
 * @returns {Promise<void>} A promise.
 */
export const getAppointmentById = async (
  setAppointmentData,
  id,
  setIsLoading,
  setApiError
) => {
  const userId = KeycloakService.getUserId();
  await HttpClient.getAxiosClient()
    .get(`${USERS_ENDPOINT}/${userId}${APPOINTMENTS_ENDPOINT}/${id}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => setAppointmentData(data))
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
            "The appointment you are trying to retrieve does not exist in the database.",
            "info"
          );
          break;

        default:
          CustomToast(Errors.API_ERROR, "error");
      }
    })
    .finally(() => setIsLoading(false));
};

/**
 * Delete an single appointment.
 * @param {number} id The targeted appointment identifier.
 * @param {Function} setState The function to update the flag status for the page refresh.
 * @param {Function} setIsLoading The function to update the loading status.
 * @param {Function} setApiError The function to update the api error status.
 */
export const deleteAppointment = async (
  id,
  setState,
  setIsLoading,
  setApiError
) => {
  await HttpClient.getAxiosClient()
    .delete(`${APPOINTMENTS_ENDPOINT}/${id}`)
    .then((response) => {
      if (response.status === 200) {
        CustomToast("Appointment successfully deleted", "success");
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
            "The appointment you are trying to delete does not exist in the database.",
            "info"
          );
          break;

        default:
          CustomToast(Errors.API_ERROR, "error");
      }
    })
    .finally(() => setIsLoading(false));
};

/**
 * Cancel an single appointment.
 * @param {number} id The targeted appointment identifier.
 * @param {Function} setState The function to update the flag status for the page refresh.
 * @param {Function} setIsLoading The function to update the loading status.
 * @param {Function} setApiError The function to update the api error status.
 * @returns {Promise<void>} A promise.
 */
export const cancelAppointment = async (
  id,
  setState,
  setIsLoading,
  setApiError
) => {
  const userId = KeycloakService.getUserId();
  await HttpClient.getAxiosClient()
    .delete(`${USERS_ENDPOINT}/${userId}${APPOINTMENTS_ENDPOINT}/cancel/${id}`)
    .then((response) => {
      if (response.status === 204) {
        CustomToast("Appointment successfully cancelled", "success");
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
            "The appointment you are trying to delete does not exist in the database.",
            "info"
          );
          break;
        default:
          CustomToast(Errors.API_ERROR, "error");
      }
    })
    .finally(() => setIsLoading(false));
};

/**
 * Delete multiple appointments at once.
 * @param {Array} ids A list of identifiers.
 * @param {Function} setState The function to update the flag status for the page refresh.
 * @param {Function} setIsLoading The function to update the loading status.
 * @param {Function} setApiError The function to update the api error status.
 */
export const deleteAppointments = async (
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
    .delete(`${APPOINTMENTS_ENDPOINT}`, requestData)
    .then((response) => {
      if (response.status === 204) {
        CustomToast("Appointment successfully deleted", "success");
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
            "Some of the appointments you are trying to delete do not exist in the database.",
            "info"
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
 * Update an appointment in the database.
 * @param {Object} appointment The updated information of the targeted appoitment.
 * @param {Function} setApiError The function to update the api error status.
 * @param {Function} setState The function to update the flag status for the page refresh.
 * @param {Function} setIsLoading The function to update the loading status.
 * @returns {Promise<void>} A promise.
 */
export const updateAppointment = async (
  appointment,
  setApiError,
  setState,
  setIsLoading
) => {
  const requestData = new FormData();
  requestData.append(
    "appointment",
    new Blob([JSON.stringify(appointment)], { type: "application/json" })
  );

  const userId = KeycloakService.getUserId();

  await HttpClient.getAxiosClient()
    .put(
      `${USERS_ENDPOINT}/${userId}${APPOINTMENTS_ENDPOINT}/${appointment.id}`,
      requestData
    )
    .then((response) => {
      if (response.status === 200) {
        CustomToast("Appointment successfully updated", "success");
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
            "The appointment you are trying to update does not exist in the database.",
            "info"
          );
          break;

        case 409:
          CustomToast(Errors.CONFICTING_SCHEDULE_ERROR, "error");
          break;

        default:
          CustomToast(Errors.API_ERROR, "error");
      }
    })
    .finally(() => setIsLoading(false));
};

/**
 * Update an appointment in the database.
 * @param {Object} appointment The updated information of the targeted appointment.
 * @param {Function} setApiError The function to update the api error status.
 * @param {Function} setState The function to update the flag status for the page refresh.
 * @param {Function} setIsLoading The function to update the loading status.
 * @returns {Promise<void>} A promise.
 */
export const createAppointment = async (
  appointment,
  setApiError,
  setState,
  setIsLoading
) => {
  const requestData = new FormData();
  requestData.append(
    "appointment",
    new Blob([JSON.stringify(appointment)], { type: "application/json" })
  );

  await HttpClient.getAxiosClient()
    .post(`${APPOINTMENTS_ENDPOINT}`, requestData)
    .then((response) => {
      if (response.status === 201) {
        CustomToast("Appointment successfully created", "success");
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
            "The appointment you are trying to update does not exist in the database.",
            "info"
          );
          break;

        case 409:
          CustomToast(Errors.CONFICTING_SCHEDULE_ERROR, "error");
          break;

        default:
          CustomToast(Errors.API_ERROR, "error");
      }
    })
    .finally(() => setIsLoading(false));
};
