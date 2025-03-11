import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [donators, setDonators] = useState([
    {
      id: 1,
      name: 'McDonalds',
      email: 'customerservice@mcdonalds.com',
      location: 'Downtown Branch',
      timePeriod: 'Daily after 9 PM',
      description: 'Surplus food items and fresh ingredients',
      category: 'Restaurant'
    },
    {
      id: 2,
      name: 'Starbucks',
      email: 'info@starbucks.com',
      location: 'City Center',
      timePeriod: 'Evening hours',
      description: 'Pastries and sandwiches',
      category: 'Restaurant'
    },
    {
      id: 3,
      name: 'Paragon',
      email: 'contact@paragonrestaurant.com',
      location: 'Main Street',
      timePeriod: 'Flexible hours',
      description: 'Local cuisine and fresh meals',
      category: 'Restaurant'
    },
    {
      id: 4,
      name: 'Kubaba Mandhi',
      email: 'info@kubabamandhi.com',
      location: 'Edappally',
      timePeriod: 'Daily after 10 PM',
      description: 'Arabian cuisine, Mandhi and grilled items',
      category: 'Restaurant'
    }
  ]);
  const [requesters, setRequesters] = useState([
    {
      id: 1,
      name: 'Child Welfare Centre',
      email: 'childwelfare.kalamassery@gmail.com',
      location: 'Kalamasserry',
      timePeriod: 'Daily 9 AM - 5 PM',
      description: 'Supporting 50 children, need regular food supplies',
      category: 'NGO',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Old Age Home',
      email: 'oldagehome.kaloor@gmail.com',
      location: 'Kaloor',
      timePeriod: 'Any time',
      description: 'Care home for elderly residents, requiring daily meals',
      category: 'NGO',
      status: 'pending'
    }
  ]);
  const [wasteData, setWasteData] = useState([]);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    location: '', 
    timePeriod: '', 
    description: '', 
    category: '',
    status: 'pending'
  });
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [userRole, setUserRole] = useState("user");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...formData, id: Date.now() };
    
    if (activeView === 'addDonation') {
      setDonators([...donators, newEntry]);
      setActiveView('donators');
    } else if (activeView === 'addRequest') {
      setRequesters([...requesters, newEntry]);
      setActiveView('requesters');
    }
    
    setFormData({ 
      name: '', 
      email: '', 
      phone: '', 
      location: '', 
      timePeriod: '', 
      description: '', 
      category: '',
      status: 'pending'
    });
  };

  const handleRequestStatus = (requestId, status) => {
    setRequesters(prev => prev.map(request => 
      request.id === requestId ? { ...request, status } : request
    ));
  };

  const onAccept = (member, type) => {
    if (type === 'donation') {
      setDonators(prev => prev.filter(item => item.id !== member.id));
    } else if (type === 'request') {
      if (userRole === 'admin') {
        handleRequestStatus(member.id, 'approved');
      } else {
        setRequesters(prev => prev.filter(item => item.id !== member.id));
      }
    }
  };

  const onDeny = (requestId) => {
    if (userRole === 'admin') {
      handleRequestStatus(requestId, 'denied');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleLogin = (role) => {
    setUserRole(role);
    setUserName(role === 'admin' ? 'Admin' : 'Guest');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        isOpen={isSidebarVisible}
        setActiveView={setActiveView}
        activeView={activeView}
        userRole={userRole}
      />
      <MainContent
        activeView={activeView}
        donators={donators}
        requesters={requesters}
        wasteData={wasteData}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        onAccept={onAccept}
        onDeny={onDeny}
        toggleSidebar={toggleSidebar}
        userName={userName}
        fromAuth2={false}
      />
    </div>
  );
};

export default Dashboard;