import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/header/NavBar";
import Footer from "./components/footer/Footer";
import HomePage from "./components/home/HomePage";
import Reviews from "./components/reviews/Reviews";
import ContactUs from "./components/contact/ContactUs";
import MyAccountPage from "./components/account/MyAccountPage";
import PagesEndPoints from "./utilities/constants/PagesEndpoints";
import ServicePage from "./components/services/ServicePage";
import EventsPage from "./components/event/EventsPage";
import AboutPage from "./components/about/AboutPage";
import BookingPage from "./components/booking/BookingPage";
import AppointmentForm from "./components/appointment/AppointmentForm";
import ReservationForm from "./components/reservation/ReservationForm";
import NotFoundPage from "./components/home/NoFoundPage";
import EventCard from "./components/event/EventCard";
import UserProfile from "./components/account/UserProfile";
import AppointmentManagement from "./components/account/AppointmentManagement";
import BookingManagement from "./components/account/BookingManagement";
import InvoicesManagement from "./components/account/InvoicesManagement";
import {
  APPOINTMENTS,
  INVOICES,
  RESERVATIONS,
  USER_PROFILE,
} from "./utilities/constants/AccountScreen";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path={PagesEndPoints.ACCOUNT_PAGE_URL}
          element={<MyAccountPage />}
        >
          <Route index element={<UserProfile />} />
          <Route path={USER_PROFILE} element={<UserProfile />} />
          <Route path={APPOINTMENTS} element={<AppointmentManagement />} />
          <Route path={RESERVATIONS} element={<BookingManagement />} />
          <Route path={INVOICES} element={<InvoicesManagement />} />
        </Route>
        <Route path={PagesEndPoints.REVIEWS_PAGE_URL} element={<Reviews />} />
        <Route path={PagesEndPoints.CONTACT_PAGE_URL} element={<ContactUs />} />
        <Route
          path={PagesEndPoints.SERVICES_PAGE_URL}
          element={<ServicePage />}
        />
        <Route path={PagesEndPoints.EVENT_PAGE_URL} element={<EventsPage />} />
        <Route
          path={`${PagesEndPoints.EVENT_PAGE_URL}/:id`}
          element={<EventCard />}
        />
        <Route path={PagesEndPoints.ABOUT_PAGE_URL} element={<AboutPage />} />
        <Route path={PagesEndPoints.BOOKING_PAGE_URL} element={<BookingPage />}>
          <Route index element={<AppointmentForm />} />
          <Route path={APPOINTMENTS} element={<AppointmentForm />} />
          <Route path={RESERVATIONS} element={<ReservationForm />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
