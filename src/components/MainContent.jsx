import React from "react";
import HowToUse from "./HowToUse";

const MainContent = ({
  activeView,
  donators,
  requesters,
  wasteData,
  handleInputChange,
  handleSubmit,
  onAccept,
  toggleSidebar,
  userName,
  fromAuth2,
}) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-white md:ml-64">
      <button onClick={toggleSidebar} className="md:hidden fixed top-9 left-5 z-10">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
      </button>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-80 md:w-100 pl-7">
          <input
            type="text"
            placeholder="Search Location"
            className="block w-full p-2 pl-4 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-gray-200 hover:bg-gray-500 border border-black p-2 rounded-full transition duration-300 flex items-center justify-center w-13 h-13">
            <span className="text-gray-700 font-medium mb-1 text-5xl">{userName?.charAt(0)}</span>
          </button>
        </div>
      </div>

      {activeView === "overview" && (
        <div>
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold mb-2">Overview</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p>Donations</p>
                <p className="text-lg font-bold">{donators.length}</p>
              </div>
              <div>
                <p>Requests</p>
                <p className="text-lg font-bold">{requesters.length}</p>
              </div>
            </div>
          </div>
          <div>
            <HowToUse />
          </div>
        </div>
      )}

      {(activeView === "donators" || activeView === "requesters") && !fromAuth2 && (
        <div className="bg-white p-4 rounded shadow-md mt-4">
          <h3 className="text-xl font-bold mb-2">
            {activeView === "donators" ? "Donators List" : "Requesters List"}
          </h3>
          {(activeView === "donators" ? donators : requesters).map((member) => (
            <div key={member.id} className="border rounded p-4 mb-4">
              <p className="font-bold">{member.name}</p>
              <p>{member.location}</p>
              <p>{member.email}</p>
              <p>{member.timePeriod}</p>
              <p>{member.category}</p>
              <p className="italic">{member.description}</p>
              <button
                onClick={() => onAccept(member, activeView === "donators" ? "donation" : "request")}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Accept
              </button>
            </div>
          ))}
        </div>
      )}

      {(activeView === "addDonation" || activeView === "addRequest") && !fromAuth2 && (
        <div className="bg-white p-4 rounded shadow-md mt-4 px-20">
          <h3 className="text-xl font-bold mb-2">{activeView === "addDonation" ? "Add Donation" : "Add Request"}</h3>
          <form onSubmit={handleSubmit}>
            {["name", "email", "location", "timePeriod", "description"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                onChange={handleInputChange}
                className="border rounded px-3 py-2 mb-2 w-full"
                required
              />
            ))}
            <select name="category" onChange={handleInputChange} className="border rounded px-3 py-2 mb-2 w-full">
              <option value="category">Select category</option>
              <option value="ngo">NGO</option>
              <option value="individual">Individual</option>
              <option value="orphanage">Orphanage</option>
            </select>
            <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
              Submit
            </button>
            </div>
          </form>
        </div>
      )}

      {fromAuth2 && (
        <>
          {activeView === "viewWaste" && (
            <div className="bg-white p-4 rounded shadow-md mt-4">
              <h3 className="text-xl font-bold mb-2">Waste List</h3>
              {wasteData.map((member) => (
                <div key={member.id} className="border rounded p-4 mb-4">
                  <p className="font-bold">{member.name}</p>
                  <p>{member.location}</p>
                  <p>{member.email}</p>
                  <p>{member.timePeriod}</p>
                  <p>{member.category}</p>
                  <p className="italic">{member.description}</p>
                  <button
                    onClick={() => onAccept(member, "waste")}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Collect
                  </button>
                </div>
              ))}
            </div>
          )}
          {activeView === "addWaste" && (
            <div className="bg-white p-4 rounded shadow-md mt-4">
              <h3 className="text-xl font-bold mb-2">Add Waste</h3>
              <form onSubmit={handleSubmit}>
                {["name", "email", "location", "timePeriod", "description"].map((field) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    onChange={handleInputChange}
                    className="border rounded px-3 py-2 mb-2 w-full"
                    required
                  />
                ))}
                <select name="category" onChange={handleInputChange} className="border rounded px-3 py-2 mb-2 w-full">
                  <option value="category">Select category</option>
                  <option value="ngo">NGO</option>
                  <option value="individual">Individual</option>
                  <option value="orphanage">Orphanage</option>
                </select>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
              </form>
            </div>
          )}
          
        </>
      )}
    </div>
  );
};

export default MainContent;