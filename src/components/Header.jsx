import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import SignIn from './SignIn';

const images = [
  "/header_img7.webp",
  "/header_img4.webp",
  "/header_img5.webp",
  "/header_img6.webp",
];

const Header = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false); // State to control SignIn visibility

  // Automatically cycle through images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Prevent scrolling when SignIn is active
  useEffect(() => {
    if (showSignIn) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    // Cleanup function to re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showSignIn]);

  const handleImageChange = (index) => {
    setFade(false);
    setTimeout(() => {
      setCurrentImage(index);
      setFade(true);
    }, 300);
  };

  // Function to toggle SignIn visibility
  const toggleSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <div className='min-h-screen w-full overflow-hidden relative' id='Header'>
      <div className='absolute top-0 left-0 h-full w-full'>
        {images.map((image, index) => (
          <div
            key={index}
            className={`h-full w-full bg-cover bg-center absolute top-0 left-0 transition-opacity duration-2000 ease-in-out ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
        <div className="absolute top-0 left-0 h-full w-full bg-black/50"></div>
      </div>
      
      <div className='relative z-10'>
        <Navbar toggleSignIn={toggleSignIn} /> {/* Pass toggleSignIn to Navbar */}
        {showSignIn && <SignIn />} {/* Conditionally render SignIn */}
        
        {/* Conditionally render the text content */}
        {!showSignIn && (
          <div className='container mx-auto py-4 px-6 md:px-20 lg:px-32 text-white flex items-center min-h-screen'>
            <div className='bg-transparent p-10 rounded-lg max-w-lg text-left'>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold pt-10">
                <span className="inline-block animate-pulse">Hey! Let's</span>
                <span className="inline-block animate-none text-red-500">SHARE</span>
                <span className="inline-block animate-pulse">FOOD! 🍽️</span>
              </h2>
              <p className='mt-6 text-lg'>Got extra food? Someone out there could use it! We're just connecting awesome people who want to share with those who need a meal. Pretty cool, right? 😊</p>
              <div className='space-x-6 mt-10 flex'>
                <a href='#Join_Us' className='bg-red-500 px-8 py-3 rounded font-bold text-white hover:bg-red-600'>Say Hi! 👋</a>
                <a onClick={toggleSignIn} className='bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200'>Join Us!</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
