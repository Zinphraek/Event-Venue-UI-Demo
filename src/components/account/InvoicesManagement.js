import React, { useEffect, useState } from "react";
import Invoice from "../invoice/Invoice";
import ReactToPrint from "react-to-print";
import Modal from "../../utilities/components/Modal";
import KeycloakService from "../config/KeycloakService";
import { formatDate } from "../../utilities/functions/Helpers";
import { getInvoicesByUserId } from "../invoice/InvoiceServices";
import { InvoiceModel } from "../../utilities/models/InvoiceModel";
import { EntitiesListResponseModel } from "../../utilities/models/EntitiesListResponseModel";
import { Button, Tooltip } from "@mui/material";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import CustomDataTable from "../../utilities/components/CustomDataTable";
import { statusIcon } from "../../utilities/models/General";
import { useLoadingSpinner } from "../../utilities/components/LoadingSpinnerProvider";

const InvoicesManagement = () => {
  const setIsLoading = useLoadingSpinner();
  const [params, setParams] = useState({ pageSize: 10, page: 0 });
  const [invoices, setInvoices] = useState(EntitiesListResponseModel);
  const [invoice, setInvoice] = useState(InvoiceModel);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const lunchDetailsViewModal = (invoice) => {
    setInvoice(invoice);
    setIsViewModalOpen(true);
  };

  const headerColumnsArray = [
    {
      field: "id",
      headerName: "Details",
      width: 120,
      renderCell: (params) => {
        return (
          <Tooltip title="View this invoice">
            <span>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => lunchDetailsViewModal(params.row)}
              >
                View
              </Button>
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: "issuedDate",
      headerName: "Issued Date",
      width: 170,
      valueFormatter: (params) => formatDate(params?.value),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 170,
      valueFormatter: (params) => formatDate(params?.value),
    },
    {
      field: "guestCount",
      headerName: "Guest Count",
      type: "number",
      width: 150,
      renderCell: (params) => {
        return params?.row?.reservation?.numberOfSeats;
      },
    },
    {
      field: "amountDue",
      headerName: "Amount Due ($)",
      type: "number",
      width: 150,
    },
    {
      field: "totalAmountPaid",
      headerName: "Amount Paid ($)",
      type: "number",
      width: 150,
    },
    {
      field: "total",
      headerName: "Total Amount ($)",
      type: "number",
      width: 150,
      renderCell: (params) => {
        return params?.row?.reservation?.totalPrice?.toFixed(2);
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 175,
      renderCell: (params) => (
        <div
          className={`flex flex-row rounded items-center px-2 h-[34px] ${
            statusIcon[params.row.status].style
          }`}
        >
          <span className="m-2">{statusIcon[params.row.status].icon}</span>
          <span className="my-2 mr-2">{params.row.status}</span>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    getInvoicesByUserId(
      KeycloakService.getUserId(),
      params,
      setInvoices,
      setIsLoading
    );
  }, [params, setIsLoading]);

  return (
    <div className="max-w-xs md:max-w-6xl mr-2 top-16 absolute">
      <div className="flex flex-row justify-between items-baseline max-w-screen mt-2">
        <h2 className="text-normal md:text-xl text-blue-500 uppercase mb-4 pl-1">
          Invoices
        </h2>
      </div>
      <CustomDataTable
        headerColumn={headerColumnsArray}
        paginationModel={params}
        rows={invoices}
        setPaginationModel={setParams}
      />
      <Modal
        isOpen={isViewModalOpen}
        onClose={setIsViewModalOpen}
        maxModalWidth={"sm:max-w-4xl"}
      >
        <div className="flex flex-col space-y-2 mt-8">
          <div className="flex flex-row space-x-1 px-4 sm:px-6">
            {/* ----- Print Button ----- */}
            <ReactToPrint
              trigger={() => (
                <button className="flex flex-row bg-blue-500 space-x-1 text-white text-lg text-center rounded mb-8 m-1 px-4 py-2 hover:scale-105">
                  <PrintRoundedIcon className="h-6 w-6" aria-hidden="true" />
                  <span>Print /</span>
                  <DownloadRoundedIcon className="h-6 w-6" aria-hidden="true" />
                  <span>Save as PDF</span>
                </button>
              )}
              content={() => document.getElementById("invoice")}
            />
          </div>
          <div className="px-4 sm:px-6">
            <Invoice invoice={invoice} />
          </div>
          <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 sm:mt-0 sm:w-auto"
              onClick={() => setIsViewModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InvoicesManagement;
