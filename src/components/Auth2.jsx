import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { app } from '../firebaseConfig';

const auth = getAuth(app);

const Auth2 = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleLoginClick = () => {
    setIsSignUp(false);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Set persistence based on "Remember Me" checkbox
      if (rememberMe) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, browserSessionPersistence);
      }

      if (isSignUp) {
        // Handle Sign Up
        if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User registered:', userCredential.user);
        alert('User registered successfully!');
      } else {
        // Handle Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', userCredential.user);
        alert('Login successful!');
      }

      // Redirect to the dashboard with a flag to indicate this is from Auth2
      navigate('/dashboard', { state: { fromAuth2: true } });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-96 transition duration-300 ease-in-out hover:scale-105">
        {isSignUp ? (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  id="remember"
                  className="mr-2 accent-blue-500"
                />
                <label htmlFor="remember" className="text-gray-700">
                  Remember for 30 days
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-6 text-center text-gray-600">
              Already have an account?{' '}
              <a href="#" onClick={handleLoginClick} className="text-blue-600 hover:underline transition duration-300">
                Login
              </a>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Welcome Back!</h2>
            <p className="text-gray-600 mb-8 text-center">Sign in to your account.</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  id="remember"
                  className="mr-2 accent-blue-500"
                />
                <label htmlFor="remember" className="text-gray-700">
                  Remember for 30 days
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
              >
                Login
              </button>
            </form>
            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{' '}
              <a href="#" onClick={handleSignUpClick} className="text-blue-600 hover:underline transition duration-300">
                Sign Up
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth2;