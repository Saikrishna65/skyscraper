"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "./components/Hero";
import Construction from "./components/Construction";
import Materials from "./components/Materials";
import SingleDay from "./components/SingleDay";
import Footer from "./components/Footer";
import Inside from "./components/Inside";

const Page = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    ScrollTrigger.normalizeScroll(true);

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <>
      <Hero />
      <Construction />
      <Inside />
      <Materials />
      <SingleDay />
      <Footer />
    </>
  );
};

export default Page;
