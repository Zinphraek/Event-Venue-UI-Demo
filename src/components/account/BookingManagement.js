import React, { useEffect, useState } from "react";
import { capitalize, formatDateTime } from "../../utilities/functions/Helpers";
import {
  cancelReservation,
  getReservationByUserId,
  updateReservation,
} from "../reservation/ReservationServices";
import Modal from "../../utilities/components/Modal";
import KeycloakService from "../config/KeycloakService";
import ReservationForm from "../reservation/ReservationForm";
import Cancellation from "../../utilities/components/Cancellation";
import { ReservationModel } from "../../utilities/models/ReservationModel";
import ReservationDetailsView from "../reservation/ReservationDetailsView";
import FacilityConstants from "../../utilities/constants/FacilityConstants";
import { useLoadingSpinner } from "../../utilities/components/LoadingSpinnerProvider";
import { EntitiesListResponseModel } from "../../utilities/models/EntitiesListResponseModel";
import { Button, Tooltip } from "@mui/material";
import { statusIcon } from "../../utilities/models/General";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CustomDataTable from "../../utilities/components/CustomDataTable";

/**
 * The component to manage the user's reservations.
 * @returns The component to manage the user's reservations.
 */
const BookingManagement = () => {
  const setIsLoading = useLoadingSpinner();
  const [state, setState] = useState(false);
  const [objectId, setObjectId] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [params, setParams] = useState({ pageSize: 10, page: 0 });
  const [reservation, setReservation] = useState(ReservationModel);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [reservations, setReservations] = useState(EntitiesListResponseModel);

  const lunchEditionModal = (reservation) => {
    setReservation(reservation);
    setIsEditModalOpen(true);
  };

  const lunchDetailsViewModal = (reservation) => {
    setReservation(reservation);
    setIsViewModalOpen(true);
  };

  const lunchCreationModal = () => {
    setIsCreateModalOpen(true);
  };

  const lunchCancellationModal = (id) => {
    setObjectId(id);
    setIsCancelModalOpen(true);
  };

  const cancelReservationHandler = async () => {
    setIsLoading(true);
    await cancelReservation(objectId, setState, setIsLoading, setApiError);
    !apiError && setIsCancelModalOpen(false);
  };

  const headerColumnsArray = [
    {
      field: "id",
      headerName: "Details",
      width: 120,
      renderCell: (params) => {
        return (
          <Tooltip title="View this reservation">
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
      field: "startingDateTime",
      headerName: "Date and Time",
      width: 170,
      valueFormatter: (params) => formatDateTime(params?.value),
    },
    {
      field: "eventType",
      headerName: "Event Type",
      width: 150,
      renderCell: (params) => capitalize(params?.value),
    },
    {
      field: "effectiveEndingDateTime",
      headerName: "Ending Date and Time",
      width: 170,
      renderCell: (params) =>
        params?.value !== null
          ? formatDateTime(params?.value)
          : formatDateTime(params?.row?.endingDateTime),
    },
    {
      field: "numberOfSeats",
      headerName: "Guest Count",
      type: "number",
      width: 150,
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
    {
      field: "actions",
      headerName: "Actions",
      width: 230,
      sortable: false,
      renderCell: (params) => {
        const value = params?.row?.status;
        const isInThePast =
          new Date(params?.row?.startingDateTime) < new Date();
        const isInThePastOrDone =
          isInThePast || value === FacilityConstants.STATUS.DONE;
        const isCancelable =
          !isInThePastOrDone && value !== FacilityConstants.STATUS.CANCELLED;

        const editStyle = `bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded h-9 w-[80px] shadow-sm shadow-gray-400 ${
          isInThePastOrDone
            ? "bg-gray-300 text-gray-400 hover:bg-gray-300 cursor-not-allowed"
            : "text-white"
        }`;
        const cancelStyle = `font-bold py-2 px-4 rounded h-9 w-[80px] shadow-sm shadow-gray-400 ${
          isCancelable
            ? "text-white bg-red-500 hover:bg-red-700"
            : "bg-gray-300 text-gray-400 hover:bg-gray-300 cursor-not-allowed"
        } mx-2`;

        return (
          <>
            <Tooltip title="Edith this reservation">
              <div className="flex justify-evenly space-x-2">
                <button
                  onClick={() => lunchEditionModal(params.row)}
                  disabled={isInThePastOrDone}
                  className={editStyle}
                >
                  Edit
                </button>
              </div>
            </Tooltip>
            <Tooltip title="Cancel this reservation">
              <div className="flex justify-evenly space-x-2">
                <button
                  onClick={() => lunchCancellationModal([params.row.id])}
                  disabled={!isCancelable}
                  className={cancelStyle}
                >
                  Cancel
                </button>
              </div>
            </Tooltip>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    getReservationByUserId(
      KeycloakService.getUserId(),
      params,
      setReservations,
      setApiError,
      setIsLoading
    );
  }, [state, setIsLoading, params]);

  return (
    <div className="max-w-xs md:max-w-6xl mr-2 top-16 absolute">
      <div className="flex flex-row justify-between items-baseline max-w-screen">
        <h2 className="text-normal md:text-xl text-blue-500 uppercase mb-4 pl-1">
          Reservations
        </h2>
        <button
          onClick={lunchCreationModal}
          className="bg-blue-500 text-sm text-white m-4 mr-0 px-2 py-2 rounded uppercase flex flex-row space-x-1"
        >
          <AddRoundedIcon />
          <span className="hidden md:block">Add a Reservation</span>
        </button>
      </div>
      <CustomDataTable
        headerColumn={headerColumnsArray}
        paginationModel={params}
        rows={reservations}
        setPaginationModel={setParams}
      />
      <Modal
        isOpen={isViewModalOpen}
        onClose={setIsViewModalOpen}
        maxModalWidth={"sm:max-w-4xl"}
      >
        <ReservationDetailsView
          toggleModal={setIsViewModalOpen}
          reservation={reservation}
        />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={setIsEditModalOpen}>
        <ReservationForm
          reservation={reservation}
          updateReservation={updateReservation}
          isUpdating={true}
          toggleModal={setIsEditModalOpen}
        />
      </Modal>
      <Modal isOpen={isCreateModalOpen} onClose={setIsCreateModalOpen}>
        <ReservationForm
          toggleModal={setIsCreateModalOpen}
          setState={setState}
        />
      </Modal>
      <Modal isOpen={isCancelModalOpen} onClose={setIsCancelModalOpen}>
        <Cancellation
          actionHandler={cancelReservationHandler}
          setOpen={setIsCancelModalOpen}
          title="Cancel Reservation	"
          warningMessage="Are you sure you want to cancel this reservation?"
          actionText="Cancel Reservation"
          cancelText="Go Back"
        />
      </Modal>
    </div>
  );
};

export default BookingManagement;
