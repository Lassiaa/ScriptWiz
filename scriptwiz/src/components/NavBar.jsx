import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useFileContext } from "../contexts/fileContext";

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);
  const { fileName } = useFileContext();

  useEffect(() => {
    renderNavItems();
  }, [fileName]);

  const renderNavItems = () => {
    if (fileName) {
    return (
      <>
      <button 
          onClick={() => {setMobileMenuOpen(!mobileMenuOpen);}}     data-collapse-toggle="navbar-default" 
          type="button"
          className="bg-blackbg inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-primary md:hidden hover:text-secondary duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg 
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div 
        className={`${mobileMenuOpen ? "hidden" : ""} w-full md:block md:w-auto md:h-full`} 
        id="navbar-default"
      >
        <ul className="md:h-full font-medium flex flex-col md:p-0 mt-4 md:flex-row rtl:space-x-reverse md:mt-0">
        <li className="md:h-full">
          <NavLink
            to="/overview"
            className={({ isActive }) =>
              `flex py-5 md:px-5 md:items-center md:h-full hover:text-white bg-gradient-to-r from-secondary via-blackbg to-blackbg from-50% via-0% bg-[length:201%_110%] bg-[position:right_center] hover:bg-[position:left_center] transition-all duration-500 ease-out ${
                isActive
                  ? "md:bg-transparent text-secondary font-bold"
                  : ""
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.04 16.5.5-1.5h6.42l.5 1.5H8.29Zm7.46-12a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0v-6Zm-3 2.25a.75.75 0 0 0-1.5 0v3.75a.75.75 0 0 0 1.5 0V9Zm-3 2.25a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="self-center whitespace-nowrap uppercase">
              Overview
            </span>
          </NavLink>
        </li>
        <li className="md:h-full">
          <NavLink
            to="/schedule"
            className={({ isActive }) =>
              `flex py-5 md:px-5 md:items-center md:h-full hover:text-white bg-gradient-to-r from-secondary via-blackbg to-blackbg from-50% via-0% bg-[length:201%_110%] bg-[position:right_center] hover:bg-[position:left_center] transition-all duration-500 ease-out ${
                isActive
                  ? "md:bg-transparent text-secondary font-bold"
                  : ""
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            <span className="self-center whitespace-nowrap uppercase">
              Schedule
            </span>
          </NavLink>
        </li>
        <li className="md:h-full">
          <NavLink
            to="/characters"
            className={({ isActive }) =>
              `flex py-5 md:px-5 md:items-center md:h-full hover:text-white bg-gradient-to-r from-secondary via-blackbg to-blackbg from-50% via-0% bg-[length:201%_110%] bg-[position:right_center] hover:bg-[position:left_center] transition-all duration-500 ease-out ${
                isActive
                  ? " text-secondary font-bold"
                  : ""
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <span className="self-center whitespace-nowrap uppercase">
              Characters
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
    </>
    
    )}
  };

  return (
    <nav className="px-6 md:h-[10vh] md:max-h-[100px] flex">
      <div className="mx-auto flex flex-wrap w-full justify-between items-center">
        <NavLink
          to="/"
          className="flex items-center p-4 space-x-3 rtl:space-x-reverse text-primary hover:text-secondary duration-300 font-primary"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 40 40"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5003 7.50015L18.7504 5.0001L21.2504 3.75007L18.7504 2.50005L17.5003 0L16.2503 2.50005L13.7503 3.75007L16.2503 5.0001L17.5003 7.50015ZM6.25012 12.5002L8.33298 8.33376L12.5002 6.25012L8.33298 4.16649L6.25012 0L4.16727 4.16649L0 6.25012L4.16727 8.33376L6.25012 12.5002ZM33.7507 22.5004L31.6678 26.6669L27.5005 28.7506L31.6678 30.8342L33.7507 35.0007L35.8335 30.8342L40.0008 28.7506L35.8335 26.6669L33.7507 22.5004ZM39.268 7.36186L32.6389 0.732827C32.1514 0.243755 31.5116 0 30.8717 0C30.2318 0 29.592 0.243755 29.1037 0.732827L0.732827 29.1037C-0.243755 30.0803 -0.243755 31.6631 0.732827 32.6389L7.36186 39.268C7.85015 39.7562 8.49001 40 9.12908 40C9.76894 40 10.4088 39.7562 10.8971 39.268L39.268 10.8963C40.2445 9.92129 40.2445 8.33766 39.268 7.36186ZM28.0826 15.8956L24.1052 11.9182L30.8709 5.15244L34.8483 9.12987L28.0826 15.8956Z"
            />
          </svg>
          <span className="self-center text-3xl font-bold whitespace-nowrap">
            ScriptWiz
          </span>
        </NavLink>

        {renderNavItems()}

        </div>
    </nav>
  );
}

export default NavBar;
