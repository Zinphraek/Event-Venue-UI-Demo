import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { object, string, date, number } from "yup";
import Regex from "../../utilities/constants/Regex";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAppointment } from "./AppointmentServices";
import { useUser } from "../user/UserProvider";
import {
  formatDateTime,
  isDateInTheFuture,
  isTimeBetweenBoundaries,
  timeOptions,
} from "../../utilities/functions/Helpers";
import { ToastContainer } from "react-toastify";
import FacilityConstants from "../../utilities/constants/FacilityConstants";
import { useLoadingSpinner } from "../../utilities/components/LoadingSpinnerProvider";

const schema = object().shape({
  id: number().nullable().optional(),
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  email: string().email().required("Email is required"),
  phone: string()
    .required("Phone is required")
    .matches(Regex.PHONE_REGEX, "Invalid phone number"),
  dateTime: date()
    .transform((value, originalValue) => {
      return originalValue ? new Date(originalValue) : null;
    })
    .test("is-between", "Time must be between 9:00 AM and 7:30 PM", (value) =>
      isTimeBetweenBoundaries(value)
    )
    .test("is-in-the-future", "Date and time must be in the future", (value) =>
      isDateInTheFuture(value)
    )
    .required("Date and time are required"),
  raison: string().required("The raison is required"),
  status: string().nullable().optional(),
  additionalInfo: string().nullable().optional(),
  userId: string().nullable().optional(),
});

/**
 * The form to create or update an appointment.
 * @param {object} props  The props passed to the component when updating an appointment.
 * @returns  The form to create or update an appointment.
 */
const AppointmentForm = (props) => {
  const {
    appointment,
    updateAppointment,
    toggleModal,
    setState,
    isUpdating = false,
  } = props;
  const [apiError, setApiError] = useState(false);
  const [resetted, setResetted] = useState(false);
  const { userProfile } = useUser();
  const setIsLoading = useLoadingSpinner();
  const {
    clearErrors,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: appointment?.id ?? null,
      firstName: appointment?.firstName ?? userProfile?.firstName ?? "",
      lastName: appointment?.lastName ?? userProfile?.lastName ?? "",
      email: appointment?.email ?? userProfile?.email ?? "",
      phone: appointment?.phone ?? userProfile?.phone ?? "",
      dateTime: appointment?.dateTime ?? "",
      raison: appointment?.raison ?? "",
      status: appointment?.status ?? FacilityConstants.STATUS.PENDING,
      additionalInfo: appointment?.additionalInfo ?? "",
      userId: appointment?.userId ?? userProfile?.userId ?? "",
    },
  });

  const now = new Date().toLocaleString("en-US", timeOptions);
  const todayAt12AM = new Date(now).setHours(0, 0, 0, 0);
  const nextDayAt12AM = new Date(todayAt12AM).setHours(20, 0, 0, 0);

  const minDateTime =
    new Date(now) > new Date(now).setHours(19, 30, 0, 0)
      ? new Date(nextDayAt12AM).toISOString().slice(0, 16)
      : new Date(todayAt12AM).toISOString().slice(0, 16);

  const setFalsyValuesToNull = (data) => {
    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        data[key] = null;
      }
    });
    return data;
  };

  const onSubmit = async (data) => {
    data.dateTime = formatDateTime(data.dateTime);
    data.status = FacilityConstants.STATUS.BOOKED;
    data = setFalsyValuesToNull(data);

    setIsLoading(true);
    if (isUpdating) {
      if (
        (!!data.userId && userProfile.userId !== data.userId) ||
        (!data.userId && userProfile.userId)
      ) {
        data.userId = userProfile.userId;
      }
      await updateAppointment(data, setApiError, setState, setIsLoading);
    } else {
      data.userId = !!userProfile.userId ? userProfile.userId : null;
      await createAppointment(data, setApiError, setState, setIsLoading);
    }

    !apiError && reset();
    toggleModal !== undefined && toggleModal(false);
  };

  const handleCancel = () => {
    clearErrors();
    reset({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateTime: "",
      raison: "",
      status: appointment?.status ?? FacilityConstants.STATUS.PENDING,
      additionalInfo: appointment?.additionalInfo ?? "",
      userId: appointment?.userId ?? userProfile?.userId ?? "",
    });
    setResetted(true);
    toggleModal !== undefined && toggleModal(false);
  };

  useEffect(() => {
    if (userProfile && !isUpdating && !resetted) {
      setValue("firstName", userProfile.firstName);
      setValue("lastName", userProfile.lastName);
      setValue("email", userProfile.email);
      setValue("phone", userProfile?.phone ?? "");
    }
  }, [userProfile, setValue, isUpdating, resetted]);

  return (
    <div className="bg-gray-100 container mx-auto p-2 md:p-10">
      <div className="flex flex-col justify-center items-center">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-yellow-500 mb-6 pb-2 pt-0.5 text-center rounded-md md:h-24 md:pt-5">
            <h1 className="text-2xl font-bold text-white mb-1 px-2 md:mb-10 md:text-4xl">
              Appointment Form
            </h1>
          </div>
          <div>
            <label htmlFor="firstName" className="font-bold text-lg">
              First Name
            </label>
            <br />
            <input
              placeholder="First name..."
              className={`${
                errors.firstName ? "rounded-sm border-2 border-red-500" : ""
              } w-full px-1`}
              {...register("firstName")}
            />
            <p className="text-red-500 text-xs">{errors.firstName?.message}</p>
          </div>
          <br />
          <div>
            <label htmlFor="lastName" className="font-bold text-lg">
              Last Name
            </label>
            <br />
            <input
              placeholder="Last name..."
              className={`${
                errors.lastName ? "rounded-sm border-2 border-red-500" : ""
              } w-full px-1`}
              {...register("lastName")}
            />
            <p className="text-red-500 text-xs">{errors.lastName?.message}</p>
          </div>
          <br />
          <div>
            <label htmlFor="email" className="font-bold text-lg">
              Email
            </label>
            <br />
            <input
              placeholder="example@domain.com..."
              className={`${
                errors.email ? "rounded-sm border-2 border-red-500" : ""
              } w-full px-1`}
              {...register("email")}
            />
            <p className="text-red-500 text-xs">{errors.email?.message}</p>
          </div>
          <br />
          <div>
            <label htmlFor="phone" className="font-bold text-lg">
              Phone
            </label>
            <br />
            <input
              type="text"
              placeholder="1 (614) 316-1430"
              className={`${
                errors.phone ? "rounded-sm border-2 border-red-500" : ""
              } w-full px-1`}
              {...register("phone")}
            />
            <p className="text-red-500 text-xs">{errors.phone?.message}</p>
          </div>
          <br />
          <div>
            <label htmlFor="dateTime" className="font-bold text-lg">
              Date and time
            </label>
            <br />
            <input
              type="datetime-local"
              min={minDateTime}
              className={`${
                errors.dateTime ? "rounded-sm border-2 border-red-500" : ""
              } w-full px-1`}
              {...register("dateTime")}
            />
            <p className="text-red-500 text-xs">{errors.dateTime?.message}</p>
          </div>
          <br />
          <div>
            <label htmlFor="raison" className="font-bold text-lg">
              Reason
            </label>
            <br />
            <input
              placeholder="Reason..."
              className={`${
                errors.raison ? "rounded-sm border-2 border-red-500" : ""
              } w-full px-1`}
              {...register("raison")}
            />
            <p className="text-red-500 text-xs">{errors.raison?.message}</p>
          </div>
          <br />
          <div>
            <label htmlFor="additionalInfo" className="font-bold text-lg">
              Additional info
            </label>
            <br />
            <textarea
              name="additionalInfo"
              placeholder="Additional info..."
              maxLength={2000}
              rows={4}
              className="w-full rounded-md border-2 px-1"
              {...register("additionalInfo")}
            />
          </div>
          <br />
          <div className="flex justify-between my-8">
            <button
              className="w-1/3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

AppointmentForm.propTypes = {
  appointment: PropTypes.object,
  updateAppointment: PropTypes.func,
  isUpdating: PropTypes.bool,
};

export default AppointmentForm;
