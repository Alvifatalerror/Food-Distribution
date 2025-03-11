import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-10 rounded-xl overflow-hidden shadow-xl">
            <img 
              src="/food-sharing.jpg" 
              alt="Community food sharing" 
              className="w-full h-[400px] md:h-[500px] object-cover object-center transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Smart Food Distribution
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connecting food donors with those in need, reducing waste, and making a difference in our community.
          </p>
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg">
                We believe that no food should go to waste while people go hungry. Our platform connects 
                generous donors with individuals and organizations in need, creating a sustainable solution 
                for food distribution in our community.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">For Donors</h3>
                <p className="text-gray-600 text-lg mb-4">
                  Have excess food? Whether you're a restaurant, event organizer, or individual, 
                  you can make a difference by donating your surplus food.
                </p>
                <Link 
                  to="/signin" 
                  className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Sign in as Donor
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">For Recipients</h3>
                <p className="text-gray-600 text-lg mb-4">
                  Organizations and individuals in need can easily request food donations through 
                  our platform, ensuring efficient distribution to those who need it most.
                </p>
                <Link 
                  to="/signin" 
                  className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Sign in as Recipient
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 