"use client"; 
import { useState } from "react";
import Logo from "@/app/public/assets/logo1.png";
import Image from "next/image";
import MenuIcon from "@/app/public/assets/menu.svg";
import Download from "@/app/public/assets/download.svg";
import Link from "next/link";

export const Header = ({ isRegisterPage = false, isLoginPage = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 backdrop-blur-sm z-50">
      <div className="py-3">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </Link>
          {/* Botón del menú para la versión responsive */}
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          {/* Menú de navegación en versión desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {isRegisterPage ? (
              <>
                <Link href="/">Home</Link>
                <Link href="/login" className="underline">
                  Log In
                </Link>
              </>
            ) : isLoginPage ? (
              <>
                <Link href="/">Home</Link>
                <Link href="/signup" className="underline">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link href="#features">Features</Link>
                <Link href="#about">About</Link>
                <Link href="#testimonials">Testimonials</Link>
                <Link href="#contact">Contact Us</Link>
                <Link href="/signup" className="underline">
                  Sign Up
                </Link>
              </>
            )}
            <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight">
              Get the app
              <Download className="h-4 w-4 ml-2" />
            </button>
          </nav>

          {/* Menú responsive */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-[#EAEEFE] shadow-md py-4 md:hidden">
              <nav className="flex flex-col items-center gap-4">
                {isRegisterPage ? (
                  <>
                    <Link href="/">Home</Link>
                    <Link href="/login" className="underline">
                      Log In
                    </Link>
                  </>
                ) : isLoginPage ? (
                  <>
                    <Link href="/">Home</Link>
                    <Link href="/signup" className="underline">
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="#features">Features</Link>
                    <Link href="#about">About</Link>
                    <Link href="#testimonials">Testimonials</Link>
                    <Link href="#contact">Contact Us</Link>
                    <Link href="/signup" className="underline">
                      Sign Up
                    </Link>
                  </>
                )}
                <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight">
                  Get the app
                  <Download className="h-4 w-4 ml-2" />
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};