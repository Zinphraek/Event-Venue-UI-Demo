import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import FacilityConstants from "../constants/FacilityConstants";

export const statusIcon = {
  [FacilityConstants.STATUS.BOOKED]: {
    style: "text-white bg-blue-500 shadow-sm shadow-gray-500",
    icon: <CheckRoundedIcon fontSize="small" />,
  },
  [FacilityConstants.STATUS.DONE]: {
    style: "text-white bg-green-500 shadow-sm shadow-gray-500",
    icon: <DoneAllRoundedIcon fontSize="small" />,
  },
  [FacilityConstants.STATUS.CANCELLED]: {
    style: "text-white bg-red-500 shadow-sm shadow-gray-500",
    icon: <ErrorOutlineRoundedIcon fontSize="small" />,
  },
  [FacilityConstants.STATUS.PENDING]: {
    style: "text-white bg-yellow-500 shadow-sm shadow-gray-500",
    icon: <AutorenewRoundedIcon fontSize="small" />,
  },
  [FacilityConstants.STATUS.REQUESTED]: {
    style: "text-white bg-yellow-500 shadow-sm shadow-gray-500",
    icon: <CheckRoundedIcon fontSize="small" />,
  },
  [FacilityConstants.INVOICE_STATUS.WITHDWAWN]: {
    style: "text-white bg-red-500 shadow-sm shadow-gray-500",
    icon: <RemoveCircleRoundedIcon fontSize="small" />,
  },
  [FacilityConstants.INVOICE_STATUS.PAID]: {
    style: "text-white bg-green-500 shadow-sm shadow-gray-500",
    icon: <DoneAllRoundedIcon fontSize="small" />,
  },
  [FacilityConstants.INVOICE_STATUS.DUE]: {
    style: "text-white bg-yellow-500 shadow-sm shadow-gray-500",
    icon: <ErrorOutlineRoundedIcon fontSize="small" />,
  },
  [FacilityConstants.INVOICE_STATUS.OVERDUE]: {
    style: "text-white bg-red-500 shadow-sm shadow-gray-500",
    icon: <ErrorOutlineRoundedIcon fontSize="small" />,
  },
  [FacilityConstants.INVOICE_STATUS.PARTIALLY_PAID]: {
    style: "text-white bg-blue-500 shadow-sm shadow-gray-500",
    icon: <CheckRoundedIcon fontSize="small" />,
  },
};
