import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 p-4'>
      {/* Main container with responsive width and height */}
      <div className='backdrop-blur-md max-w-[90%] md:max-w-[50%] p-4 md:p-6 shadow-lg rounded-lg overflow-y-auto'>
        {/* Flex container for inner sections */}
        <div className='flex flex-col md:flex-row justify-around gap-4 md:gap-6'>
          {/* Waste section */}
          <div id='Waste' className='w-full md:w-[45%] rounded-xl p-4 md:p-6 bg-black/20 flex flex-col justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-center text-red-500 mb-4'>Farmers’ Green Portal</h1>
              <p className='text-center text-white text-sm md:text-base mb-4 font-light'>
                Farmers’ Green Portal connects you with surplus food from restaurants, allowing you to collect and repurpose food waste for composting or animal feed. Click to access sustainable resources!
              </p>
            </div>

            <div className='flex justify-center items-center'>
              {/* Light green button */}
              <button
                onClick={() => navigate('./auth2')}
                className='border border-green-500 hover:border-white bg-green-500 hover:bg-white w-full h-10 rounded-md text-white hover:text-green-500 flex items-center justify-center gap-2 transition-colors duration-300'
              >
                Farmers’ Collection Hub <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Food section */}
          <div id='Food' className='w-full md:w-[45%] rounded-xl p-4 md:p-6 bg-black/20 flex flex-col justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-center text-red-500 mb-4'>Community Food Hub</h1>
              <p className='text-center text-white text-sm md:text-base mb-4 font-light'>
                Community Food Hub bridges the gap between food donors and those in need, ensuring surplus food is shared instead of wasted. Whether you're donating or requesting a meal, click to join the movement!
              </p>
            </div>

            <div className='flex justify-center items-center'>
              {/* Red button */}
              <button
                onClick={() => navigate('./auth')}
                className='border border-red-500 hover:border-white bg-red-500 hover:bg-white w-full h-10 rounded-md text-white hover:text-red-500 flex items-center justify-center gap-2 transition-colors duration-300'
              >
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