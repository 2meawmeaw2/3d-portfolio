"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import GSDevTools from "gsap/GSDevTools";
import { useToggleStore } from "../zustand";
gsap.registerPlugin(useGSAP, ScrollTrigger, GSDevTools, SplitText);

export default function Hero() {
  const { isOpen } = useToggleStore();
  // close
  useGSAP(
    () => {
      if (!isOpen) return;
      gsap.fromTo(
        ".nav-bar-glow",
        {
          textShadow: "0px -1px 10px #00000080",
          color: "#000000",
        },
        {
          textShadow: "0px -1px 10px #FFFFFF80",
          color: "#ffffff",
          delay: 1.25,
          duration: 1.5,
          ease: "power2.out",
        }
      );
      gsap.fromTo(
        ".contact-button",
        {
          textShadow: "0px -1px 10px #00000080",
          color: "#000000",
          backgroundColor: "#000000",
        },
        {
          backgroundColor: "#ffffff",

          textShadow: "0px -1px 10px #00000080",
          color: "#000000",
          delay: 1.25,
          duration: 0.1,
          ease: "power2.out",
        }
      );
      gsap.fromTo(
        ".container-hero-1",
        {
          scrollTrigger: ".container-hero-1",
          textShadow: "0px -1px 10px #00000080",
          color: "#000000",
          borderColor: "#000000",
          boxShadow: "0 0 0px #000000",
        },
        {
          textShadow: "0px -1px 10px #FFFFFF80",
          color: "#ffffff",
          delay: 1.25,
          borderColor: "#ffffff",
          boxShadow: "0 0 20px #ffffff",
          duration: 2,
          ease: "power2.out",
        }
      );
    },
    { dependencies: [isOpen] }
  );
  return (
    <>
      <section
        id="Hero"
        className="min-h-[100svh] relative z-20 bg-black rounded-2xl w-full flex items-center overflow-hidden px-4 sm:px-6 pt-6 sm:pt-10 pb-[30vh] sm:pb-[40vh] md:pb-[38vh] xl:pb-[35vh]"
      >
        {/* Light Rays Background */}

        {/* Top/Bottom Blur Effects */}
        <div className="w-[85vw] sm:w-[55vw] h-[24vh] sm:h-[50vh] rounded-[50%] blur-[40vw] sm:blur-[80vw] bg-[#ffffff] absolute -top-[10%] sm:-top-[18%] left-1/2 -translate-x-[50%]" />
        <div className="w-full h-[12%] sm:h-[18%] rounded-[100%] bg-[#ffffff20] blur-[50vw] sm:blur-[80vw] absolute bottom-0 left-0" />

        <div className="container-hero-1 w-full max-w-[1100px] border overflow-clip border-white/20 rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-center mx-auto mt-4 sm:mt-8 gap-6 sm:gap-8 ">
          <div className="text-sm sm:text-base md:text-lg texts hero-text px-5 sm:px-7 py-2 rounded-full border border-white/20 font-bold font-outfit max-w-[14rem] sm:max-w-60 h-10 flex justify-center items-center mx-auto text-center bg-[#232323] mb-2 sm:mb-4">
            ● Available for work
          </div>

          <div className="w-full texts max-w-[900px] mx-auto flex justify-center items-center flex-col text-center gap-3 sm:gap-4 md:gap-6">
            <h1 className="w-full font-medium hero-text leading-snug text-[clamp(2rem,7vw,4rem)] inline-block transform-gpu -translate-x-[8%] sm:-translate-x-[12%] md:-translate-x-[16%]">
              Turning Visions
            </h1>
            <h1 className="w-full hero-text font-medium leading-snug text-[clamp(2rem,7vw,4rem)] inline-block transform-gpu translate-x-[8%] sm:translate-x-[12%] md:translate-x-[16%] whitespace-normal md:whitespace-nowrap">
              Into Web Reality
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}
