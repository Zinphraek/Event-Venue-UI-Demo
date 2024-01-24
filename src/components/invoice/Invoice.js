import React /*useState*/ from "react";
import InvoiceTable from "./InvoiceTable";
import {
  USDollar,
  computeOverTimeInHours,
  formatDateForDetailsView,
  getNextDayAt3AM,
} from "../../utilities/functions/Helpers";
import FacilityConstants from "../../utilities/constants/FacilityConstants";

/**
 * The component to display the invoice.
 * @param {object} props  The props passed to the component.
 * @returns  The component to display the invoice.
 */
const Invoice = ({ invoice }) => {
  const subTotal =
    invoice.reservation.totalPrice / (1 + invoice.reservation.taxRate);

  const discount = invoice.reservation.discount;

  const discountValue = discount
    ? discount.amount > 0
      ? USDollar.format(discount.amount.toFixed(2))
      : `${discount.percentage} %`
    : null;

  const nextDayAt3AM = getNextDayAt3AM(invoice.reservation.startingDateTime);
  const endingDateTime = new Date(invoice.reservation.endingDateTime);
  const effectiveEndingDateTime = new Date(
    invoice.reservation.effectiveEndingDateTime
  );
  const overtime =
    !!invoice.effectiveEndingDateTime && effectiveEndingDateTime > nextDayAt3AM
      ? computeOverTimeInHours(nextDayAt3AM, effectiveEndingDateTime)
      : endingDateTime > nextDayAt3AM
      ? computeOverTimeInHours(nextDayAt3AM, endingDateTime)
      : 0;
  return (
    <div className="flex flex-col" id="invoice">
      {/* ----- Invoice Header ----- */}
      <div className="flex flex-row justify-between items-center mt-1">
        {/* ----- Logo ----- */}
        <div>
          <img
            className="h-14 w-auto lg:block hover:rounded-full"
            src="/assets/images/le_prestige_hall_logo.png"
            alt="Le Prestige Hall"
          />
        </div>

        {/* ----- InvocecText ----- */}
        <div>
          <h1 className="text-2xl text-blue-400 m-4 uppercase md:text-3xl lg:text-6xl tracking-wide font-alata">
            Invoice
          </h1>
        </div>
      </div>

      <div className="flex flex-row justify-between my-3">
        {/* ----- Company Name ----- */}
        <div className="flex flex-row items-baseline space-x-3">
          <h2 className="text-2xl text-blue-700 font-bold font-alata">
            Le Prestige Hall, Inc
          </h2>
        </div>

        {/* ----- Invoice number ----- */}
        <div className="flex flex-row items-baseline space-x-3">
          <p className="flex-shrink-0 font-semibold text-lg text-blue-500">
            Invoice #{" "}
          </p>
          <p className="mt-1 block w-full px-3 border border-gray-300 rounded-md">
            {invoice.invoiceNumber}
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-between my-4">
        {/* ----- Company Info ----- */}
        <div className="flex flex-col space-y-1">
          {/* ----- Contact ----- */}
          <div className="flex flex-col space-y-1">
            <div className="flex flex-row items-baseline space-x-3">
              <h3 className="font-semibold">Phone:</h3>
              <p>{FacilityConstants.PHONE.format1}</p>
            </div>
            <div className="flex flex-row items-baseline space-x-3">
              <h3 className="font-semibold">Email:</h3>
              <p>{FacilityConstants.EMAILS.invoices}</p>
            </div>
          </div>

          {/* ----- Address ----- */}
          <div className="flex flex-col items-baseline space-x-1 py-1">
            {/* ----- Street Address ----- */}
            <p className="font-semibold">{FacilityConstants.ADDRESS.Street}</p>

            {/* ----- City, State, Zip Code ----- */}
            <p className="font-semibold">
              {FacilityConstants.ADDRESS.City},{" "}
              {FacilityConstants.ADDRESS.State}{" "}
              {FacilityConstants.ADDRESS.ZipCode}
            </p>
          </div>
        </div>

        {/* ----- Invoice Date, Payment Term, and Due Date ----- */}
        <div className="flex flex-col space-x-1">
          {/* ----- Invoice Date ----- */}
          <div className="flex flex-row items-baseline space-x-3">
            <h3 className="flex-shrink-0 font-semibold text-lg">Date</h3>
            <p className="font-normal mt-1 block w-full py-1 px-3 border border-gray-300 rounded-md">
              {formatDateForDetailsView(invoice.issuedDate)}
            </p>
          </div>
          {/* ----- Payment Term ----- */}
          <div className="flex flex-row items-baseline space-x-3">
            <h3 className="flex-shrink-0 font-semibold text-lg">
              Payment Term
            </h3>
            <p className="font-normal mt-1 block w-full py-1 px-3 border border-gray-300 rounded-md">
              Pay By Due Date
            </p>
          </div>
          {/* ----- Due Date ----- */}
          <div className="flex flex-row items-baseline space-x-1">
            <h3 className="flex-shrink-0 font-semibold text-lg">Due Date</h3>
            <p className="font-normal mt-1 block w-full py-1 px-3 border border-gray-300 rounded-md">
              {formatDateForDetailsView(invoice.dueDate)}
            </p>
          </div>
        </div>
      </div>

      {/* ----- Billing Info ----- */}
      <div className="flex flex-col  my-4 bg-gray-200 rounded px-2">
        {/* ----- Billing Info Header ----- */}
        <div className="flex justify-center items-center m-2 pt-2">
          <h2 className="font-bold text-2xl">Billing Information</h2>
        </div>

        {/* ----- Billing Info Body ----- */}
        <div className="flex flex-col space-y-1 m-4">
          {/* ----- Billing Info Body - Row 1 ----- */}
          <div className="flex flex-row justify-between items-baseline">
            <h3 className="flex-shrink-0 font-semibold text-lg">Name</h3>
            <p className="font-normal mt-1 block py-1 px-3 border border-gray-300 rounded-md">
              {invoice.user.firstName} {invoice.user.lastName}
            </p>
          </div>

          {/* ----- Billing Info Body - Row 2 ----- */}
          <div className="flex flex-row justify-between items-baseline">
            <h3 className="flex-shrink-0 font-semibold text-lg">Phone</h3>
            <p className="font-normal mt-1 block py-1 px-3 border border-gray-300 rounded-md">
              {invoice.user.phone}
            </p>
          </div>

          {/* ----- Billing Info Body - Row 3 ----- */}
          <div className="flex flex-row justify-between items-baseline">
            <h3 className="flex-shrink-0 font-semibold text-lg">Email</h3>
            <p className="font-normal mt-1 block py-1 px-3 border border-gray-300 rounded-md">
              {invoice.user.email}
            </p>
          </div>

          {/* ----- Billing Info Body - Row 4 ----- */}
          <div className="flex flex-row justify-between items-baseline">
            <h3 className="flex-shrink-0 font-semibold text-lg">Address</h3>
            <p className="font-normal mt-1 block py-1 px-3 border border-gray-300 rounded-md">
              {invoice.user.street}, {invoice.user.city}, {invoice.user.state}{" "}
              {invoice.user.zipCode}
            </p>
          </div>
        </div>
      </div>

      {/* ----- Invoice Table ----- */}
      <InvoiceTable reservation={invoice.reservation} overtime={overtime} />

      {/* ----- Invoice Summary ----- */}
      <div className="flex flex-row justify-end mt-4">
        <div className="flex flex-col space-x-1 p-3 rounded border border-gray-300">
          {/* ----- Subtotal ----- */}
          <div className="grid grid-cols-2 justify-between items-baseline space-x-6">
            <p className="flex-shrink-0 font-semibold text-medium mr-4">
              Subtotal:{" "}
            </p>
            <p className="font-medium block w-full">
              {USDollar.format(subTotal.toFixed(2))}
            </p>
          </div>

          {/* ----- Applied Discount ----- */}
          {discountValue && (
            <div className="grid grid-cols-2 justify-between items-baseline space-x-6">
              <p className="flex-shrink-0 font-semibold text-medium mr-4">
                Applied Discount:{" "}
              </p>
              <p className="font-medium block w-full">{discountValue}</p>
            </div>
          )}

          {/* ----- Tax ----- */}
          <div className="grid grid-cols-2 justify-between items-baseline space-x-6">
            <p className="flex-shrink-0 font-semibold text-medium mr-4">
              Tax:{" "}
            </p>
            <p className="font-medium block w-full">
              {USDollar.format(
                invoice.reservation.totalPrice - subTotal.toFixed(2)
              )}
            </p>
          </div>

          {/* ----- Grand Total ----- */}
          <div className=" grid grid-cols-2 justify-between items-baseline space-x-6">
            <p className="flex-shrink-0 font-bold text-lg mr-4">
              Grand Total:{" "}
            </p>
            <p className="font-bold block w-full">
              {USDollar.format(invoice.reservation.totalPrice)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
