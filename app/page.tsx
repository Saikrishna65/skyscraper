import React from "react";
import Hero from "./components/Hero";
import Construction from "./components/Construction";
import Inside from "./components/Inside";
import Materials from "./components/Materials";
import SingleDay from "./components/SingleDay";

const page = () => {
  return (
    <>
      <Hero />
      <Construction />
      <Inside />
      <Materials />
      <SingleDay />
      <div className="w-full h-screen bg-[#f2f0ec]"></div>
    </>
  );
};

export default page;
