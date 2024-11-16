import React from "react";

interface FeatureProps {
  id?: string; 
}

export const Feature: React.FC<FeatureProps> = ({ id }) => {
  return (
    <section id={id} className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="section-heading text-center">
          <h2 className="section-title font-bold mb-8">Features</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start">
            <div className="bg-blue-500 p-4 rounded-full mr-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-lg">
            Our algorithm matches your balance to your metabalance bit by
            bit by sharing everyone's voluntary fees
            </p>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-500 p-4 rounded-full mr-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <p className="text-lg">To participate you just have to add some fee.
              This sets your public rate. The higher it is,
              the faster you receive back from the network.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};