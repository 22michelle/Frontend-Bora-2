import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/Logo1.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";
import Dowload from "@/assets/download.svg";

export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-50">
      <div className="py-3">
        <div className="container">
          <div className="flex items-center justify-between">
            <Image src={Logo} alt="Logo" width={40} height={40} />
            <MenuIcon className="h-5 w-5 md:hidden" />
            <nav className="hidden md:flex gap-6  items-center">
              <a href="#">About</a>
              <a href="#">Feaures</a>
              <a href="#">Customers</a>
              <a href="#">Updates</a>
              <a href="#">Help</a>
              <a href="#" className="underline">
                Sign Up
              </a>
              <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight">
                Get the app
                <Dowload className="h-4 w-4 ml-2" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
