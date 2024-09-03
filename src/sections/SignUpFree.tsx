"use client";
import ArrowRight from "@/assets/arrow-right.svg";
import StarImage from "@/assets/star.png";
import SpringImage from "@/assets/spring.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const SignUpFree = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-clip"
    >
      <div className="container">
        <div className="section-heading relative">
          <h2 className="section-title">Sign Up for free today</h2>
          <p className="section-description mt-5">
            Join Bora today and experience seamless banking! Sign up for free
            and start managing your transactions effortlessly.
          </p>
          <motion.img
            src={StarImage.src}
            alt="Star"
            width={360}
            className="absolute -left-[350px] top-[-137px] py-10"
            style={{
              translateY,
            }}
          />
          <motion.img
            src={SpringImage.src}
            alt="Spring"
            width={360}
            className="absolute -right-[331px] -top-[19px]"
            style={{
              translateY,
            }}
          />
        </div>
        <div className="flex gap-2 mt-10 justify-center">
          <button className="btn btn-primary gap-2">Get Started</button>
          <button className="btn border-black">
            <span className="me-1">How it works?</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
