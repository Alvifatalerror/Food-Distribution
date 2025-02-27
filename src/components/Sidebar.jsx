import React from "react";

const Sidebar = ({
  userName,
  onLogOut,
  onViewChange,
  isSidebarVisible,
  toggleSidebar,
  fromAuth2,
}) => {
  return (
    <div
      className={`w-64 bg-white p-4 shadow-md transition-transform duration-300 md:block ${
        isSidebarVisible ? "translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 h-full flex flex-col md:translate-x-0 z-30`}
    >
      <button
        onClick={toggleSidebar}
        className="md:hidden absolute top-5 right-2 z-20 p-1 bg-gray-100 rounded-xl"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
      </button>

      <h2 className="text-2xl font-bold mb-6 text-green-500 text-left">
        {userName ? userName : "Guest"}
      </h2>
      <ul className="flex-grow">
        {fromAuth2 ? (
          <>
            <li className="mb-2">
              <button
                onClick={() => onViewChange("viewWaste")}
                className="w-full text-left p-2 rounded transition duration-300 font-medium text-gray-700 hover:bg-gray-100 hover:text-green-500"
              >
                View Waste
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => onViewChange("addWaste")}
                className="w-full text-left p-2 rounded transition duration-300 font-medium text-gray-700 hover:bg-gray-100 hover:text-green-500"
              >
                Add Waste
              </button>
            </li>
            
          </>
        ) : (
          <>
            <li className="mb-2">
              <button
                onClick={() => onViewChange("overview")}
                className="w-full text-left p-2 rounded transition duration-300 font-medium text-gray-700 hover:bg-gray-100 hover:text-green-500"
              >
                Overview
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => onViewChange("donators")}
                className="w-full text-left p-2 rounded transition duration-300 font-medium text-gray-700 hover:bg-gray-100 hover:text-green-500"
              >
                View Donations
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => onViewChange("requesters")}
                className="w-full text-left p-2 rounded transition duration-300 font-medium text-gray-700 hover:bg-gray-100 hover:text-green-500"
              >
                View Requests
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => onViewChange("addDonation")}
                className="w-full text-left p-2 rounded transition duration-300 font-medium text-gray-700 hover:bg-gray-100 hover:text-green-500"
              >
                Add Donation
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => onViewChange("addRequest")}
                className="w-full text-left p-2 rounded transition duration-300 font-medium text-gray-700 hover:bg-gray-100 hover:text-green-500"
              >
                Add Request
              </button>
            </li>
          </>
        )}
      </ul>
      <div className="mt-auto border-t border-gray-200 pt-4">
        <button
          onClick={onLogOut}
          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;