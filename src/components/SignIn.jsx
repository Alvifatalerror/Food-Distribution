import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50  bg-opacity-50 p-4'>
      {/* Main container with responsive width and height */}
      <div className='bg-black/65 max-w-[100%] md:max-w-[70%] md:min-h-[75%] mt-9 md:mt-0 p-6 md:p-8 shadow-lg rounded-lg overflow-y-auto'>
        {/* Flex container for inner sections */}
        <div className='flex flex-col md:flex-row justify-around gap-6 md:gap-8'>
          {/* Waste section */}
          <div id='Waste' className='w-full md:w-[40%] border border-gray-800 rounded-xl md:p-3 pb-2 md:pb-10'>
            <h1 className='text-4xl font-bold text-center text-red-500 m-5'>Farmers’ Green Portal</h1>
            <p className='text-center text-white text-lg md:text-xl m-7 hidden md:block font-light'>
            Farmers’ Green Portal connects you with surplus food from restaurants, allowing you to collect and repurpose food waste for composting or animal feed. Click to access sustainable resources ! 
            </p>

            <p className='block md:hidden text-center text-white text-lg md:text-xl m-7'>
            Farmers’ Green Portal connects you with surplus food from restaurants for composting or animal feed. Click to access and repurpose food waste sustainably! 🌱🚜
            </p>
            <div className='flex justify-center items-center mt-4'>
                <button onClick={()=>navigate("./auth2")} className='border  border-white hover:border-red-500 bg-white hover:bg-red-500 w-[70%] h-10 rounded-md text-black hover:text-white flex items-center justify-center gap-2'>
                    Farmers’ Collection Hub <FaArrowRight />
                </button>
            </div>
          </div>

          {/* Food section */}
          <div id='Food' className='w-full md:w-[40%] mt-8 md:mt-0 border border-gray-800 rounded-xl md:p-3 pb-2 md:pb-10'>
            <h1 className='text-4xl font-bold text-center text-red-500 m-5'>Community Food Hub</h1>
            <p className='text-center text-white text-lg md:text-xl m-7 hidden md:block font-light'>
            Community Food Hub bridges the gap between food donors and those in need, ensuring surplus food is shared instead of wasted. Whether you're donating or requesting a meal, click to join the movement! 
            </p>
            
            <p className='text-center text-white text-lg md:text-xl m-7 block md:hidden'>
            Community Food Hub connects food donors with those in need, ensuring surplus food is shared, not wasted. Click to give or receive support! 🍽️❤️
            </p>


            <div className='flex justify-center items-center mt-4'>
                <button onClick={()=>navigate("./auth")} className='border  border-white hover:border-red-500 bg-white hover:bg-red-500 w-[70%] h-10 rounded-md text-black hover:text-white flex items-center justify-center gap-2'>
                Share or Receive Food <FaArrowRight />
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;