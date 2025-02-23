import React from "react";

const Sidebar = ({
    userName,
    onLogOut,
    onViewChange,
    isSidebarVisible,
    toggleSidebar,
}) => {
    return (
        <div
            className={`w-64 bg-white p-4 shadow-md transition-transform duration-300 md:block ${
                isSidebarVisible? "translate-x-0": "-translate-x-full"
            } fixed top-0 left-0 h-full flex flex-col md:translate-x-0 z-30`}
        >
            {/* Mobile close button */}
            <button
                onClick={toggleSidebar}
                className="md:hidden absolute top-5 right-2 z-20 p-1 bg-gray-100 rounded-xl"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <h2 className="text-2xl font-bold mb-6 text-green-500 text-left">
                {userName? userName: "Guest"}
            </h2>
            <ul className="flex-grow">
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