import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import { NavLink, Outlet } from "react-router-dom";
import {
  ACCOUNT_PAGE_URL,
  PROFILE_PAGE_URL,
  APPOINTMENTS_PAGE_URL,
  RESERVATIONS_PAGE_URL,
  INVOICES_PAGE_URL,
} from "../constants/PagesEndpoints";

const drawerWidth = 200;

const pages = {
  profile: {
    title: "Profile",
    icon: <AccountCircleRoundedIcon fontSize="large" />,
    url: `${ACCOUNT_PAGE_URL}${PROFILE_PAGE_URL}`,
  },
  appointment: {
    title: "Appointment",
    icon: <CalendarTodayIcon fontSize="large" />,
    url: `${ACCOUNT_PAGE_URL}${APPOINTMENTS_PAGE_URL}`,
  },
  reservation: {
    title: "Reservation",
    icon: <EventAvailableIcon fontSize="large" />,
    url: `${ACCOUNT_PAGE_URL}${RESERVATIONS_PAGE_URL}`,
  },
  invoice: {
    title: "Invoice",
    icon: <DescriptionRoundedIcon fontSize="large" />,
    url: `${ACCOUNT_PAGE_URL}${INVOICES_PAGE_URL}`,
  },
};

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 4px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  zIndex: 0,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  marginTop: theme.spacing(8),
  justifyContent: "flex-end",
}));

const PersistentDrawer = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader theme={theme}>
          {open ? (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerOpen}>
              <ChevronRightIcon />
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        <List>
          {Object.keys(pages).map((page) => (
            <ListItem key={page} disablePadding>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-blue-700 bg-blue-200 w-full" : ""
                }
                to={pages[page].url}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {pages[page].icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={pages[page].title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, pb: 1 }}>
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default PersistentDrawer;
