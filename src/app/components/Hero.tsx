"use client";
import ArrowIcon from "@/app/public/assets/arrow-right.svg";
import Network from "@/app/public/assets/network.svg";
import Circle from "@/app/public/assets/circle.png";
import Chip from "@/app/public/assets/chip-credit.svg";
import Image from "next/image";
import React, { useState } from 'react';
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="pt-8 pb-20 bg-[radial-gradient(ellipse_at_bottom_left,#183EC2,#EAEEFE_66%)]">
      <div className="container">
        <div className="md:flex md:items-start">
          <div className="md:w-[478px]">
            <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">
              Version is here
            </div>
            <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
              ¡Bora is not just another wallet!
            </h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
              May your connections be stronger
            </p>
            <div className="flex gap-1 items-center mt-[30px]">
              <button className="btn btn-primary border-none">
                Get started
              </button>
              <button className="btn btn-text border-black gap-1">
                <span>How it works?</span> <ArrowIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Credit Card */}
          <div className="mt-[100px] md:mt-0 md:w-1/2 md:pl-10 relative">
            <motion.div className="max-w-xs mx-auto bg-gradient-to-r from-[#010D3E] to-[#001E80] rounded-lg shadow-lg p-6 relative overflow-hidden">
              <div className="absolute inset-0 rounded-lg shadow-lg blur-md opacity-30 bg-black"></div>
              <div className="flex justify-end items-center relative z-10">
                <span className="text-white text-lg font-bold">Bora</span>
                <div className="flex justify-end">
                  <Image src={Circle} alt="circle" className="w-12 min-h-12" />
                </div>
              </div>
              <div className="relative z-10">
                <div className="absolute h-8 w-10 bg-white rounded flex items-center justify-center">
                  {/* Chip */}
                  <Chip className="" alt="Chip" />
                  <span className="text-xs font-bold"></span>
                </div>
                <br />
                <div className="mt-4">
                  <span className="text-white text-sm font-bold">
                    **** **** **** 9430
                  </span>
                </div>
                <div className="mt-4">
                  <span className="text-white text-sm">NAME SURNAME</span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-white">02/24</span>
                    <Network className="h-4 w-4 ml-2 transform rotate-45" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          {/* End Credit Card */}
        </div>
      </div>
    </section>
  );
};