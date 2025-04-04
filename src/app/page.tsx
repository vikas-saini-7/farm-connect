import AboutUs from "@/components/landing/AboutUs";
import Footer from "@/components/landing/Footer";
// import Categories from "@/components/landing/Categories";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";

import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header/>
      <Hero/>
      <AboutUs/>
      {/* //<Categories/> */}
      <Footer/>
     
    </div>
  );
}
