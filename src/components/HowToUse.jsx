import React from 'react';

const HowToUse = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">How to Use</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">For Donors</h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Click on "Add Donation" in the sidebar</li>
            <li>Fill in the required details about your donation</li>
            <li>Submit the form and wait for acceptance</li>
          </ol>
        </div>
        <div>
          <h4 className="font-medium text-gray-700 mb-2">For Requesters</h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Click on "Add Request" in the sidebar</li>
            <li>Provide details about your food requirements</li>
            <li>Submit the request and wait for matching</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;