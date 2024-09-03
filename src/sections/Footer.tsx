import Logo from "@/assets/Logo2.png";
import Image from "next/image";
import SocialX from "@/assets/social-x.svg";
import SocialInsta from "@/assets/social-insta.svg";
import SocialLinkedIn from "@/assets/social-linkedin.svg";
import SocialYoutube from "@/assets/social-youtube.svg";
import SocialPin from "@/assets/social-pin.svg";

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
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <a href="#">About</a>
          <a href="#">Feaures</a>
          <a href="#">Customers</a>
          <a href="#">Updates</a>
          <a href="#">Help</a>
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
