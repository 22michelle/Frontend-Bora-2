"use client";
import { useState } from "react";
import Logo from "@/app/public/assets/logo1.png";
import Image from "next/image";
import MenuIcon from "@/app/public/assets/menu.svg";
import Download from "@/app/public/assets/download.svg";
import Logout from "@/app/public/assets/logout.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header = ({ isDashboardPage = false, isLoginPage = false, isSignupPage = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    router.push("/login"); 
  };

  return (
    <header className="sticky top-0 backdrop-blur-sm z-50">
      <div className="py-3">
        <div className="container mx-auto flex items-center justify-between">
        {isDashboardPage ? (
            <Image
              src={Logo}
              alt="Logo"
              width={40}
              height={40}
            />
          ) : (
            <Link href="/">
              <Image
                src={Logo}
                alt="Logo"
                width={40}
                height={40}
                className="cursor-pointer"
              />
            </Link>
          )}
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {isDashboardPage ? (
              <button 
                onClick={handleLogout} 
                className="btn btn-primary hover:bg-[#001E80] py-2 px-4 rounded-lg transition duration-300"
              >
                Logout
                <Logout className="h-4 w-4 ml-2" />
              </button>
            ) : isLoginPage ? (
              <>
                <Link href="/" className="" onClick={closeMenu}>Home</Link>
                <Link href="/signup" className="underline text-[#001E80] sm:font-bold">Sign Up</Link>
                <Link href="/">
                <button className="btn btn-primary hover:bg-[#001E80] text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight" onClick={closeMenu}>
                  Get the app
                <Download className="h-4 w-4 ml-2" />
                </button> 
                </Link>
              </>
            ) : isSignupPage ? (
              <>
                <Link href="/" className="" onClick={closeMenu}>Home</Link>
                <Link href="/login" className="underline text-[#001E80] sm:font-bold">Log In</Link>
                <Link href="/">
                <button className="btn btn-primary hover:bg-[#001E80] text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight" onClick={closeMenu}>
                  Get the app
                <Download className="h-4 w-4 ml-2" />
                </button> 
                </Link>
              </>
            ) : (
              <>
                <Link href="#features">Features</Link>
                {/* <Link href="#testimonials">Testimonials</Link> */}
                <Link href="#contact">Contact Us</Link>
                <Link href="/signup" className="underline text-[#001E80] sm:font-bold">Sign Up</Link>
                <Link href="/login" className="underline text-[#001E80] sm:font-bold">Log In</Link>
                <Link href="/">
                <button className="btn btn-primary hover:bg-[#001E80] text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight" onClick={closeMenu}>
                  Get the app
                <Download className="h-4 w-4 ml-2" />
                </button> 
                </Link>
              </>
            )}
          </nav>

          {/* Menú responsive */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-[#EAEEFE] shadow-md py-4 md:hidden">
              <nav className="flex flex-col items-center gap-4">
                {isDashboardPage ? (
                  <button 
                    onClick={() => { handleLogout(); closeMenu(); }} 
                    className="btn btn-primary hover:bg-[#001E80] py-2 px-4 rounded-lg transition duration-300"
                  >
                    Logout
                    <Logout className="h-4 w-4 ml-2" />
                  </button>
                ) : isLoginPage ? (
                  <>
                    <Link href="/" className="" onClick={closeMenu}>Home</Link>
                    <Link href="/signup" className="underline text-[#001E80] sm:font-bold" onClick={closeMenu}>Sign Up</Link>
                    <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight" onClick={closeMenu}>
                      Get the app
                      <Download className="h-4 w-4 ml-2" />
                    </button>
                  </>
                ) : isSignupPage ? (
                  <>
                    <Link href="/" className="" onClick={closeMenu}>Home</Link>
                    <Link href="/login" className="underline text-[#001E80] sm:font-bold" onClick={closeMenu}>Log In</Link>
                    <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight" onClick={closeMenu}>
                      Get the app
                      <Download className="h-4 w-4 ml-2" />
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="#features" onClick={closeMenu}>Features</Link>
                    {/* <Link href="#testimonials" onClick={closeMenu}>Testimonials</Link> */}
                    <Link href="#contact" onClick={closeMenu}>Contact Us</Link>
                    <Link href="/signup" className="underline text-[#001E80] sm:font-bold" onClick={closeMenu}>Sign Up</Link>
                    <Link href="/login" className="underline text-[#001E80] sm:font-bold">Log In</Link>
                    <Link href="/">
                   <button className="btn btn-primary hover:bg-[#001E80] text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight" onClick={closeMenu}>
                      Get the app
                      <Download className="h-4 w-4 ml-2" />
                    </button> 
                    </Link>
                    
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}