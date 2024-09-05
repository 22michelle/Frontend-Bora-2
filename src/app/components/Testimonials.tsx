"use client";
import avatar1 from "@/app/public/assets/avatar-1.png";
import avatar2 from "@/app/public/assets/avatar-2.png";
import avatar3 from "@/app/public/assets/avatar-3.png";
import avatar4 from "@/app/public/assets/avatar-4.png";
import avatar5 from "@/app/public/assets/avatar-5.png";
import avatar6 from "@/app/public/assets/avatar-6.png";
import avatar7 from "@/app/public/assets/avatar-7.png";
import avatar8 from "@/app/public/assets/avatar-8.png";
import avatar9 from "@/app/public/assets/avatar-9.png";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

interface Testimonial {
  text: string;
  imageSrc: string;
  name: string;
  username: string;
}

const testimonials: Testimonial[] = [
  {
    text: "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention.",
    imageSrc: avatar1.src,
    name: "Jamie Rivera",
    username: "@jamietechguru00",
  },
  {
    text: "Our team's productivity has skyrocketed since we started using this tool.",
    imageSrc: avatar2.src,
    name: "Josh Smith",
    username: "@jjsmith",
  },
  {
    text: "This app has completely transformed how I manage my projects and deadlines.",
    imageSrc: avatar3.src,
    name: "Morgan Lee",
    username: "@morganleewhiz",
  },
  {
    text: "I was amazed at how quickly we were able to integrate this app into our workflow.",
    imageSrc: avatar4.src,
    name: "Casey Jordan",
    username: "@caseyj",
  },
  {
    text: "Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.",
    imageSrc: avatar5.src,
    name: "Taylor Kim",
    username: "@taylorkimm",
  },
  {
    text: "The customizability and integration capabilities of this app are top-notch.",
    imageSrc: avatar6.src,
    name: "Riley Smith",
    username: "@rileysmith1",
  },
  {
    text: "Adopting this app for our team has streamlined our project management and improved communication across the board.",
    imageSrc: avatar7.src,
    name: "Jordan Patels",
    username: "@jpatelsdesign",
  },
  {
    text: "With this app, we can easily assign tasks, track progress, and manage documents all in one place.",
    imageSrc: avatar8.src,
    name: "Sam Dawson",
    username: "@dawsontechtips",
  },
  {
    text: "Its user-friendly interface and robust features support our diverse needs.",
    imageSrc: avatar9.src,
    name: "Casey Harper",
    username: "@casey09",
  },
];

// Dynamically create columns based on the number of testimonials
const createColumns = (testimonials: Testimonial[], columns: number) => {
  const columnSize = Math.ceil(testimonials.length / columns);
  return Array.from({ length: columns }, (_, index) => 
    testimonials.slice(index * columnSize, (index + 1) * columnSize)
  );
};

const testimonialColumns = createColumns(testimonials, 3); // Create 3 columns

interface TestimonialsColumnProps {
  testimonials: Testimonial[];
  className?: string;
}

const TestimonialsColumn: React.FC<TestimonialsColumnProps> = ({ testimonials, className }) => (
  <div className={className}>
    <motion.div
      animate={{ translateY: "-50%" }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      className="flex flex-col gap-6 pb-6"
    >
      {testimonials.map(({ text, imageSrc, name, username }, index) => (
        <div className="card" key={index}>
          <div>{text}</div>
          <div className="flex items-center gap-2 mt-5">
            <Image
              src={imageSrc}
              alt={name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
            <div className="flex flex-col">
              <div className="font-medium tracking-tight leading-5">{name}</div>
              <div className="leading-5 tracking-tight">{username}</div>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  </div>
);

interface TestimonialsProps {
  id?: string; 
}

export const Testimonials: React.FC<TestimonialsProps> = ({ id }) => {
  return (
    <section id={id} className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-clip">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title mt-5">What our users say</h2>
          <p className="section-description mt-5">
            Our algorithm tries to match your balance to your metabalance by sharing everyones voluntary fees.
          </p>
        </div>
        <div className="flex justify-center gap-6 mt-10 gradient-mask">
          {testimonialColumns.map((column, index) => (
            <TestimonialsColumn key={index} testimonials={column} className={index === 1 ? "hidden md:block" : index === 2 ? "hidden lg:block" : ""} />
          ))}
        </div>
      </div>
    </section>
  );
};