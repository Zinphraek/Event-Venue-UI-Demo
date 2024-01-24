import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllAddOns } from "../addOns/AddOnsService";
import KeycloakService from "../config/KeycloakService";
import { createReservation } from "./ReservationServices";
import FacilityConstants from "../../utilities/constants/FacilityConstants";
import {
  extractAddOnPrice,
  computeSubtotal,
  formatDateTime,
  USDollar,
  timeOptions,
  formatDateForInput,
  generateInitialSubtotalBreakDown,
} from "../../utilities/functions/Helpers";
import { EntitiesListResponseModel } from "../../utilities/models/EntitiesListResponseModel";
import {
  ReservationModel,
  reservationSchema,
} from "../../utilities/models/ReservationModel";
import AddonsList from "../addOns/AddOnsList";
import { Services } from "../../utilities/models/ServiceModel";
import { useLocation } from "react-router-dom";
import { useUserRefresh } from "../user/UserProvider";
import { useLoadingSpinner } from "../../utilities/components/LoadingSpinnerProvider";

/**
 * The resrvation form
 * @param {object} props - The props passed to the component when updating a reservation.
 * @returns
 */
const ReservationForm = (props) => {
  const {
    reservation,
    updateReservation,
    toggleModal,
    setState,
    isUpdating = false,
  } = props;

  const setIsLoading = useLoadingSpinner();
  const locationState = useLocation().state;
  const setFetchUserFlag = useUserRefresh();

  const [confictingSchedule, setConfictingSchedule] = useState(false);
  const {
    clearErrors,
    control,
    getValues,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reservationSchema),
    defaultValues: {
      id: reservation?.id ?? null,
      startingDateTime: reservation?.startingDateTime ?? "",
      endingDateTime: reservation?.endingDateTime ?? "",
      effectiveEndingDateTime: reservation?.effectiveEndingDateTime ?? "",
      eventType: reservation?.eventType ?? locationState?.eventType ?? "",
      numberOfSeats: reservation?.numberOfSeats ?? "",
      addOns: reservation?.addOns ?? [],
      addOnsTotalCost: reservation?.addOnsTotalCost ?? 0,
      status: reservation?.status ?? FacilityConstants.STATUS.PENDING,
      fullPackage: reservation?.fullPackage ?? false,
      securityDepositRefunded: reservation?.securityDepositRefunded ?? false,
      taxRate: reservation?.taxRate ?? FacilityConstants.TAXE_RATE,
      totalPrice: reservation?.totalPrice ?? 0,
      priceComputationMethod:
        reservation?.priceComputationMethod ??
        FacilityConstants.COMPUTATION_METHOD.AUTO,
      userId: reservation?.userId ?? KeycloakService.getUserId(),
    },
  });

  const now = new Date().toLocaleString("en-US", timeOptions);
  const todayAt12AM = new Date(now).setHours(0, 0, 0, 0);
  const nextDayAt12AM = new Date(todayAt12AM).setHours(20, 0, 0, 0);

  const minDateTime =
    new Date(now) > new Date(now).setHours(19, 30, 0, 0)
      ? new Date(nextDayAt12AM).toISOString().slice(0, 16)
      : new Date(todayAt12AM).toISOString().slice(0, 16);

  const initialSubBreakDown = generateInitialSubtotalBreakDown(reservation);

  const [addOnsData, setAddOnsData] = useState(EntitiesListResponseModel);
  const [subTotal, setSubTotal] = useState(
    reservation ? reservation.totalPrice / (1 + reservation.taxRate) : 0
  );
  const [taxe, setTaxe] = useState(
    reservation ? reservation.totalPrice - subTotal : 0
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [subTotalBreakDown, setSubTotalBreakDown] =
    useState(initialSubBreakDown);

  const primaryServices = Services.slice(0, -1)
    .filter((service) => service.available)
    .sort((a, b) => a.title.localeCompare(b.title));
  const otherService = Services[Services.length - 1];

  const singIn = async () => {
    await KeycloakService.doLogin(setFetchUserFlag);
  };

  const resetForm = () => {
    reset();
    setTaxe(0);
    setSubTotal(0);
    setSearchQuery("");
    setValue("addOns", []);
    setCategoryFilters([]);
    setSubTotalBreakDown(generateInitialSubtotalBreakDown(ReservationModel));

    clearErrors();
    toggleModal !== undefined && toggleModal(false);
  };

  const onSubmit = async (data) => {
    data.startingDateTime = formatDateTime(data.startingDateTime);
    data.endingDateTime = formatDateTime(data.endingDateTime);
    if (data.effectiveEndingDateTime) {
      data.effectiveEndingDateTime = formatDateTime(
        data.effectiveEndingDateTime
      );
    } else {
      delete data.effectiveEndingDateTime;
    }

    setIsLoading(true);
    if (isUpdating) {
      await updateReservation(
        data,
        setConfictingSchedule,
        setState,
        setIsLoading
      );
    } else {
      await createReservation(
        data,
        setConfictingSchedule,
        setState,
        setIsLoading
      );
    }
    !confictingSchedule && resetForm();
  };

  const rateNames = [
    "SEAT_RATE_NAME",
    "OVERTIME_HOURLY_RATE_NAME",
    "REGULAR_FACILITY_RATE_NAME",
    "SATURDAY_FACILITY_RATE_NAME",
    "CLEANING_FEES_SMALL_GUESTS_COUNT_NAME",
    "CLEANING_FEES_LARGE_GUESTS_COUNT_NAME",
  ];

  const rates = rateNames.reduce((acc, rateName) => {
    let key = rateName.toLowerCase().replace(/_name$/, "");
    key = key
      .split("_")
      .map((word, index) =>
        index !== 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
      )
      .join("");
    acc[key] = extractAddOnPrice(
      addOnsData.content,
      FacilityConstants[rateName]
    );
    return acc;
  }, {});

  /**
   * Handle the guest count value change.
   * @param {object} e The guest count input event.
   */
  const handleGuestCountChange = (e) => {
    let numberOfSeats = e.target.valueAsNumber;
    const data = getValues();
    if (!(typeof numberOfSeats === "number" && !isNaN(numberOfSeats))) {
      setValue("numberOfSeats", "");
      numberOfSeats = 0;
    } else {
      setValue("numberOfSeats", numberOfSeats);
    }
    const dateTimes = {
      startingDateTime: data.startingDateTime,
      endingDateTime: data.endingDateTime,
      effectiveEndingDateTime: data.effectiveEndingDateTime,
    };
    const subtotal = computeSubtotal(
      data.addOnsTotalCost,
      numberOfSeats,
      dateTimes,
      rates,
      setSubTotalBreakDown
    );
    setSubTotal(subtotal);
    setTaxe(subtotal * FacilityConstants.TAXE_RATE);
    const total = subtotal + subtotal * FacilityConstants.TAXE_RATE;
    setValue("totalPrice", total);
  };

  /**
   * Handle the reservation ending date and time value change.
   * @param {Object} e The reservation ending date and time value input event.
   */
  const handleEndingDatetimeChange = (onChange) => (e) => {
    const endingDateTime = e.target.value;
    onChange(endingDateTime);
    const data = getValues();
    const dateTimes = {
      startingDateTime: data.startingDateTime,
      endingDateTime: endingDateTime,
      effectiveEndingDateTime: data.effectiveEndingDateTime,
    };
    const subtotal = computeSubtotal(
      data.addOnsTotalCost,
      data.numberOfSeats,
      dateTimes,
      rates,
      setSubTotalBreakDown
    );
    setSubTotal(subtotal);
    setTaxe(subtotal * FacilityConstants.TAXE_RATE);
    const total = subtotal + subtotal * FacilityConstants.TAXE_RATE;
    setValue("totalPrice", total);
  };

  /**
   * Handle the reservation starting date and time value change.
   * @param {object} e The reservation starting date and time value input event.
   */
  const handleStartingDateTimeChange = (onChange) => (e) => {
    const startingDateTime = e.target.value;
    onChange(startingDateTime);
    const data = getValues();
    const dateTimes = {
      startingDateTime: startingDateTime,
      endingDateTime: data.endingDateTime,
      effectiveEndingDateTime: data.effectiveEndingDateTime,
    };
    const subtotal = computeSubtotal(
      data.addOnsTotalCost,
      data.numberOfSeats,
      dateTimes,
      rates,
      setSubTotalBreakDown
    );
    setSubTotal(subtotal);
    setTaxe(subtotal * FacilityConstants.TAXE_RATE);
    const total = subtotal + subtotal * FacilityConstants.TAXE_RATE;
    setValue("totalPrice", total);
  };

  /**
   * Handle the addOns' category selection.
   * @param {String} option The category selection event.
   */
  const handleCategoryFilterChange = (option) => {
    const selectedCategory = option;
    if (categoryFilters.includes(selectedCategory)) {
      setCategoryFilters(
        categoryFilters.filter((category) => category !== selectedCategory)
      );
    } else {
      setCategoryFilters([...categoryFilters, selectedCategory]);
    }
  };

  /**
   * Handle the search string change.
   * @param {object} event The search typing event.
   */
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  /**
   * Handle the change in quantity of a selected addOn.
   * @param {object} selectedItem The addOn selected
   * @param {number} quantity The quantity desired by the user.
   */
  const handleItemQuantityChange = (selectedItem, quantity) => {
    const data = getValues();
    const prevSelectedItems = data.addOns.slice();
    const existingItemIndex = prevSelectedItems.findIndex(
      (item) => item.addOn.name === selectedItem.name
    );

    if (quantity > 0) {
      // Item exists
      if (existingItemIndex >= 0) {
        // Update the quantity of the existing item
        prevSelectedItems[existingItemIndex].quantity = quantity;
      }
      if (existingItemIndex === -1) {
        // Item does not exist, and quantity is greater than 0, so add new item
        prevSelectedItems.push({ addOn: selectedItem, quantity });
      }
    } else {
      // If quantity is less than or equal to 0, remove the item
      prevSelectedItems.splice(existingItemIndex, 1);
    }

    const addOnsTotalCost = prevSelectedItems.reduce(
      (acc, { addOn, quantity }) => acc + addOn.price * quantity,
      0
    );

    setValue("addOnsTotalCost", addOnsTotalCost);

    const dateTimes = {
      startingDateTime: data.startingDateTime,
      endingDateTime: data.endingDateTime,
      effectiveEndingDateTime: data.effectiveEndingDateTime,
    };

    const subtotal = computeSubtotal(
      addOnsTotalCost,
      data.numberOfSeats,
      dateTimes,
      rates,
      setSubTotalBreakDown
    );

    const taxe = subtotal * FacilityConstants.TAXE_RATE;
    setSubTotal(subtotal);
    setTaxe(taxe);

    const total = subtotal + taxe;
    setValue("totalPrice", total);
    setValue("addOns", prevSelectedItems);
  };

  useEffect(() => {
    if (KeycloakService.isLoggedIn()) {
      getAllAddOns(setAddOnsData);
    }
  }, [isUpdating, setAddOnsData]);

  return (
    <>
      {KeycloakService.isLoggedIn() ? (
        <div className="bg-gray-100 containe mx_auto p-2 md:p-10">
          <div className="flex flex-col justify-center items-center">
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-yellow-500 mb-6 md:pt-1 text-center rounded-md md:h-24">
                <h1 className="text-2xl font-bold text-white m-6 pb-1 md:mb-10 md:text-4xl">
                  Reservation Form
                </h1>
              </div>
              <div className="font-extrabold font-alata text-xl my-4 py-3 border-b-2 border-gray-600">
                Basic Information
              </div>
              <div>
                <label htmlFor="eventType" className="font-bold text-lg">
                  Event Type
                </label>
                <br />
                <Controller
                  name="eventType"
                  control={control}
                  render={({ field }) => (
                    <select
                      className={`${
                        errors.eventType
                          ? "rounded-sm border-2 border-red-500"
                          : ""
                      } w-full px-1`}
                      id="eventType"
                      {...field}
                    >
                      <option value="">Select an event type</option>
                      {primaryServices.map((service) => (
                        <option
                          key={service.id}
                          value={service.title}
                        >{`${service.title}`}</option>
                      ))}
                      <option key={otherService.id} value={otherService.title}>
                        {otherService.title}
                      </option>
                    </select>
                  )}
                />{" "}
                {errors.eventType && (
                  <span className="text-red-500 text-xs">
                    {errors.eventType.message}
                  </span>
                )}
              </div>
              <br />
              <div>
                <label htmlFor="numberOfSeats" className="font-bold text-lg">
                  Guests Count
                </label>
                <br />
                <Controller
                  name="numberOfSeats"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="numberOfSeats"
                      type="number"
                      max={200}
                      className={`${
                        errors.numberOfSeats
                          ? "rounded-sm border-2 border-red-500"
                          : ""
                      } w-full px-1`}
                      {...field}
                      onChange={handleGuestCountChange}
                    />
                  )}
                />{" "}
                {errors.numberOfSeats && (
                  <span className="text-red-500 text-xs">
                    {errors.numberOfSeats.message}
                  </span>
                )}
              </div>
              <br />
              <div>
                <label htmlFor="startingDateTime" className="font-bold text-lg">
                  Starting Date and Time
                </label>
                <br />
                <Controller
                  name="startingDateTime"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <input
                      type="datetime-local"
                      id="startingDateTime"
                      value={formatDateForInput(value)}
                      min={minDateTime}
                      className={`${
                        errors.startingDateTime
                          ? "rounded-sm border-2 border-red-500"
                          : ""
                      } w-full px-1`}
                      onChange={handleStartingDateTimeChange(onChange)}
                    />
                  )}
                />{" "}
                {errors.startingDateTime && (
                  <span className="text-red-500 text-xs">
                    {errors.startingDateTime.message}
                  </span>
                )}
              </div>
              <br />
              <div>
                <label htmlFor="endingDateTime" className="font-bold text-lg">
                  Ending Date and Time
                </label>
                <br />
                <Controller
                  name="endingDateTime"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <input
                      id="endingDateTime"
                      type="datetime-local"
                      value={formatDateForInput(value)}
                      className={`${
                        errors.endingDateTime
                          ? "rounded-sm border-2 border-red-500"
                          : ""
                      } w-full px-1`}
                      onChange={handleEndingDatetimeChange(onChange)}
                    />
                  )}
                />{" "}
                {errors.endingDateTime && (
                  <span className="text-red-500 text-xs">
                    {errors.endingDateTime.message}
                  </span>
                )}
              </div>
              <br />

              <div className="font-extrabold font-alata text-xl mt-4 py-3 border-b-2 border-gray-600">
                Add-Ons
              </div>

              <AddonsList
                categoryFilters={categoryFilters}
                searchQuery={searchQuery}
                onCategoryFilterChange={handleCategoryFilterChange}
                onSearchQueryChange={handleSearchQueryChange}
                onItemQuantityChange={handleItemQuantityChange}
                requestedAddOns={getValues().addOns ?? []}
                addOnsData={addOnsData.content}
              />
              <br />

              <div>
                <p>
                  <i>
                    <b>Price Break Down:</b>
                  </i>
                </p>
                <br />

                <p id="addOns-totalCost">
                  <i>AddOns Total:</i>{" "}
                  {USDollar.format(getValues().addOnsTotalCost ?? 0)}
                </p>

                <p>
                  <i>Facility Rental:</i>{" "}
                  {USDollar.format(subTotalBreakDown.facilityRental)}
                </p>

                <p>
                  <i>Cleaning Fees:</i>{" "}
                  {USDollar.format(subTotalBreakDown.facilityCleaningFees)}
                </p>

                <p>
                  <i>Seats Charge:</i>{" "}
                  {USDollar.format(subTotalBreakDown.seats.seatRateTotal)}
                  {` (Guest count (${+subTotalBreakDown.seats
                    .seatsCount}) * Seat rate (${USDollar.format(
                    subTotalBreakDown.seats.seatPrice
                  )}))`}
                </p>

                <p>
                  <i>Overtime Charge:</i>{" "}
                  {USDollar.format(subTotalBreakDown.overtime.totalCost)}
                  {` (Overtime (${subTotalBreakDown.overtime.hours.toFixed(
                    2
                  )} Hours) * Overtime Hourly Rate (${USDollar.format(
                    subTotalBreakDown.overtime.overtimeRate
                  )}))`}
                </p>
                <br />

                <p className="font-bold text-lg">
                  Subtotal: {USDollar.format(subTotal)}
                </p>

                <p className="font-bold text-lg">
                  Taxe: {USDollar.format(taxe)}
                </p>

                <p className="font-extrabold text-lg">
                  Total: {USDollar.format(getValues().totalPrice ?? 0)}
                </p>
              </div>
              <br />

              <div className="flex flex-row justify-between my-8">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-1/3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div className="text-center p-4">
          <button
            onClick={() => singIn()}
            className="rounded-full text-indigo-600 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:text-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
          <span className="text-gray-900"> to continue.</span>
          <div
            style={{
              backgroundImage: "url('/assets/images/lock2.png')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "95vh",
            }}
            className="flex items-center justify-center gap-x-6 pt-10 my-10"
          ></div>
        </div>
      )}
    </>
  );
};

ReservationForm.propTypes = {
  reservation: PropTypes.object,
  updateReservation: PropTypes.func,
  toggleModal: PropTypes.func,
  setState: PropTypes.func,
  isUpdating: PropTypes.bool,
};

export default ReservationForm;
