"use client";
import Hero from "./Hero";
import About from "./About";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);
const Mix = () => {
  useGSAP(() => {
    gsap.to("#Hero", {
      scrollTrigger: {
        trigger: "#Mix",
        start: "top top",
        end: "bottom start",
        scrub: 1,
      },

      yPercent: -100,
      scale: 0.1,
    });
    gsap.to("#Hero", {
      scrollTrigger: {
        trigger: "#Mix",
        start: "top top",
        end: "20% top",
        scrub: 1,
      },

      borderWidth: "4px",
      borderColor: "#ffffff",
      borderStyle: "solid",
    });
    gsap.to("#About", {
      scrollTrigger: {
        trigger: "#About",
        start: "-40% bottom",
        end: "-20% bottom",
        scrub: 1,
      },

      yPercent: -50,
    });
  });

  return (
    <div id="Mix" className="relative holder ">
      <Hero />
      <About />
      <div className="bg-black absolute bottom-0 h-[90vh] w-full z-10 opacity-85 ">
        <div className="absolute -bottom-1/2 blur-[300px] rounded-full w-full  h-100 bg-white/40 left-1/2 -translate-x-[50%]" />
      </div>
    </div>
  );
};
export default Mix;
