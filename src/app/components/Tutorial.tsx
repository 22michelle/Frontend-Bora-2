"use client";

import React from "react";

interface TutorialProps {
  id?: string; 
}

export const Tutorial: React.FC<TutorialProps> = ({ id }) => {
  return (
    <section id={id} className="bg-gradient-to-b from-white to-[#D2DCFF] py-10">
      <div className="container mx-auto px-4">
        <div className="section-heading text-center mb-8">
          <h2 className="section-title font-bold">How it works?</h2>
        </div>
        
        <div className="flex justify-center mb-8">
          {/* Dashboard Functionalities */}
          <div className="flex flex-col items-center text-center">
            <p className="text-lg mb-4">
              Once registered, users can access a comprehensive dashboard that offers multiple functionalities:
            </p>
            {/* Unordered List directly below the paragraph */}
            <ul className="flex flex-col gap-4 items-start">
  <li className="flex items-start">
    <span className="font-bold mr-2">Withdraw Money:</span>
    <span>Easily withdraw your funds whenever you need them.</span>
  </li>
  <li className="flex items-start">
    <span className="font-bold mr-2">Transfer Money:</span>
    <span>Send money to friends, family, or businesses with just a few clicks.</span>
  </li>
  <li className="flex items-start">
    <span className="font-bold mr-2">Deposit Money:</span>
    <span>Add funds to your wallet seamlessly, ensuring you’re always ready to make transactions.</span>
  </li>
  <li className="flex items-start">
    <span className="font-bold mr-2">View Transaction History:</span>
    <span>Keep track of your transactions with details on the date and amount of money sent.</span>
  </li>
  <li className="flex items-start">
    <span className="font-bold mr-2">Monitor Metabalance:</span>
    <span>Visualize how your metabalance changes based on distributions made by others in the network.</span>
  </li>
</ul>
          </div>
        </div>

        {/* Centered Video Section for MP4 */}
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-lg">
            {/* Video code here */}
            {/* Example video element */}
            {/* Uncomment and replace with your video source */}
            {/* 
            <video
              controls
              width="100%"
              height="auto"
              src="/assets/Video/Tutorial.mp4"
              title="Video Tutorial"
            >
              Your browser does not support the video tag.
            </video> 
            */}
          </div>
        </div>
      </div>
    </section>
  );
}
