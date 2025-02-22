import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, onSnapshot, doc, deleteDoc } from "../firebaseConfig";

const Dashboard = () => {
  const API_KEY = import.meta.env.VITE_BREVO_API_KEY;
  const [activeView, setActiveView] = useState('overview');
  const [donators, setDonators] = useState([]);
  const [requesters, setRequesters] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    timePeriod: '',
    description: '',
    category: '',
  });
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Fetch real-time data from Firestore
  useEffect(() => {
    const unsubscribeDonations = onSnapshot(collection(db, 'donations'), (snapshot) => {
      const donationsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDonators(donationsData);
    });

    const unsubscribeRequests = onSnapshot(collection(db, 'requests'), (snapshot) => {
      const requestsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequesters(requestsData);
    });

    return () => {
      unsubscribeDonations();
      unsubscribeRequests();
    };
  }, []);

  const handleViewChange = (view) => {
    setActiveView(view);
    setIsSidebarVisible(false); // Close sidebar on selection (mobile)
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEntry = {
      name: formData.name,
      email: formData.email,
      location: formData.location,
      timePeriod: formData.timePeriod,
      description: formData.description,
      category: formData.category,
    };

    try {
      if (activeView === 'addDonation') {
        await addDoc(collection(db, 'donations'), newEntry); // Save to 'donations' collection
      } else if (activeView === 'addRequest') {
        await addDoc(collection(db, 'requests'), newEntry); // Save to 'requests' collection
      }

      // Reset the form
      setFormData({
        name: '',
        email: '',
        location: '',
        timePeriod: '',
        description: '',
        category: '',
      });

      // Navigate back to view list
      setActiveView(activeView === 'addDonation' ? 'donators' : 'requesters');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const onAccept = async (member, type) => {
    try {
      // Send email using Brevo
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': API_KEY, // Replace with your Brevo API key
        },
        body: JSON.stringify({
          sender: {
            name: 'FoodHeaven',
            email: 'csecastra@gmail.com', // Replace with your sender email
          },
          to: [
            {
              email: member.email,
              name: member.name,
            },
          ],
          subject: `${type} Accepted`,
          htmlContent: `
            <p>Hello ${member.name},</p>
            <p>Your ${type} has been accepted. Here are the details:</p>
            <ul>
              <li><strong>Name:</strong> ${member.name}</li>
              <li><strong>Email:</strong> ${member.email}</li>
              <li><strong>Location:</strong> ${member.location}</li>
              <li><strong>Time Period:</strong> ${member.timePeriod}</li>
              <li><strong>Description:</strong> ${member.description}</li>
            </ul>
            <p>Thank you!</p>
          `,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Email sent successfully:', result);

        // Remove the item from Firestore
        if (type === 'donation') {
          await deleteDoc(doc(db, 'donations', member.id));
          setDonators((prev) => prev.filter((item) => item.id !== member.id));
        } else if (type === 'request') {
          await deleteDoc(doc(db, 'requests', member.id));
          setRequesters((prev) => prev.filter((item) => item.id !== member.id));
        }

        console.log('Item removed from Firestore');
      } else {
        console.error('Failed to send email:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
      <div className="flex-1 p-6 overflow-y-auto bg-white md:ml-64 "> {/* Added md:ml-64 */}
        {/* Mobile menu icon (smaller icon) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-9 left-5 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex justify-between items-center mb-6">
          <div className="relative w-80 md:w-100  pl-7">
            <input
              type="text"
              placeholder="Search Location"
              className="block w-full p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="relative hover:text-gray-600 transition duration-300">
      
            </a>
            <button className="hover:bg-gray-200 p-2 rounded-full transition duration-300 flex items-center justify-center w-13 h-13">
              <span className="text-gray-700 font-medium text-2xl">JD</span>
            </button>
          </div>
        </div>
        {activeView === 'overview' && (
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold mb-2">Overview</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p>Accepted Donations</p>
                <p className="text-lg font-bold">{donators.length}</p>
              </div>
              <div>
                <p>Accepted Requests</p>
                <p className="text-lg font-bold">{requesters.length}</p>
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
                <button
                  onClick={() => onAccept(member, activeView === 'donators' ? 'donation' : 'request')}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Accept
                </button>
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