import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('guest');
  const [userName, setUserName] = useState('');

  const handleLogin = (role, name = '') => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(name || 'User');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('guest');
    setUserName('');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/signin" 
          element={<SignIn onLogin={handleLogin} />} 
        />
        <Route 
          path="/signup" 
          element={<SignUp onLogin={handleLogin} />} 
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard 
                userRole={userRole}
                userName={userName}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
