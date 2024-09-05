"use client";
import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import Image from "next/image";
import noddle from "@/app/public/assets/noodle.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { toast } from "react-toastify";

interface FormHelpProps {
  id?: string; // Optional id prop
}

const FormHelp: React.FC<FormHelpProps> = ({ id }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .send(
        "service_674nm7u",
        "template_lcgqhow",
        formData,
        "6TbC4y0Ul_JmPMD_U"
      )
      .then(
        (response) => {
          console.log("Email successfully sent!", response.status, response.text);
          toast.success("Message sent successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          console.error("Error sending email", error);
          toast.error("Error sending message, please try again later", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      );
  };

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section id={id} className="bg-gradient-to-b from-[#D2DCFF] to-white py-24 overflow-clip">
      <div className="container mx-auto px-4">
        <div className="section-heading text-center">
          <h2 className="section-title mt-5 font-bold">Contact Us</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center mt-10 gap-10">
          <div className="md:w-1/2">
            <div className="section-heading">
              <h2 className="section-subtitle text-[30px]">Lets talk</h2>
            </div>
            <p className="section-description flex justify-start">
              Ask about our platform, implementation, or anything. Our highly trained reps are standing by, ready to help.
            </p>
            <div className="relative -left-[190px] top-[-17px] mb-4">
              <Image src={noddle} alt="noddle" width={360} />
            </div>
          </div>
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
          >
            <div className="mb-4">
              <label htmlFor="firstName" className="block font-medium mb-1">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block font-medium mb-1">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block font-medium mb-1">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-500 h-32 resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormHelp;