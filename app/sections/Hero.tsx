"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import GSDevTools from "gsap/GSDevTools";
gsap.registerPlugin(useGSAP, ScrollTrigger, GSDevTools, SplitText);

export default function Hero() {
  useGSAP(() => {
    const split = SplitText.create(".texts", { type: "lines" });
    gsap.from(split.lines, {
      autoAlpha: 0,
      yPercent: 50,
      duration: 1.5,
      delay: 3,
      stagger: { each: 0.007 },
    });

    gsap.fromTo(
      ".container-hero-1",
      {
        textShadow: "0px -1px 10px #00000080",
        color: "#000000",
        borderColor: "#000000",
        boxShadow: "0 0 0px #000000",
      },
      {
        textShadow: "0px -1px 10px #FFFFFF80",
        color: "#ffffff",
        delay: 3,
        borderColor: "#ffffff",
        boxShadow: "0 0 20px #ffffff",
        duration: 2,
        ease: "power2.out",
      }
    );
  });
  return (
    <>
      <section
        id="Hero"
        className="h-[100vh] relative z-20 bg-black rounded-2xl w-full flex items-center overflow-hidden"
      >
        {/* Light Rays Background */}

        {/* Top/Bottom Blur Effects */}
        <div className="w-[40vw] h-[60vh] rounded-[50%] blur-[100vw] bg-[#ffffff]  absolute -top-[20%] left-1/2 -translate-x-[50%]" />
        <div className="w-full h-[20%] rounded-[100%] bg-[#ffffff20] blur-[100vw] absolute bottom-0 left-0" />

        <div className="container-hero-1 w-[100%] max-w-200 h-[40%] border overflow-clip border-white rounded-2xl p-6 flex flex-col justify-center  absolute top-0 my-[20vh] left-1/2 -translate-x-[50%] ">
          <div className="md:text-lg text-md texts hero-text px-7 py-2 rounded-full border font-bold font-outfit max-w-60 h-10 flex justify-center items-center mx-auto text-center  bg-[#232323]">
            ● Available for work
          </div>

          <div className=" w-[100%] texts max-w-150 mx-auto  h-50 flex justify-center items-center flex-col">
            <h1 className="font-medium text-4xl  pr-20 hero-text  leading-relaxed ">
              Turning Visions
            </h1>
            <h1 className="text-4xl text-nowrap texts font-medium  pl-20  hero-text  leading-relaxed ">
              Into Web Reality
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}
