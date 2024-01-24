import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import PagesEndpoints from "../../utilities/constants/PagesEndpoints";
import KeycloakService from "../config/KeycloakService";
import { useUserRefresh } from "../user/UserProvider";
import { NavLink, useLocation } from "react-router-dom";

const navigation = [
  { title: "About", url: PagesEndpoints.ABOUT_PAGE_URL, current: false },
  { title: "Services", url: PagesEndpoints.SERVICES_PAGE_URL, current: false },
  { title: "Events", url: PagesEndpoints.EVENT_PAGE_URL, current: false },
  { title: "Contact Us", url: PagesEndpoints.CONTACT_PAGE_URL, current: false },
  { title: "Book Now", url: PagesEndpoints.BOOKING_PAGE_URL, current: false },
];

const userMenu = [{ title: "Account", url: PagesEndpoints.ACCOUNT_PAGE_URL }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = () => {
  const location = useLocation();
  const setFetchUserFlag = useUserRefresh();
  const activateNotifications = false;
  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <NavLink key="logoOnMobile" to={PagesEndpoints.HOME_PAGE_URL}>
                    <img
                      className="rounded-full h-14 w-14 lg:hidden hover:rounded-full 
                      transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-100"
                      src="/assets/images/le_prestige_hall_logo.png"
                      alt="Le Prestige Hall"
                    />
                  </NavLink>

                  <NavLink
                    key="logoOnLargeScreen"
                    to={PagesEndpoints.HOME_PAGE_URL}
                  >
                    <img
                      className="hidden h-14 w-auto lg:block hover:rounded-full 
                      transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-100"
                      src="/assets/images/le_prestige_hall_logo.png"
                      alt="Le Prestige Hall"
                    />
                  </NavLink>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.title}
                        to={item.url}
                        className={({ isActive }) =>
                          `text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-3 rounded-md text-sm font-medium pb-2 pt-2 mt-2 ${
                            isActive ? "bg-gray-700 text-white" : ""
                          }`
                        }
                      >
                        {item.title}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {KeycloakService.isLoggedIn() ? (
                  <>
                    {activateNotifications && (
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    )}

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="/assets/images/icon-profile.png"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="flex flex-col items-start justify-center">
                            {userMenu.map((menuItem) => (
                              <Menu.Item key={menuItem.title}>
                                <div className="hover:bg-gray-100 w-full">
                                  <NavLink
                                    to={menuItem.url}
                                    className={({ isActive }) =>
                                      `block px-4 py-2 text-sm text-gray-700 ${
                                        isActive ? "bg-gray-100" : ""
                                      } hover:bg-gray-100`
                                    }
                                  >
                                    {menuItem.title}
                                  </NavLink>
                                </div>
                              </Menu.Item>
                            ))}
                          </div>

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                type="button"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 w-28 text-sm text-gray-700"
                                )}
                                onClick={() =>
                                  KeycloakService.doLogout(location)
                                }
                              >
                                <p className="text-left">Sign out</p>
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <button
                    type="button"
                    className="block outline-none sm:bg-indigo-600 px-4 py-2 font-semibold text-md rounded-full text-white sm:hover:bg-indigo-400"
                    onClick={() => KeycloakService.doLogin(setFetchUserFlag)}
                  >
                    <p className="text-left">Sign in</p>
                  </button>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="flex flex-col space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <NavLink
                  key={`${item.title}-mobile`}
                  as="a"
                  to={item.url}
                  className={({ isActive }) =>
                    `text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-3 rounded-md text-sm font-medium pb-2 pt-2 mt-2 ${
                      isActive ? "bg-gray-700 text-white" : ""
                    }`
                  }
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.title}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
