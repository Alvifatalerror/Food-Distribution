import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const images = [
  '/header_img7.jpg',
  '/header_img4.jpg',
  '/header_img5.jpg',
  '/header_img6.jpg',
];

const Header = () => {
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
    <div className='min-h-screen mb-4 w-full overflow-hidden relative' id='Header'>
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
            <h2 className='text-4xl sm:text-5xl md:text-6xl font-semibold pt-10'>TOGETHER WE FEED THE NEED</h2>
            <p className='mt-6 text-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut laoreet, orci ac dapibus tempus, ex ligula ullamcorper mi, non egestas est ante eu risus.</p>
            <div className='space-x-6 mt-10'>
              <a href='#Projects' className='bg-red-500 px-8 py-3 rounded font-bold text-white hover:bg-red-600'>Donate now</a>
              <a href='#Contact' className='bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200'>Raised Funds</a>
            </div>
          </div>
        </div>
      </div>

      {/* Image selector */}
      <div className='absolute bottom-5 left-43 flex gap-2 z-10'>
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 ${currentImage === index ? 'bg-red-500' : 'bg-white'} border border-red-500 transition-all duration-300`}
            onClick={() => handleImageChange(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Header;
