import React from 'react';

const AboutUs = ({ setActiveView }) => {
  const handleDonorClick = () => {
    setActiveView('addDonation');
  };

  const handleRecipientClick = () => {
    setActiveView('addRequest');
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About Agape meal</h2>
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4 text-lg">
            Agape meal is a non-profit initiative dedicated to bridging the gap between food abundance and scarcity in our community. 
            We connect restaurants and food providers with those in need, ensuring that surplus food reaches the right hands.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Our Mission</h3>
        <div className="grid gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500 rounded-lg shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Reduce Food Waste</h4>
              <p className="text-gray-600">We work to minimize food waste by connecting surplus food from restaurants and catering services with those who need it most.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500 rounded-lg shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Community Connection</h4>
              <p className="text-gray-600">Building a network of caring businesses and organizations to support our community's nutritional needs.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500 rounded-lg shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Support Those in Need</h4>
              <p className="text-gray-600">Ensuring that nutritious food reaches orphanages, elderly homes, and individuals facing food insecurity.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">How We Work</h3>
        <div className="grid gap-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-500 rounded-full flex items-center justify-center font-semibold">1</div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Verification Process</h4>
              <p className="text-gray-600">We carefully verify all participating restaurants and recipients to ensure food safety and proper distribution.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-500 rounded-full flex items-center justify-center font-semibold">2</div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Quick Response</h4>
              <p className="text-gray-600">Our system ensures rapid response to food availability, minimizing waste and maximizing distribution efficiency.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-500 rounded-full flex items-center justify-center font-semibold">3</div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Quality Assurance</h4>
              <p className="text-gray-600">We maintain strict standards for food quality and safety throughout the donation and distribution process.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-8 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Our Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
            <div className="text-gray-600">Meals Distributed Daily</div>
          </div>
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">20+</div>
            <div className="text-gray-600">Partner Restaurants</div>
          </div>
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
            <div className="text-gray-600">Beneficiary Organizations</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Join Our Mission</h3>
        <p className="text-gray-600 mb-6">
          Whether you're a restaurant looking to donate surplus food or an organization serving those in need, 
          we welcome you to join our mission of creating a hunger-free community.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={handleDonorClick}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Become a Donor
          </button>
          <button 
            onClick={handleRecipientClick}
            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Register as Recipient
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 