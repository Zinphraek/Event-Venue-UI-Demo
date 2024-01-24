import Errors from "../../utilities/constants/Errors";
import HttpClient from "../../utilities/functions/HttpClient";
import CustomToast from "../../utilities/components/CustomToast";
import {
  INVOICES_ENDPOINT,
  USERS_ENDPOINT,
} from "../../utilities/constants/ServerEndPoints";

/**
 * Get the invoices of a user.
 * @param {number} userId The id of the user.
 * @param {object} params The parameters to filter the invoices.
 * @param {function} setInvoiceData The function to set the invoices.
 * @param {function} setIsLoading The function to set the loading state.
 * @returns The invoices of a user.
 */
export const getInvoicesByUserId = async (
  userId,
  params,
  setInvoiceData,
  setIsLoading
) => {
  await HttpClient.getAxiosClient()
    .get(`${USERS_ENDPOINT}/${userId}${INVOICES_ENDPOINT}`, { params })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .then((data) => setInvoiceData(data))
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
    })
    .finally(() => setIsLoading(false));
};
