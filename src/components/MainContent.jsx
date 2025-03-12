import React, { useState } from "react";
import HowToUse from "./HowToUse";
import AboutUs from "./AboutUs";
import Auth from "./Auth";

const MainContent = ({
  activeView,
  donators,
  requesters,
  wasteData,
  formData,
  handleInputChange,
  handleSubmit,
  onAccept,
  onDeny,
  toggleSidebar,
  userName,
  userRole,
  handleLogin,
  fromAuth2,
}) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="flex-1 p-4 bg-gray-50 md:ml-64">
      <button onClick={toggleSidebar} className="md:hidden fixed top-4 left-4 z-10 p-2 bg-white rounded-lg shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
        </svg>
      </button>

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          {userRole !== 'admin' && (
            <button
              onClick={handleLoginClick}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-2 px-6 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Login as Administrator
            </button>
          )}
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
            userRole === 'admin' 
              ? 'bg-purple-100 text-purple-700' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {userRole === 'admin' ? 'Administrator Mode' : 'Guest Mode'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="text-white font-semibold text-lg">{userName?.charAt(0)}</span>
          </div>
        </div>
      </div>

      {activeView === "overview" && (
        <div className="space-y-6">
          {userRole !== 'admin' && (
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-900 mb-1">Administrator Access</h3>
                  <p className="text-purple-700 mb-4">Login as an administrator to manage and approve recipient requests.</p>
                  <button
                    onClick={handleLoginClick}
                    className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-all duration-300 text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login Now
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Overview</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <p className="text-gray-700 font-medium mb-2">Donations</p>
                <p className="text-3xl font-bold text-blue-600">{donators.length}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <p className="text-gray-700 font-medium mb-2">Requests</p>
                <p className="text-3xl font-bold text-green-600">{requesters.length}</p>
              </div>
            </div>
          </div>
          <HowToUse />
        </div>
      )}

      {activeView === "aboutUs" && (
        <AboutUs setActiveView={(view) => setActiveView(view)} />
      )}

      {(activeView === "donators" || activeView === "requesters") && !fromAuth2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {activeView === "donators" ? "Donators List" : "Requesters List"}
          </h3>
          <div className="grid gap-4">
            {(activeView === "donators" ? donators : requesters).map((member) => (
              <div key={member.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-semibold text-gray-800">{member.name}</h4>
                    {activeView === "requesters" && userRole === "admin" && (
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          member.status === 'approved' ? 'bg-green-100 text-green-800' :
                          member.status === 'denied' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      {member.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      {member.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      {member.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {member.timePeriod}
                    </p>
                    <p className="inline-block bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 rounded-full font-medium text-gray-700">{member.category}</p>
                  </div>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{member.description}</p>
                  <div className="flex gap-2 mt-4">
                    {activeView === "requesters" && userRole === "admin" && member.status === "pending" && (
                      <>
                        <button
                          onClick={() => onAccept(member, "request")}
                          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onDeny(member.id)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          Deny
                        </button>
                      </>
                    )}
                    {activeView === "donators" && userRole === "admin" && (
                      <button
                        onClick={() => onAccept(member, "donation")}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        Accept Donation
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === "addDonation" && !fromAuth2 && (
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6">Add Donation</h3>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Restaurant or Organization Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="contact@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="Contact Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                placeholder="Full Address"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="timePeriod" className="block text-sm font-medium text-gray-700 mb-1">
                Time Period
              </label>
              <input
                id="timePeriod"
                name="timePeriod"
                type="text"
                required
                placeholder="e.g., Daily after 9 PM"
                value={formData.timePeriod}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select 
                id="category"
                name="category" 
                required
                value={formData.category}
                onChange={handleInputChange} 
                className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Hotel">Hotel</option>
                <option value="Catering">Catering Service</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                placeholder="Describe the type of food items available for donation"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-6 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Submit Donation
            </button>
          </form>
        </div>
      )}

      {(activeView === "addRequest") && !fromAuth2 && (
        <div className="max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-4">Add Request</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email", "location", "timePeriod", "description"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            ))}
            <select 
              name="category" 
              onChange={handleInputChange} 
              className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="category">Select category</option>
              <option value="ngo">NGO</option>
              <option value="individual">Individual</option>
              <option value="orphanage">Orphanage</option>
            </select>
            <button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {fromAuth2 && (
        <>
          {activeView === "viewWaste" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Waste List</h3>
              <div className="grid gap-4">
                {wasteData.map((member) => (
                  <div key={member.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <h4 className="font-semibold">{member.name}</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{member.location}</p>
                        <p>{member.email}</p>
                        <p>{member.timePeriod}</p>
                        <p className="inline-block bg-gray-100 px-2 py-1 rounded">{member.category}</p>
                      </div>
                      <p className="text-gray-700">{member.description}</p>
                      <button
                        onClick={() => onAccept(member, "waste")}
                        className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        Collect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeView === "addWaste" && (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold mb-4">Add Waste</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {["name", "email", "location", "timePeriod", "description"].map((field) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                ))}
                <select 
                  name="category" 
                  onChange={handleInputChange} 
                  className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="category">Select category</option>
                  <option value="ngo">NGO</option>
                  <option value="individual">Individual</option>
                  <option value="orphanage">Orphanage</option>
                </select>
                <button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </>
      )}

      {showAuthModal && (
        <Auth
          onLogin={handleLogin}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
};

export default MainContent;