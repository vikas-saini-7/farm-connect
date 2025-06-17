'use client'

import Explore from "@/components/landing/Explore";
import Faq from "@/components/landing/Faq";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Reviews from "@/components/landing/Reviews";

export default function Home() {  
  return (
    <div>
      <Header/>
      <Hero/>
      <Explore/>
      <HowItWorks/>
      <Reviews/>
      <Faq/>
      <Footer/>
     
    </div>
  );
}
