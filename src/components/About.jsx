import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className='relative flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden bg-gray-900 -mt-1' id='About'>


      {/* Layered Background with Gradients and Depth */}
      <div className='absolute inset-0 z-0'>
        {/* Base Gradient Layer - Darker */}
        <div className='absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-950 opacity-95 animate-gradient-x'></div>
        {/* Subtle Radial Gradient for Depth - Darker */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_rgba(0,0,0,0)_70%)] opacity-40'></div>
        {/* Diagonal Gradient for 3D Effect - Darker */}
        <div className='absolute inset-0 bg-gradient-to-br from-transparent via-gray-900 to-gray-950 opacity-60'></div>
        {/* Subtle Pattern Overlay */}
        <div className='absolute inset-0 bg-[url("/path/to/subtle-pattern.png")] opacity-15'></div>
      </div>

      {/* About Content with 3D Coming Out Effect */}
      <div className='relative z-10 mt-10 text-center max-w-2xl text-gray-100 transform perspective-1000'>
        {/* 3D Heading */}
        <h1 className='text-2xl sm:text-4xl font-bold mb-2 transform-style-preserve-3d hover:translate-z-20 transition-transform duration-500 [text-shadow:_0_2px_4px_rgba(0,0,0,0.5),_0_4px_8px_rgba(0,0,0,0.3)]'>
          About <span className='underline underline-offset-4 decoration-1 font-light'>Our Cause</span>
          {/* 3D Text Shadow */}
          <span className='absolute top-0 left-0 w-full h-full text-2xl sm:text-4xl font-bold opacity-30 transform translate-z-[-10px] pointer-events-none'>
            About <span className='underline underline-offset-4 decoration-1 font-light'>Our Cause</span>
          </span>
        </h1>

        {/* 3D Paragraph */}
        <p className='text-lg leading-relaxed transform-style-preserve-3d hover:translate-z-10 transition-transform duration-500 relative [text-shadow:_0_1px_2px_rgba(0,0,0,0.4),_0_2px_4px_rgba(0,0,0,0.2)]'>
          We collaborate with restaurants, events, and households to redirect surplus food to communities in need. By leveraging technology and compassionate action, we aim to minimize food wastage while nourishing underprivileged communities.
          {/* 3D Text Shadow */}
          <span className='absolute top-0 left-0 w-full h-full text-lg leading-relaxed opacity-30 transform translate-z-[-5px] pointer-events-none'>
            We collaborate with restaurants, events, and households to redirect surplus food to communities in need. By leveraging technology and compassionate action, we aim to minimize food wastage while nourishing underprivileged communities.
          </span>
        </p>
      </div>

      {/* Stats Section with 3D Card Effect */}
      <div className='relative z-10 flex flex-col md:flex-row justify-center items-center gap-6 mt-10'>
        {[
          { value: '5M+', label: 'Meals Distributed', bg: 'bg-green-900', text: 'text-green-100' },
          { value: '1000+', label: 'Communities Served', bg: 'bg-yellow-900', text: 'text-yellow-100' },
          { value: '500+', label: 'NGO Partnerships', bg: 'bg-blue-900', text: 'text-blue-100' },
          { value: '300+', label: 'Active Volunteers', bg: 'bg-red-900', text: 'text-red-100' },
        ].map((stat, index) => (
          <div
            key={index}
            className={`${stat.bg} ${stat.text} rounded-xl p-6 shadow-2xl w-48 text-center hover:scale-105 transition-transform duration-300 hover:shadow-3xl relative overflow-hidden`}
          >
            {/* Inner Gradient for Depth */}
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30'></div>
            <p className='text-4xl font-bold relative z-10'>{stat.value}</p>
            <p className='text-sm relative z-10'>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Mission Section with 3D Pop-Up Effect */}
      <div className='relative w-full h-[500px] bg-gray-900 text-white flex flex-col items-center justify-center my-10 rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-3xl'>
        {/* Background Image with Gradient Overlay */}
        <img
          src={assets.background}
          alt='Background'
          className='absolute top-0 left-0 w-full h-full object-cover opacity-30'
        />
        {/* Radial Gradient for Depth - Darker */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_rgba(0,0,0,0.9)_70%)]'></div>
        <h1 className='text-3xl sm:text-5xl font-extrabold z-10 uppercase tracking-wider animate-pulse'>
          Join Our Mission
        </h1>
        <p className='text-center text-lg max-w-xl mt-4 z-10 italic'>
          "No More Wasted Meals. No More Hungry Hearts ❤️"
        </p>
        <button className='mt-6 px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition font-semibold opacity-70 hover:opacity-100 z-10'>
          Get Involved
        </button>
      </div>

      {/* Gallery Section with 3D Hover Effect */}
      <div className='relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 mt-10'>
        {[assets.image1, assets.image2, assets.image3, assets.image4].map((image, index) => (
          <div
            key={index}
            className='relative overflow-hidden rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-500'
          >
            <img
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className='w-full h-64 object-cover transform hover:scale-110 transition-transform duration-500'
            />
            {/* Gradient Overlay for Depth - Darker */}
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-50 transition-opacity duration-500'></div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default About;