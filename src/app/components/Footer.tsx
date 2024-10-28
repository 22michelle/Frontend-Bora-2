import Logo from "@/app/public/assets/Logo2.png";
import Image from "next/image";
import SocialX from "@/app/public/assets/social-x.svg";
import SocialInsta from "@/app/public/assets/social-insta.svg";
import SocialLinkedIn from "@/app/public/assets/social-linkedin.svg";
import SocialYoutube from "@/app/public/assets/social-youtube.svg";
import SocialPin from "@/app/public/assets/social-pin.svg";
import SocialReddit from "@/app/public/assets/social-reddit.png";
import SocialOasis from "@/app/public/assets/social-Oasis.png";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10">
      <div className="container mx-auto text-center">
        {/* Logo Section */}
        <div className="inline-flex relative mb-6">
          <div className="relative before:content-[''] before:absolute before:inset-0 before:bg-white before:opacity-20 before:blur-lg before:rounded-lg">
            <Image
              src={Logo}
              height={40}
              alt="Logo"
              className="relative z-10"
            />
          </div>
        </div>

        {/* Demo Description */}
        <p className="mt-6">
          This is a functional demo to the idea proposed at
        </p>

        {/* Social Links Section */}
        <div className="flex justify-center items-center gap-6 mt-6">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.oasis-of-ideas.com/ideas/building-cooperative-networks-of-digital-transactions/"
            className="flex items-center"
          >
            <Image alt="Oasis" src={SocialOasis} className="w-8 h-8 md:w-6 md:h-6" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.reddit.com/r/fintech/comments/1d2s7u4/resilience_cooperative_transaction_networks/"
            className="flex items-center"
          >
            <Image alt="Reddit" src={SocialReddit} className="w-8 h-8 md:w-6 md:h-6" />
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <Link href="#features">Features</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact Us</Link>
        </nav>

        {/* Copyright Section */}
        <p className="mt-6">
          &copy; {new Date().getFullYear()} Bora. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};