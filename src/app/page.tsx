import { SignUpFree } from "@/sections/SignUpFree";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { Testimonials } from "@/sections/Testimonials";
import ContactUs from "@/sections/ContactUs";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Testimonials/>
      <ContactUs/>
      <SignUpFree/>
      <Footer/>
    </>
  );
}
