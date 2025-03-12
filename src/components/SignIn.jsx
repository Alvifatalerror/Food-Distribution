import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SignIn = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isAdminAttempt, setIsAdminAttempt] = useState(false);

  // Get role from URL parameters
  const params = new URLSearchParams(location.search);
  const role = params.get('role') || 'user';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Check for admin email pattern
    if (name === 'email' && value.toLowerCase().includes('admin@')) {
      setIsAdminAttempt(true);
    } else if (name === 'email') {
      setIsAdminAttempt(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Handle admin authentication
    if (isAdminAttempt) {
      // In a real app, you would validate admin credentials here
      if (formData.email.toLowerCase().includes('admin@') && formData.password === 'admin123') {
        onLogin('admin', 'Administrator');
        navigate('/dashboard');
        return;
      }
    }

    // Regular user authentication
    onLogin(role, formData.email.split('@')[0]);
    navigate('/dashboard');
  };

  const getRoleTitle = () => {
    if (isAdminAttempt) {
      return 'Administrator Sign In';
    }
    switch(role) {
      case 'donor':
        return 'Donor Sign In';
      case 'recipient':
        return 'Recipient Sign In';
      default:
        return 'Sign In';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{getRoleTitle()}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
              isAdminAttempt 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn; 