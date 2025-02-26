import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';

const auth = getAuth(app);
const db = getFirestore(app);

const AuthForm = () => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [organization, setOrganization] = useState('Ngo');
  const [rememberMe, setRememberMe] = useState(false);

  // Check authentication state on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to dashboard
        navigate('/dashboard');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleLoginClick = () => {
    setIsSignUp(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      // Set persistence only if "Remember Me" is checked
      if (rememberMe) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, browserSessionPersistence); // Use session persistence if not checked
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        userId: user.uid,
        email: user.email,
        userName: userName,
        organization: organization,
      });

      alert('User registered successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Set persistence only if "Remember Me" is checked
      if (rememberMe) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, browserSessionPersistence); // Use session persistence if not checked
      }

      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      // Set persistence only if "Remember Me" is checked
      if (rememberMe) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, browserSessionPersistence); // Use session persistence if not checked
      }

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        // If user doesn't exist, create a new document
        await setDoc(userDocRef, {
          userId: user.uid,
          email: user.email,
          userName: user.displayName || 'User', // Use display name or default
          organization: 'Ngo', // Default organization
        });
      }
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-[url('https://images.pexels.com/photos/1353938/pexels-photo-1353938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover h-screen flex items-center justify-center">
      <div className="bg-black w-full min-h-screen absolute opacity-20"></div>
      <div className="z-50 bg-white p-10 rounded-2xl shadow-lg w-96 transition duration-300 ease-in-out hover:scale-105">
        {isSignUp ? (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
            <form className="space-y-4" onSubmit={handleSignUp}>
              <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" />
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" />
              <select value={organization} onChange={(e) => setOrganization(e.target.value)} className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                <option>Ngo</option>
                <option>Others</option>
              </select>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300">Sign Up</button>
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
            <form className="space-y-4" onSubmit={handleLogin}>
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" />
              <div className="mb-6 flex items-center">
                <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} id="remember" className="mr-2 accent-blue-500" />
                <label htmlFor="remember" className="text-gray-700">Remember for 30 days</label>
              </div>
              <a href="#" className="text-blue-600 hover:underline block mb-6 text-center transition duration-300">Forgot Password?</a>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300">Login</button>
            </form>
            <div className="mt-6">
              <button onClick={handleGoogleSignIn} className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300">
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

export default AuthForm;