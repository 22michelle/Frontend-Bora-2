"use client";
import ArrowRight from "@/app/public/assets/arrow-right.svg";
import StarImage from "@/app/public/assets/star.png";
import SpringImage from "@/app/public/assets/spring.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image"; 
import React from 'react';
import Link from "next/link";

export const SignUpFree = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef, 
    offset: ["start end", "end start"],
    layoutEffect: false, 
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section 
      id="Free"
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-clip"
    >
      <div className="container">
        <div className="section-heading relative">
          <h2 className="section-title">Sign Up for Free Today</h2>
          <p className="section-description mt-5">
          Join Bora today and experience a completely new way of banking! 
          Sign up, deposit and start making truly resilient transactions together.
          </p>
          <motion.div
            style={{ translateY }}
            className="absolute -left-[350px] top-[-137px] py-10"
          >
            <motion.img
              src={StarImage.src}
              alt="Star"
              width={360}
              height={360} 
            />
          </motion.div>
          <motion.div
            style={{ translateY }}
            className="absolute -right-[331px] -top-[19px]"
          >
            <motion.img
              src={SpringImage.src}
              alt="Spring"
              width={360}
              height={360} 
            />
          </motion.div>
        </div>
        <div className="flex gap-2 mt-10 justify-center">
        <Link href="/signup">
              <button className="btn btn-primary hover:bg-[#001E80] border-none">
                Get started
              </button></Link>
          <button className="btn border-black flex items-center">
            <span className="me-1">How it works?</span>
            <ArrowRight className="h-5 w-5" width={20} height={20} />
          </button>
        </div>
      </div>
    </section>
  );
};