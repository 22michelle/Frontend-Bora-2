import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Hero } from "@/app/components/Hero";
import { Feature } from "@/app/components/Feature";
// import { Testimonials } from "@/app/components/Testimonials";
import ContactUs from "@/app/components/ContactUs";
import { SignUpFree } from "@/app/components/SignUpFree";
import { Tutorial } from "./components/Tutorial";

export default function Home() {
  return (
    <main>
      <Header isSignupPage={false} />
      <Hero />
      <Feature id="features" />
      <Tutorial id="tutorial"/>
      {/* <About id="about" /> */}
      {/* <Testimonials id="testimonials" /> */}
      <ContactUs id="contact" />
      <SignUpFree />
      <Footer />
    </main>
  );
};