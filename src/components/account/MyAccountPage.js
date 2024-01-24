import React from "react";
import { ToastContainer } from "react-toastify";
import KeycloakService from "../config/KeycloakService";
import { useUserRefresh } from "../user/UserProvider";
import PagesEndPoints from "../../utilities/constants/PagesEndpoints";
import { NavLink } from "react-router-dom";
import PersistentDrawer from "../../utilities/components/PersistentDrawer";
import { Container } from "@mui/material";

const MyAccountPage = () => {
  const setFetchUserFlag = useUserRefresh();
  const singIn = async () => {
    await KeycloakService.doLogin(setFetchUserFlag);
  };

  return (
    <>
      {KeycloakService.isLoggedIn() ? (
        <div className="flex items-center z-0 justify-center min-h-screen">
          <Container maxWidth="xl" sx={{ zIndex: 0 }}>
            <div className="flex flex-grow flex-col min-h-screen">
              <PersistentDrawer />
            </div>
            <ToastContainer />
          </Container>
        </div>
      ) : (
        <div
          style={{
            backgroundImage: "url('/assets/images/lock2.png')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "91vh",
          }}
          className="flex justify-between text-center p-4 h-screen lg:p-16"
        >
          <div className="text-2xl text-center">
            <button
              onClick={() => singIn()}
              className="rounded-full text-indigo-600 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:text-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
            <span className="text-gray-900 text-sm"> to continue.</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-x-6">
              <NavLink
                to={PagesEndPoints.HOME_PAGE_URL}
                className="rounded-full text-indigo-600 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:text-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </NavLink>
              <NavLink
                to={PagesEndPoints.CONTACT_PAGE_URL}
                className="text-sm font-semibold text-gray-900"
              >
                Contact support <span aria-hidden="true">&rarr;</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyAccountPage;
