import { useState } from "react";

export default function AuthComponent() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[800px] h-[500px] bg-white shadow-2xl overflow-hidden rounded-xl flex">
        {/* Left Side - Red Background (Sign In) */}
        <div className="w-1/2 bg-red-500 text-white flex flex-col justify-center items-center transition-all duration-700 ease-in-out">
          {!isSignUp ? (
            <>
              <h2 className="text-3xl font-bold">Sign In</h2>
              <input type="text" placeholder="Email" className="mt-4 p-2 border rounded w-3/4 text-gray-900" />
              <input type="password" placeholder="Password" className="mt-2 p-2 border rounded w-3/4 text-gray-900" />
              <button className="mt-4 px-6 py-2 bg-white text-red-500 rounded">Sign In</button>
              <p className="mt-4">
                Don't have an account?{" "}
                <button onClick={() => setIsSignUp(true)} className="text-white font-semibold underline">
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold">Welcome Back!</h2>
              <p className="mt-4 text-center w-3/4">
                Enter your personal details and start your journey with us.
              </p>
              <button
                onClick={() => setIsSignUp(false)}
                className="mt-6 px-6 py-2 bg-transparent border border-white rounded-full hover:bg-white hover:text-red-500 transition"
              >
                Sign In
              </button>
            </>
          )}
        </div>

        {/* Right Side - White Background (Sign Up) */}
        <div className="w-1/2 bg-white text-gray-800 flex flex-col justify-center items-center transition-all duration-700 ease-in-out">
          {isSignUp ? (
            <>
              <h2 className="text-3xl font-bold">Sign Up</h2>
              <input type="text" placeholder="Name" className="mt-4 p-2 border rounded w-3/4" />
              <input type="text" placeholder="Email" className="mt-2 p-2 border rounded w-3/4" />
              <input type="password" placeholder="Password" className="mt-2 p-2 border rounded w-3/4" />
              <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded">Sign Up</button>
              <p className="mt-4">
                Already have an account?{" "}
                <button onClick={() => setIsSignUp(false)} className="text-blue-500 font-semibold">
                  Sign In
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-800">Hello, Friends!</h2>
              <p className="mt-4 text-center w-3/4">
                Enter your personal details and start your journey with us.
              </p>
              <button
                onClick={() => setIsSignUp(true)}
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
