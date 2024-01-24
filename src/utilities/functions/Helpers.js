import FacilityConstants from "../constants/FacilityConstants";
import { SubtotalBreakDown } from "../models/ReservationModel";

/**
 * Capitalize a given word.
 * @param {string} word The word to capitalize
 * @returns The capitalized version of word.
 */
export const capitalize = (word) => {
  const lowerCaseWord = word.toLowerCase();
  return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
};

/**
 * Abbreviate a given number.
 * @param {number} number The number to abbreviate.
 * @returns The abbreviated version of number.
 * @example 1,000,000 => 1M
 */
export const abbreviateNumber = (number) => {
  const units = ["k", "M", "B", "T"];
  let unitIndex = "";
  let divisor = 1;

  if (number >= 1_000) {
    divisor = 1_000;
    unitIndex = 0;
  }
  if (number >= 1_000_000) {
    divisor = 1_000_000;
    unitIndex = 1;
  }
  if (number >= 1_000_000_000) {
    divisor = 1_000_000_000;
    unitIndex = 2;
  }
  if (number >= 1_000_000_000_000) {
    divisor = 1_000_000_000_000;
    unitIndex = 3;
  }
  return number < 1000
    ? number
    : (number / divisor).toFixed(1) + units[unitIndex];
};

/**
 * Format a date time to the following as yyy-mm-dd, hh:mm a/p.
 * @param {string} dateToFormat
 * @returns The dateToFormat string formated as yyy-mm-dd, hh:mm a/p.
 */
export const formatDateTime = (dateToFormat) => {
  const date = new Date(dateToFormat);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + (((date.getHours() + 11) % 12) + 1)).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  return `${year}-${month}-${day}, ${hour}:${minute} ${ampm}`;
};

/**
 * Format a date time to the following as yyy-mm-dd.
 * @param {string} dateToFormat
 * @returns The dateToFormat string formated as yyy-mm-dd.
 * @example 2021-01-01T00:00:00.000Z => 2021-01-01
 * @example 2021-01-01 => 2021-01-01
 */
export const formatDate = (dateToFormat) => {
  const date = new Date(dateToFormat);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

/**
 * Format a date time to the following as yyy-mm-dd.
 * @param {string} dateToFormat
 * @returns The dateToFormat string formated as yyy-mm-dd.
 */
export const formatDateForDetailsView = (dateToFormat) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateToFormat);
  // Extract the month, day and year from the date
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  // Construct and return the formatted date string
  return `${month} ${day}, ${year}`;
};

/**
 * Format a date time to the following as yyy/mm/dd.
 * @param {string} dateToFormat
 * @returns The dateToFormat string formated as yyy/mm/dd.
 */
export const getDateSting = (dateToFormat) => {
  const date = new Date(dateToFormat);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}/${month}/${day}`;
};

/**
 * Format a date time to the following as mm/dd/yyyy.
 * @param {string} dateToFormat
 * @returns The dateToFormat string formated as mm/dd/yyyy.
 */
export const formatDateForComment = (dateToFormat) => {
  const date = new Date(dateToFormat);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${month}/${day}/${year}`;
};

/**
 * Format a date time to the following as hh:mm a/p.
 * @param {string} dateToFormat The date time to format.
 * @returns The dateToFormat string formated as hh:mm a/p.
 */
export const getTimeString = (dateToFormat) => {
  const date = new Date(dateToFormat);
  const hour = ("0" + (((date.getHours() + 11) % 12) + 1)).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  return `${hour}:${minute} ${ampm}`;
};

/**
 * Check if the given date is in the future.
 * @param {Date} date The date to check.
 * @returns True if the given date is in the future, false otherwise.
 */
export const isDateInTheFuture = (date) => {
  const now = new Date().toLocaleString("en-US", timeOptions);
  const nowDate = new Date(now);
  const dateToCheck = new Date(
    new Date(date).toLocaleDateString("en-US", timeOptions)
  );
  return dateToCheck > nowDate;
};

/**
 * Check if the given date is in the past.
 * @param {Date} date The date to check.
 * @returns True if the given date is in the past, false otherwise.
 */
export const isDateInThePast = (date) => {
  const now = new Date().toLocaleString("en-US", timeOptions);
  const nowDate = new Date(now);
  const [month, day, year] = date.split("-");
  const formatDate = `${year}-${month}-${day}`; // Reverse the date to be in the correct format
  const dateToCheck = new Date(
    new Date(formatDate).toLocaleDateString("en-US", timeOptions)
  );
  return dateToCheck < nowDate;
};

/**
 * Check if the given date is valid.
 * @param {Date} date The date to check.
 * @returns True if the given date is valid, false otherwise.
 * @example 2021-01-01 => true
 * @example 2021-01-32 => false
 * @example 2021-13-01 => false
 */
export const isDateStringValid = (date) => {
  const [month, day, year] = date.split("-"); // Reverse the date to be in the correct format
  const formatDate = `${year}-${month}-${day}`;
  const dateToCheck = new Date(formatDate);
  return dateToCheck instanceof Date && !isNaN(dateToCheck);
};

/**
 * Check if the given date is before the declared starting date.
 * @param {Date} date The date to check.
 * @param {Date} declaredStartingDate The declared starting date.
 * @returns True if the given date is before the declared starting date, false otherwise.
 */
export const isDateAfterDeclaredStartingDate = (date, declaredStartingDate) => {
  const dateToCheck = new Date(
    new Date(date).toLocaleDateString("en-US", timeOptions)
  );
  const declaredStartingDateToCheck = new Date(
    new Date(declaredStartingDate).toLocaleDateString("en-US", timeOptions)
  );
  return dateToCheck > declaredStartingDateToCheck;
};

/**
 * Check if the given date time is between two given times boundaries or default to 9:00 AM and 7:30 PM.
 * @param {Date} dateTime The date time to check.
 * @param {object} lowerBoundary The lower boundary.
 * @param {object} upperBoundary The higher boundary.
 * @returns True if the given date time is between the given boundaries or 9:00 AM and 7:30 PM if no boundaries were provided, false otherwise.
 */
export const isTimeBetweenBoundaries = (
  dateTime,
  lowerBoundary,
  upperBoundary
) => {
  // Define start and end times (hours and minutes)
  const startTime = {
    hours: lowerBoundary?.hours ?? 9,
    minutes: lowerBoundary?.minutes ?? 0,
  }; // 9:00
  const endTime = {
    hours: upperBoundary?.hours ?? 19,
    minutes: upperBoundary?.minutes ?? 30,
  }; // 19:30 (7:30 PM)
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  // Convert hours and minutes to minutes for easier comparison
  const totalMinutes = hours * 60 + minutes;
  const totalStartMinutes = startTime.hours * 60 + startTime.minutes;
  const totalEndMinutes = endTime.hours * 60 + endTime.minutes;

  // Check if the time falls within the range
  return totalMinutes >= totalStartMinutes && totalMinutes <= totalEndMinutes;
};

export let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export let timeOptions = {
  timeZone: "America/New_York",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

/**
 * Extract the price of a given addOn.
 * @param {Array} addOnList The list of all addOns.
 * @param {String} targetAddOnName
 * @returns The price of the given addOn.
 */
export const extractAddOnPrice = (addOnList, targetAddOnName) =>
  addOnList.find((addOn) => addOn.name === targetAddOnName)?.price;

/**
 * Fine the next 2:00 AM corresponding date object.
 * @param {object} date The date to get the next day at 2:00 AM
 * @returns The next date object
 */
export const getNextDayAt3AM = (date) => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay.setHours(3);
  nextDay.setMinutes(0);
  nextDay.setSeconds(0);
  nextDay.setMilliseconds(0);
  return nextDay;
};

/**
 * Format a date to be used in an input.
 * @param {Date} date The date to format.
 * @returns The date formatted to be used in an input.
 */
export const formatDateForInput = (dateInput) => {
  const date = new Date(dateInput);
  if (!date) {
    return "";
  }
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 *
 * @param {Date} startingDateTime The starting date and time of the reservation.
 * @param {Date} endingDateTime The ending date and time of the reservation.
 * @param {Date} effectiveEndingDateTime The effective ending date and time of the reservation.
 * @returns The overtime in hours.
 */
export const computeReservationOvertime = (
  startingDateTime,
  endingDateTime,
  effectiveEndingDateTime
) => {
  const startingDateAndTime = startingDateTime
    ? new Date(startingDateTime)
    : "";
  const nextDayAt3AM = startingDateTime
    ? getNextDayAt3AM(startingDateTime)
    : "";
  const endingDateAndTime = endingDateTime ? new Date(endingDateTime) : "";
  const effectiveEndingDateAndTime = effectiveEndingDateTime
    ? new Date(effectiveEndingDateTime)
    : "";
  const overtime =
    startingDateAndTime === ""
      ? 0
      : endingDateAndTime === ""
      ? 0
      : endingDateAndTime < nextDayAt3AM
      ? effectiveEndingDateAndTime !== "" &&
        effectiveEndingDateAndTime > nextDayAt3AM
        ? computeOverTimeInHours(nextDayAt3AM, effectiveEndingDateAndTime)
        : 0
      : effectiveEndingDateAndTime !== "" &&
        effectiveEndingDateAndTime > endingDateAndTime
      ? computeOverTimeInHours(nextDayAt3AM, effectiveEndingDateAndTime)
      : effectiveEndingDateAndTime === ""
      ? computeOverTimeInHours(nextDayAt3AM, endingDateAndTime)
      : 0;

  return overtime;
};

/**
 * Compute the overtime in hour unit.
 * @param {object} regularEndingDateTime The regular time at which event end.
 * @param {object} actualEndingDateTime The actual tiem at which the event ended.
 * @returns
 */
export const computeOverTimeInHours = (
  regularEndingDateTime,
  actualEndingDateTime
) => {
  return (
    (actualEndingDateTime.getTime() - regularEndingDateTime.getTime()) /
    (1000 * 60 * 60)
  );
};

/**
 * Compute the subtotal of the reservation.
 * @param {number} addOnsTotal The total cost of all additional items.
 * @param {number} guestCount The total guest count.
 * @param {object} dateTime The starting, ending, and effective ending date-time objects.
 * @param {object} rates All facility rates.
 * @param {Function} setSubtotalBreakDown The price break down updating function.
 * @returns
 */
export const computeSubtotal = (
  addOnsTotal,
  guestCount,
  dateTimes,
  rates,
  setSubtotalBreakDown
) => {
  const seatPrice = rates?.seatRate ?? FacilityConstants.SEAT_RATE;
  const startingDateAndTime = dateTimes.startingDateTime
    ? new Date(dateTimes.startingDateTime)
    : "";
  const day =
    startingDateAndTime === ""
      ? ""
      : FacilityConstants.WEEK_DAYS[startingDateAndTime.getDay()];

  /*Selecting the rigth facility rate. If the rate are provided through addOns,
     use those rates accordingly, else use the predefined values in the constant object.*/
  const facilityRental =
    !!rates.regularFacilityRate &&
    !!rates.saturdayFacilityRate &&
    !!rates &&
    !!day &&
    day !== FacilityConstants.WEEK_DAYS[FacilityConstants.WEEK_DAYS.length - 1]
      ? rates.regularFacilityRate
      : rates.saturdayFacilityRate;

  /*Selecting the rigth facility cleaning rate. If the rate are provided through addOns,
     use those rates accordingly, else use the predefined values in the constant object.*/
  const facilityCleaningFees =
    !!rates.cleaningFeesLargeGuestsCount &&
    !!rates &&
    !!rates.cleaningFeesSmallGuestsCount &&
    !!guestCount &&
    guestCount <= 100
      ? rates.cleaningFeesSmallGuestsCount
      : rates.cleaningFeesLargeGuestsCount;

  const overtime = computeReservationOvertime(
    dateTimes.startingDateTime,
    dateTimes.endingDateTime,
    dateTimes.effectiveEndingDateTime
  );

  const overtimeRate = !!rates.overtimeHourlyRate
    ? rates.overtimeHourlyRate
    : FacilityConstants.OVERTIME_RATE;

  const subBreakdown = {
    addOnsTotal,
    facilityRental,
    facilityCleaningFees,
    overtime: {
      hours: overtime,
      totalCost: overtime * overtimeRate,
      overtimeRate,
    },
    seats: {
      seatsCount: guestCount,
      seatPrice,
      seatRateTotal: guestCount * seatPrice,
    },
  };

  setSubtotalBreakDown({ ...subBreakdown });

  return (
    +addOnsTotal +
    +guestCount * seatPrice +
    overtime * overtimeRate +
    facilityRental +
    facilityCleaningFees
  );
};

/**
 * Generate the initial subtotal break down.
 * @param {object} reservation The reservation object.
 * @returns The initial subtotal break down.
 */
export const generateInitialSubtotalBreakDown = (reservation) => {
  const initialSubBreakDown = { ...SubtotalBreakDown };
  if (reservation) {
    initialSubBreakDown.facilityCleaningFees = reservation.rates.cleaningRate;
    initialSubBreakDown.facilityRental = reservation.rates.facilityRate;
    initialSubBreakDown.seats.seatPrice = reservation.rates.seatRate;
    initialSubBreakDown.seats.seatsCount = reservation.numberOfSeats;
    initialSubBreakDown.seats.seatRateTotal =
      reservation.rates.seatRate * reservation.numberOfSeats;
    initialSubBreakDown.overtime.overtimeRate = reservation.rates.overtimeRate;
    initialSubBreakDown.overtime.hours = computeReservationOvertime(
      reservation.startingDateTime,
      reservation.endingDateTime,
      reservation.effectiveEndingDateTime
    );
    initialSubBreakDown.overtime.totalCost =
      initialSubBreakDown.overtime.hours * reservation.rates.overtimeRate;
  }
  return initialSubBreakDown;
};
