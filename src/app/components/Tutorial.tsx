"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Tutorial1 from "@/app/public/assets/Tutorial1.png";
import Tutorial2 from "@/app/public/assets/Tutorial2.png";
import Tutorial3 from "@/app/public/assets/Tutorial3.png";

interface TutorialProps {
  id?: string;
}

export const Tutorial: React.FC<TutorialProps> = ({ id }) => {
  const items = [
    { type: "image", src: Tutorial1.src, description: "Landing Page - On the landing page you will find a simulation of how your metabalance increases." },
    { type: "image", src: Tutorial2.src, description: "Landing Page - You will also find a form where you can send us your feedback and improvements for our platform." },
    { type: "image", src: Tutorial3.src, description: "Landing Page - At the bottom you will see an invitation to join the Bora service to experience a new way of banking." },
    { type: "video", src: "https://www.youtube.com/embed/avFXriux0Z0", description: "Video - Tutorial on how to register User."},
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <div className="absolute left-0 z-10 flex items-center justify-center w-10 h-10 text-blue-600 bg-white rounded-full shadow-lg cursor-pointer hover:bg-blue-100 transition duration-300">←</div>,
    nextArrow: <div className="absolute right-0 z-10 flex items-center justify-center w-10 h-10 text-blue-600 bg-white rounded-full shadow-lg cursor-pointer hover:bg-blue-100 transition duration-300">→</div>,
  };

  return (
    <section id={id} className="bg-gradient-to-b from-white to-[#D2DCFF] py-10">
      <div className="container mx-auto px-4">
        <div className="section-heading text-center mb-8">
          <h2 className="section-title font-bold">How to use:</h2>
        </div>
        {/* Slider */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-lg">
            <Slider {...settings}>
              {items.map((item, index) => (
                <div key={index} className="text-center">
                  {item.type === "image" ? (
                    <Image 
                      src={item.src} 
                      alt={`Imagen ${index + 1}`} 
                      width={900} // Adjusted width for better quality
                      height={500} // Adjusted height for better quality
                      quality={100} // Set maximum quality
                      className="w-full h-full rounded-xl" 
                    />
                  ) : (
                    <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                      <iframe 
                        src={item.src} 
                        title={`Video ${index + 1}`} 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full rounded-xl"
                      ></iframe>
                    </div>
                  )}
                  <p className="mt-4 text-xl">{item.description}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};