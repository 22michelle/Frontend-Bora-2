"use client";
import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import Image from "next/image";
import noddle from "@/app/public/assets/noodle.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEnvelope, faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";

interface FormHelpProps {
  id?: string;
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

        {/* Responsive Contact and Form section */}
        <div className="flex flex-col md:flex-row items-start mt-10 gap-10">
          {/* Contact Info */}
          <div className="md:w-1/2 p-4 flex flex-col items-start">
            <h2 className="section-subtitle text-[24px] md:text-[30px] font-semibold">
            We’re Here to Help
            </h2>
            <p className="section-description text-gray-700 text-base md:text-lg mt-4 text-left">
            Have questions about our platform? Our team is here to answer all your questions.
            Reach out and we'll get back to you as soon as possible.
            </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
           {/* Column 1: Email */}
          {/* <div className="flex items-center">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-600" />
          <span className="text-gray-700 font-medium">resilenciabora@gmail.com</span>
          </div> */}

           {/* Column 2: Country */}
          {/* <div className="flex items-center">
          <FontAwesomeIcon icon={faGlobe} className="mr-2 text-blue-600" />
          <span className="text-gray-700 font-medium">Colombia</span>
          </div> */}

           {/* Column 1: Phone */}
          {/* <div className="flex items-center">
          <FontAwesomeIcon icon={faPhone} className="mr-2 text-blue-600" />
          <span className="text-gray-700 font-medium">+57 123 456 7890</span>
          </div> */}

           {/* Column 2: Opening hours */}
          {/* <div className="flex items-center">
          <FontAwesomeIcon icon={faClock} className="mr-2 text-blue-600" />
          <span className="text-gray-700 font-medium">Mon-Fri: 9am - 6pm</span>
          </div> */}
          </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md w-full md:max-w-md"
          >
            <div className="mb-4 flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label htmlFor="firstName" className="block font-medium mb-1">
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  placeholder="First Name"
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
              <div className="w-full">
                <label htmlFor="lastName" className="block font-medium mb-1">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  placeholder="Last Name"
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
            </div>

            <div className="mb-4 relative">
              <label htmlFor="email" className="block font-medium mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
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
                placeholder="How can we help?"
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-4 py-2 w-full h-32 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary hover:bg-[#001E80] text-white font-medium py-2 px-4 rounded-md w-full"
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
