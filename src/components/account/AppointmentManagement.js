import React, { useState, useEffect } from "react";
import { EntitiesListResponseModel } from "../../utilities/models/EntitiesListResponseModel";
import {
  cancelAppointment,
  getAppointmentsByUserId,
  updateAppointment,
} from "../appointment/AppointmentServices";
import { formatDateTime } from "../../utilities/functions/Helpers";
import FacilityConstants from "../../utilities/constants/FacilityConstants";
import KeycloakService from "../config/KeycloakService";
import { AppointmentModel } from "../../utilities/models/AppointmentModel";
import Modal from "../../utilities/components/Modal";
import AppointmentForm from "../appointment/AppointmentForm";
import Cancellation from "../../utilities/components/Cancellation";
import AppointmentDetailsView from "../appointment/AppointmentDetailsView";
import { useLoadingSpinner } from "../../utilities/components/LoadingSpinnerProvider";
import { Button, Tooltip } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { statusIcon } from "../../utilities/models/General";
import CustomDataTable from "../../utilities/components/CustomDataTable";

const AppointmentManagement = () => {
  const setIsLoading = useLoadingSpinner();
  const [state, setState] = useState(false);
  const [objectId, setObjectId] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [params, setParams] = useState({ pageSize: 10, page: 0 });
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [appointment, setAppointment] = useState(AppointmentModel);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [appointments, setAppointments] = useState(EntitiesListResponseModel);

  const lunchDetailsViewModal = (appointment) => {
    setAppointment(appointment);
    setIsViewModalOpen(true);
  };

  const lunchEditionModal = (appointment) => {
    setAppointment(appointment);
    setIsEditModalOpen(true);
  };

  const lunchCancellationModal = (id) => {
    setObjectId(id);
    setIsCancelModalOpen(true);
  };

  const cancelAppointmentHandler = async () => {
    setIsLoading(true);
    await cancelAppointment(objectId, setState, setIsLoading, setApiError);
    !apiError && setIsCancelModalOpen(false);
  };

  const headerColumnsArray = [
    {
      field: "id",
      headerName: "Details",
      width: 120,
      renderCell: (params) => {
        return (
          <Tooltip title="View this appointment">
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
      field: "dateTime",
      headerName: "Date and Time",
      width: 170,
      valueFormatter: (params) => formatDateTime(params?.value),
    },
    {
      field: "raison",
      headerName: "Reason",
      width: 200,
    },
    {
      field: "additionalInfo",
      headerName: "Additional Information",
      width: 300,
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
      width: 210,
      sortable: false,
      renderCell: (params) => {
        const value = params?.value;
        const isInThePast = new Date(params?.row?.dateTime) < new Date();
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
            <Tooltip title="Edith this appointment">
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
            <Tooltip title="Cancel this appointment">
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
    getAppointmentsByUserId(
      setAppointments,
      KeycloakService.getUserId(),
      setIsLoading,
      setApiError,
      params
    );
  }, [
    state,
    isCreateModalOpen,
    isEditModalOpen,
    isCancelModalOpen,
    setIsLoading,
    params,
  ]);

  return (
    <div className="container z-0 max-w-xs md:max-w-6xl mr-2 top-16 absolute">
      <div className="flex flex-row justify-between items-baseline">
        <h2 className="text-normal md:text-xl text-blue-500 uppercase mb-4 pl-1">
          Appointments
        </h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 text-sm text-white m-4 mr-0 px-2 py-2 rounded uppercase flex flex-row space-x-1"
        >
          <AddRoundedIcon />
          <span className="hidden md:block">Schedule An Appointment</span>
        </button>
      </div>
      <CustomDataTable
        headerColumn={headerColumnsArray}
        paginationModel={params}
        rows={appointments}
        setPaginationModel={setParams}
      />
      <Modal
        isOpen={isViewModalOpen}
        onClose={setIsViewModalOpen}
        maxModalWidth={"sm:max-w-4xl"}
      >
        <AppointmentDetailsView
          toggleModal={setIsViewModalOpen}
          appointment={appointment}
        />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={setIsEditModalOpen}>
        <AppointmentForm
          appointment={appointment}
          updateAppointment={updateAppointment}
          isUpdating={true}
          setState={setState}
          toggleModal={setIsEditModalOpen}
        />
      </Modal>
      <Modal isOpen={isCreateModalOpen} onClose={setIsCreateModalOpen}>
        <AppointmentForm
          toggleModal={setIsCreateModalOpen}
          setState={setState}
        />
      </Modal>
      <Modal isOpen={isCancelModalOpen} onClose={setIsCancelModalOpen}>
        <Cancellation
          actionHandler={cancelAppointmentHandler}
          setOpen={setIsCancelModalOpen}
          title="Cancel Appointment	"
          warningMessage="Are you sure you want to cancel this appointment? This action cannot be undone. However, you can always schedule a new appointment."
          actionText="Cancel Appointment"
          cancelText="Go Back"
        />
      </Modal>
    </div>
  );
};

export default AppointmentManagement;
