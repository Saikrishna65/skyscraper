"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "./components/Hero";
import Construction from "./components/Construction";
import Inside from "./components/Inside";
import Materials from "./components/Materials";
import SingleDay from "./components/SingleDay";
import AutoScrollRecorder from "./hooks/scroll";
import Final from "./components/Final";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  useEffect(() => {
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    ScrollTrigger.normalizeScroll(true);
  }, []);

  return (
    <>
      {/* <AutoScrollRecorder /> */}
      <Hero />
      <Construction />
      <Inside />
      <Materials />
      <SingleDay />
      <Final />
      <div className="w-full h-[50vh] bg-[#f2f0ec]"></div>
    </>
  );
};

export default Page;
