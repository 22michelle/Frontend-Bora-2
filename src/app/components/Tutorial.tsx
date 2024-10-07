import React from "react";

interface TutorialProps {
  id?: string; 
}

export const Tutorial: React.FC<TutorialProps> = ({ id }) => {
  return (
    <section id={id} className="bg-gradient-to-b from-white to-[#D2DCFF] py-10">
      <div className="container mx-auto px-4">
        <div className="section-heading text-center">
          <h2 className="section-title font-bold mb-8">How it works?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start">
            <p className="text-lg">
              Bora is an innovative virtual wallet designed to simplify your financial transactions. 
              With a user-friendly interface and robust features, Bora makes managing your money easier than ever.
            </p>
          </div>
          <div className="flex items-start">
            <p className="text-lg">
              Our landing page provides an overview of all the services offered by Bora, 
              allowing users to quickly understand how our virtual wallet can enhance their financial experience.
            </p>
          </div>
          <div className="flex items-start">
            <p className="text-lg">
              Signing up for Bora is quick and straightforward. Simply register your account to gain access to all the features. 
              Existing users can easily log in to manage their finances securely.
            </p>
          </div>
          <div className="flex items-start">
            <p className="text-lg">
              Once registered, users can access a comprehensive dashboard that offers multiple functionalities:
              <ul className="list-disc ml-5 mt-2">
                <li><span className="font-bold">Withdraw Money:</span> Easily withdraw your funds whenever you need them.</li>
                <li><span className="font-bold">Transfer Money:</span> Send money to friends, family, or businesses with just a few clicks.</li>
                <li><span className="font-bold">Deposit Money:</span> Add funds to your wallet seamlessly, ensuring you’re always ready to make transactions.</li>
                <li><span className="font-bold">View Transaction History:</span> Keep track of your transactions with details on the date and amount of money sent.</li>
                <li><span className="font-bold">Monitor Metabalance:</span> Visualize how your metabalance changes based on distributions made by others in the network, allowing you to see how it affects your overall balance.</li>
              </ul>
            </p>
          </div>
        </div>

        {/* Centered Video Section for MP4 */}
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-lg">
            <h3 className="text-center font-bold mb-4">Video Tutorial</h3>
            <video
              controls
              width="100%"
              height="auto"
              src="/assets/Video/Tutorial.mp4" 
              title="Video Tutorial"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

      </div>
    </section>
  );
}