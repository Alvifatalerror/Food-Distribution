import React from "react";
const HowToUse = () => {
    return (
      <div className=' w-full min-h-screen rounded-xl mt-5 p-4 shadow-2xl'>
        <div className="min-h-screen bg-gray-100 text-gray-900 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">How to Use Our Platform</h1>

      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Adding a Donation</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Go to the "Add Donation" section in the navigation menu.</li>
          <li>Fill in the required details.</li>
          <li>Review your details and click "Submit" to post your donation.</li>
        </ol>
      </div>

      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-semibold mb-4">Requesting Food</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Navigate to the "Add Request" section from the main menu.</li>
          <li>Provide necessary details.</li>
          <li>Mention the quantity and location for pickup.</li>
          <li>Review your request and click "Submit" to proceed.</li>
        </ol>
      </div>
    </div>
      </div>
    );
  };
  
  export default HowToUse;