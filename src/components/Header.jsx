import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const images = [
  '/header_img7.webp',
  '/header_img4.webp',
  '/header_img5.webp',
  '/header_img6.webp',
];

const Header = () => {
   const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);

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

  const handleImageChange = (index) => {
    setFade(false);
    setTimeout(() => {
      setCurrentImage(index);
      setFade(true);
    }, 300);
  };

  return (
    <div className='min-h-screen w-full overflow-hidden relative' id='Header'>

      <div className='absolute top-0 left-0 h-full w-full'>
        {images.map((image, index) => (
          <div
            key={index}
            className={`h-full w-full bg-cover bg-center absolute top-0 left-0 transition-opacity duration-2000 ease-in-out ${currentImage === index ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
        <div className='absolute top-0 left-0 h-full w-full bg-black/50'></div>
      </div>
      <div className='relative z-10'>
        <Navbar />
        <div className='container mx-auto py-4 px-6 md:px-20 lg:px-32 text-white flex items-center min-h-screen'>
          <div className='bg-transparent p-10 rounded-lg max-w-lg text-left'>
            <h2 className='text-4xl sm:text-5xl md:text-6xl font-semibold pt-10'>TOGETHER WE <span className='text-red-500'>FEED</span> THE NEED</h2>
            <p className='mt-6 text-lg italic'>"Every day, food is wasted while many go hungry. Together, we can change that. Whether giving or receiving, you’re part of a movement that ensures no meal is wasted and no one is left behind."</p>
            <div className='space-x-6 mt-10 flex'>
              <a href='#Join_Us' className='bg-red-500 px-8 py-3 rounded font-bold text-white hover:bg-red-600'>Talk To Us</a>
              <a onClick={() => navigate('/auth')}  className='bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200'>Get Involved</a>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Header;
