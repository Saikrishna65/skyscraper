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
import Scale from "./components/Scale";

export default function PageClient() {
  useEffect(() => {
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
      <Scale />
      <Construction />
      <Inside />
      <Materials />
      <SingleDay />
      <Footer />
    </>
  );
}
