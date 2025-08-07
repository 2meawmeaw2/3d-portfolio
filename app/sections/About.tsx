"use client";
import React from "react";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const split = new SplitText(".animated-text", { type: "words,chars" });
    const split2 = new SplitText(".animated-text2", { type: "words,chars" });

    gsap.fromTo(
      ".container-about-1",
      {
        textShadow: "0px -1px 10px #00000080",
        color: "#000000",
        borderColor: "#000000",
        boxShadow: "0 0 0px #000000",
      },
      {
        scrollTrigger: {
          trigger: "#Mix",
          start: "35% center",
          end: "40% center",
          toggleActions: "play none reverse none",
          invalidateOnRefresh: true,
        },
        textShadow: "0px -1px 10px #FFFFFF80",
        color: "#ffffff",
        delay: 3,
        borderColor: "#ffffff",
        boxShadow: "0 0 20px #ffffff",
        duration: 2,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      ".container-about-2",
      {
        textShadow: "0px -1px 10px #00000080",
        color: "#000000",
        borderColor: "#000000",
        boxShadow: "0 0 0px #000000",
      },
      {
        scrollTrigger: {
          trigger: "#Mix",
          start: "50% center",
          end: "60% center",
          toggleActions: "play none reverse none",
          invalidateOnRefresh: true,
        },
        textShadow: "0px -1px 10px #FFFFFF80",
        color: "#ffffff",
        delay: 3,
        borderColor: "#ffffff",
        boxShadow: "0 0 20px #ffffff",
        duration: 2,
        ease: "power2.out",
      }
    );

    gsap.set(split.words, { yPercent: 50, autoAlpha: 0, color: "#155cfb" });

    gsap.to(split.words, {
      scrollTrigger: {
        trigger: "#Mix",
        start: "35% center",
        end: "40% center",
        toggleActions: "play none reverse none",
        invalidateOnRefresh: true,
      },
      scale: 1,
      autoAlpha: 1,
      yPercent: 0,
      color: "#ffffff",
      stagger: { each: 0.01, from: "random" },
      ease: "power2.out",
    });

    gsap.set(split2.words, { yPercent: 50, autoAlpha: 0, color: "#155cfb" });

    gsap.to(split2.words, {
      scrollTrigger: {
        trigger: "#Mix",
        start: "50% center",
        end: "60% center",
        toggleActions: "play none reverse none",
        invalidateOnRefresh: true,
      },
      scale: 1,
      autoAlpha: 1,
      yPercent: 0,
      color: "#ffffff",
      stagger: { each: 0.05, from: "random" },
      ease: "power2.out",
    });
  });

  return (
    <section
      id="About"
      className="h-[140vh] translate-y-[50%] sticky top-0 bg-black z-40 w-full px-4 md:px-10 text-white"
    >
      <div className="w-[40vw] h-[60vh] rounded-[50%] blur-[100vw] bg-[#ffffff] absolute -top-[20%] left-1/2 -translate-x-[50%]" />
      <div className="w-full h-[20%] rounded-[100%] bg-[#ffffff60] blur-[100vw] absolute bottom-0 left-0" />
      <div className="w-full max-w-[1600px] h-full flex flex-col gap-6 md:gap-10 justify-center items-start xl:pl-10 mx-auto">
        <div className="container-about-1 w-full md:w-[50%] max-w-200 max-h-120 h-[40%] overflow-clip rounded-2xl p-6 flex flex-col justify-center">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4 animated-text overflow-clip">
            Who I Am
          </h1>
          <p className="text-base md:text-lg animated-text overflow-clip leading-relaxed">
            I'm a front-end developer focused on motion, clarity, and user
            experience. <br /> I craft fluid interfaces with precise animation,
            responsive layouts, and minimal design. <br /> My work bridges
            aesthetics and usability to build interfaces that feel alive and
            intuitive.
          </p>
        </div>

        <div className="container-about-2 w-full md:w-[50%] max-w-200 max-h-120 h-[40%] overflow-clip rounded-2xl p-6 flex flex-col justify-center">
          <h2 className="text-xl md:text-3xl font-bold tracking-tight mb-4 animated-text2 overflow-clip">
            Core Skills
          </h2>
          <p className="text-base md:text-lg opacity-80 leading-relaxed animated-text2 overflow-clip">
            UI/UX Design Principles <br /> Motion Design <br /> Responsive
            Layouts <br />
            Consistency Performance Optimization
            <br /> State Management Logic <br /> Interactive Prototyping Clean,
            Maintainable Code Structure
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
