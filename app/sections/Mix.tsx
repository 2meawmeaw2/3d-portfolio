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
        trigger: ".holder",
        start: "top top",
        end: "bottom start",
        scrub: 1,
      },

      y: -window.innerHeight / 1.5,
      scale: 0.1,
      xPercent: -50,
    });
    gsap.to("#Hero", {
      scrollTrigger: {
        trigger: ".holder",
        start: "top top",
        end: "20% top",
        scrub: 1,
      },

      borderWidth: "4px",
      borderColor: "#ffffff",
      borderStyle: "solid",
    });
    gsap.from("#About", {
      scrollTrigger: {
        trigger: ".holder",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      y: -window.innerHeight / 1.5,
      scale: 0.1,
      xPercent: 50,
    });
  });

  return (
    <div id="Mix" className="relative holder h-[300vh]">
      <div className="sticky top-0 h-[100vh] w-full">
        <Hero />
        <About />
      </div>
    </div>
  );
};
export default Mix;
