import React, { useState } from 'react';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [donators, setDonators] = useState([
    { id: 1, name: "John Doe", location: "New York", email: "john.doe@example.com", timePeriod: "Jan 2024 - Dec 2024", description: "A generous donor." },
    { id: 2, name: "Jane Smith", location: "London", email: "jane.smith@example.com", timePeriod: "Feb 2024 - Nov 2024", description: "Passionate about education." }
  ]);
  const [requesters, setRequesters] = useState([
    { id: 3, name: "ABC Orphanage", location: "Mumbai", email: "abc@example.com", timePeriod: "Ongoing", description: "Needs books and supplies." },
    { id: 4, name: "XYZ School", location: "Delhi", email: "xyz@example.com", timePeriod: "Ongoing", description: "Seeking sports equipment." }
  ]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    timePeriod: '',
    description: '',
    category: '',
  });
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleViewChange = (view) => {
    setActiveView(view);
    setIsSidebarVisible(false); // Close sidebar on selection (mobile)
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the formData to your backend
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`w-64 bg-white p-4 shadow-md transition-transform duration-300 md:block ${
          isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 h-full z-10 flex flex-col md:translate-x-0`}
      >
        {/* Mobile close button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden absolute top-2 right-2 z-20 p-1"
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

        <h2 className="text-2xl font-bold mb-6 text-green-500 text-center">
          Deep Park South
        </h2>
        <ul className="flex-grow">
          <li className="mb-2">
            <button
              onClick={() => handleViewChange('overview')}
              className="w-full text-left p-2 rounded transition duration-300 font-medium text-gray-700 hover:bg-gray-100 hover:text-green-500"
            >
              Overview
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => handleViewChange('donators')}
              className="w-full text-left p-2 rounded transition duration-300 font-medium text-gray-700 hover:bg-gray-100 hover:text-green-500"
            >
              View Donations
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => handleViewChange('requesters')}
              className="w-full text-left p-2 rounded transition duration-300 font-medium text-gray-700 hover:bg-gray-100 hover:text-green-500"
            >
              View Requests 
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => handleViewChange('addDonation')}
              className="w-full text-left p-2 rounded transition duration-300 font-medium text-gray-700 hover:bg-gray-100 hover:text-green-500"
            >
              Add Donation
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => handleViewChange('addRequest')}
              className="w-full text-left p-2 rounded transition duration-300 font-medium text-gray-700 hover:bg-gray-100 hover:text-green-500"
            >
              Add Request
            </button>
          </li>
        </ul>
        <div className="mt-auto border-t border-gray-200 pt-4">
          <button className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-white md:ml-64"> {/* Added md:ml-64 */}
        {/* Mobile menu icon (smaller icon) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-2 left-2 z-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex justify-between items-center mb-6">
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search Location"
              className="block w-full p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="relative hover:text-gray-600 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.657V5a2 2 0 10-4 0v.343C7.67 6.165 6 8.388 6 11v3.158c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
            </a>
            <button className="hover:bg-gray-200 p-2 rounded-full transition duration-300 flex items-center justify-center w-8 h-8">
              <span className="text-gray-700 font-medium">JD</span>
            </button>
          </div>
        </div>
        {activeView === 'overview' && (
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold mb-2">Overview</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p>Accepted Donations</p>
                <p className="text-lg font-bold">120</p>
              </div>
              <div>
                <p>Accepted Requests</p>
                <p className="text-lg font-bold">85</p>
              </div>
              <div>
                <p>Pending Response</p>
                <p className="text-lg font-bold">35</p>
              </div>
            </div>
          </div>
        )}

        {(activeView === 'donators' || activeView === 'requesters') && (
          <div className="bg-white p-4 rounded shadow-md mt-4">
            <h3 className="text-xl font-bold mb-2">
              {activeView === 'donators' ? 'Donators List' : 'Requesters List'}
            </h3>
            {(activeView === 'donators' ? donators : requesters).map((member) => (
              <div key={member.id} className="border rounded p-4 mb-4">
                <p className="font-bold">{member.name}</p>
                <p>{member.location}</p>
                <p>{member.email}</p>
                <p>{member.timePeriod}</p>
                <p className="italic">{member.description}</p>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">Accept</button>
              </div>
            ))}
          </div>
        )}

        {(activeView === 'addDonation' || activeView === 'addRequest') && (
          <div className="bg-white p-4 rounded shadow-md mt-4">
            <h3 className="text-xl font-bold mb-2">
              {activeView === 'addDonation' ? 'Add Donation' : 'Add Request'}
            </h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" onChange={handleInputChange} className="border rounded px-3 py-2 mb-2 w-full" required />
              <input type="email" name="email" placeholder="Email" onChange={handleInputChange} className="border rounded px-3 py-2 mb-2 w-full" required />
              <input type="text" name="location" placeholder="Location" onChange={handleInputChange} className="border rounded px-3 py-2 mb-2 w-full" required />
              <input type="text" name="timePeriod" placeholder="Time Period" onChange={handleInputChange} className="border rounded px-3 py-2 mb-2 w-full" required />
              <textarea name="description" placeholder="Description" onChange={handleInputChange} className="border rounded px-3 py-2 mb-2 w-full" required />
              <select name="category" onChange={handleInputChange} className="border rounded px-3 py-2 mb-2 w-full">
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
      </div>
    </div>
  );
};

export default Dashboard;