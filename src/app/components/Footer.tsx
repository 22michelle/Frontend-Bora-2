import Logo from "@/app/public/assets/Logo2.png";
import Image from "next/image";
import SocialX from "@/app/public/assets/social-x.svg";
import SocialInsta from "@/app/public/assets/social-insta.svg";
import SocialLinkedIn from "@/app/public/assets/social-linkedin.svg";
import SocialYoutube from "@/app/public/assets/social-youtube.svg";
import SocialPin from "@/app/public/assets/social-pin.svg";
import SocialReddit from "@/app/public/assets/social-reddit.png";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        <div className="inline-flex relative">
          <div className="relative before:content-[''] before:absolute before:inset-0 before:bg-white before:opacity-20 before:blur-lg before:rounded-lg">
            <Image
              src={Logo}
              height={40}
              alt="Logo"
              className="relative z-10"
            />
          </div>
        </div>
        <a target="_blank" href="https://www.oasis-of-ideas.com/ideas/building-cooperative-networks-of-digital-transactions/">
          <p className="mt-6 underline flex items-center justify-center">
            <Image alt="" src={SocialReddit} className="mr-2 w-6 h-6" />
            This is a functional Demo of the idea proposed
          </p>
        </a>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <Link href="#features">Features</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact Us</Link>
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <SocialInsta />
          <SocialLinkedIn />
          <SocialX />
          <SocialPin />
          <SocialYoutube />
        </div>
        <p className="mt-6">
          &copy; {new Date().getFullYear()} Bora. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};