import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className='relative flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w- overflow-hidden bg-gray-900 -mt-1' id='About'>

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
        "Our mission is to bridge the gap between surplus food and those in need. Through our platform, individuals and organizations can donate excess food, while those in need can request help with ease. Together, we reduce waste, fight hunger, and build a community of care."
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
      <div className='relative w-screen md:w-full h-[500px] bg-gray-900 text-white flex flex-col items-center justify-center my-10 md:rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-3xl'>
        {/* Background Image with Gradient Overlay */}
        <img
          src={assets.background}
          alt='Background'
          className='absolute top-0 left-0 w-full h-full object-cover opacity-100'
        />
      
        
        <h1 className='text-3xl text-center sm:text-5xl font-extrabold z-10 uppercase tracking-wider opacity-100 animate-pulse'>
          Join Our Mission
        </h1>
        <p className='text-center text-lg max-w-xl mt-4 z-10 italic'>
          "No More Wasted Meals. No More Hungry Hearts ❤️"
        </p>
        <button className='mt-6 px-6 py-3 border border-white text-white rounded-lg  hover:bg-white hover:text-black transition font-semibold opacity-70 hover:opacity-100 z-10'>
          Get Involved
        </button>
      </div>

     

    </div>
  );
};

export default About;