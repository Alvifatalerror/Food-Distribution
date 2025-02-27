import React, { useState } from 'react';

const Auth2 = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  // Define the functions outside of useState
  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleLoginClick = () => {
    setIsSignUp(false);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-96 transition duration-300 ease-in-out hover:scale-105">
        {isSignUp ? (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />

              <select className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                <option>Ngo</option>
                <option>oxxx</option>
                <option>yyyy</option>
              </select>

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
            <form className="space-y-4">
              <input
                type="text"
                placeholder="User ID"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <div className="mb-6 flex items-center">
                <input type="checkbox" id="remember" className="mr-2 accent-blue-500" />
                <label htmlFor="remember" className="text-gray-700">
                  Remember for 30 days
                </label>
              </div>
              <a href="#" className="text-blue-600 hover:underline block mb-6 text-center transition duration-300">
                Forgot Password?
              </a>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
              >
                Login
              </button>
            </form>
            <div className="mt-6">
              <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300">
                Sign in with Google
              </button>
            </div>
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