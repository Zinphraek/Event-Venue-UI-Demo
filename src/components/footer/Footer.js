import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PagesEndpoints from "../../utilities/constants/PagesEndpoints";

const pages = [
  { title: "About", pageUrl: PagesEndpoints.ABOUT_PAGE_URL },
  { title: "Services", pageUrl: PagesEndpoints.SERVICES_PAGE_URL },
  { title: "Events", pageUrl: PagesEndpoints.EVENT_PAGE_URL },
  { title: "Contact Us", pageUrl: PagesEndpoints.CONTACT_PAGE_URL },
  { title: "Book Now", pageUrl: PagesEndpoints.BOOKING_PAGE_URL },
  { title: "Reviews", pageUrl: PagesEndpoints.REVIEWS_PAGE_URL },
];

const socialMedia = [
  {
    name: "Facebook",
    imgUrl: "/assets/icons/facebook_icon.svg",
    pageUrl: "https://www.facebook.com/Le-Prestige-Hall-100183814879812",
  },
  {
    name: "Twitter",
    imgUrl: "/assets/icons/twitter_icon.svg",
    pageUrl: "https://www.twitter.com/le_prestige_hall",
  },
  {
    name: "Instagram",
    imgUrl: "/assets/icons/instagram_icon.svg",
    pageUrl: "https://www.instagram.com/le_prestige_hall",
  },
  {
    name: "LinkedIn",
    imgUrl: "/assets/icons/linkedin_icon.svg",
    pageUrl: "https://www.linkedin.com/le_prestige_hall",
  },
];

const Footer = () => {
  const location = useLocation();
  const isAccountPage = location.pathname.includes(
    PagesEndpoints.ACCOUNT_PAGE_URL
  );
  const thisYear = new Date().getFullYear();
  return (
    <footer className={`bg-gray-800 ${isAccountPage ? "hidden" : ""}`}>
      {/*container*/}
      <div className="container max-w-6xl py-3 mx-auto">
        {/*Footer flex conatainer*/}
        <div
          className="flex flex-col items-center mb-8 space-y-6 md:flex-row
          md:space-y-0 md:justify-between md:items-start"
        >
          {/*Menu container*/}
          <div className="flex flex-col items-center space-y-8 md:items-start md:space-y-4">
            {/*logo container*/}
            <div className="h-8">
              <NavLink key="footerLogo" to={PagesEndpoints.HOME_PAGE_URL}>
                <img
                  className="rounded-full h-14 w-14 hover:rounded-full 
                      transition ease-in-out delay-50 hover:-translate-y-1
                      hover:scale-110 duration-100 md:ml-3"
                  src="/assets/images/le_prestige_hall_logo.png"
                  alt="Le Prestige Hall"
                />
              </NavLink>
            </div>

            {/*menu container small screen*/}
            <div className="md:hidden grid grid-rows-2 grid-cols-3 items-center justify-between font-bold text-white gap-2">
              {pages.map((page) => (
                <div key={`footer-${page.title}`} className="h-10 group">
                  <NavLink to={page.pageUrl}>{page.title}</NavLink>
                  <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
                </div>
              ))}
            </div>

            {/*menu container medium screen*/}
            <div className="hidden md:block">
              <div
                className="flex flex-col items-center space-y-4 font-bold 
              text-white md:flex-row md:space-y-0 md:space-x-6 md:ml-0 md:pt-2"
              >
                {pages.map((page) => (
                  <div key={`footer-${page.title}`} className="h-10 group">
                    <NavLink to={page.pageUrl}>{page.title}</NavLink>
                    <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/*Social media container*/}
          <div className="flex flex-col items-center justify-between space-y-4 text-gray-500 md:items-start">
            {/*icons container*/}
            <div className="flex items-center justify-center mx-auto space-x-4 md:justify-end md:mx-0">
              {socialMedia.map((medium) => (
                <div key={medium.name} className="h-8 group">
                  <NavLink
                    to={medium.pageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={medium.imgUrl}
                      alt={medium.name}
                      className="h-6 transition ease-in-out delay-50 hover:-translate-y-1
                      hover:scale-110 duration-100 md:ml-3"
                    />
                  </NavLink>
                </div>
              ))}
            </div>

            {/*Copy right */}
            <div className="flex justify-center items-center">
              <div className="font-bold px-6 py-2 md:px-4">
                &copy;{" "}
                {`2019-${thisYear}, Le Prestige Hall, Inc. All Rights Reserved`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
