import React from "react";
import Hero from "./components/Hero";
import ThirdSection from "./components/Sample";

const page = () => {
  return (
    <>
      <Hero />
      <ThirdSection />
      <div className="w-full h-screen bg-white"></div>
    </>
  );
};

export default page;
