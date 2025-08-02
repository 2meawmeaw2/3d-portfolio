"use client";
import { OrbitControls, View } from "@react-three/drei";
import { Roomw } from "../component/Room";
import LightRays from "../component2D/light";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function Hero() {
  useGSAP(() => {
    const split = SplitText.create(".texts", { type: "chars" });
    gsap.from(split.chars, {
      delay: 0.5,
      autoAlpha: 0,
      yPercent: 100,
      rotate: 1,
      stagger: { each: 0.007 },
    });
  });

  return (
    <>
      <section
        id="Hero"
        className="h-[100dvh] relative z-20 bg-black/40 rounded-2xl w-full flex items-end overflow-hidden"
      >
        {/* Light Rays Background */}
        <div className="w-full h-full absolute">
          <LightRays
            raysOrigin="top-center"
            raysColor="#155cfb"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
          />
        </div>

        {/* Top/Bottom Blur Effects */}
        <div className="w-full h-[20%] rounded-[100%] bg-[#91919135] blur-[10vw] absolute top-0 left-0" />
        <div className="w-full h-[20%] rounded-[100%] bg-[#3741FF31] blur-[10vw] absolute bottom-0 left-0" />

        {/* Content Container */}
        <div className="flex flex-col  xl:flex-row relative items-center justify-center w-full h-[90%] text-white max-w-[1800px] mx-auto px-4">
          {/* Text Content */}
          <div className="absolute top-0 xl:left-10 xl:top-[50%] xl:-translate-y-[50%] z-30 w-[90%] h-[40%] bg-black/20 border-blue/80 border-1 xl:w-[50%] p-4 xl:p-20  rounded-2xl flex flex-col justify-center items-center xl:items-start gap-4 xl:gap-10 backdrop-blur-sm">
            <div className="texts text-sm md:text-base work px-4 py-1 xl:px-7 xl:py-2 rounded-full text-blue border font-bold font-outfit">
              ● Available for work
            </div>

            <h1 className="texts text-3xl md:text-5xl xl:text-6xl text-white font-bold text-center xl:text-left leading-tight">
              Hi, I am{" "}
              <span className="name-stroke text-transparent [text-shadow:_3px_0px_20px_rgb(13_61_255_/_1.00)] xl:[text-shadow:_6px_0px_40px_rgb(13_61_255_/_1.00)]">
                Taha
              </span>
            </h1>

            <p className="texts text-xs md:text-sm text-center xl:text-start opacity-80">
              ADD GLOW TO THE ENTIRE DIV of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard
            </p>

            <button className="texts text-sm md:text-base px-5 py-2 rounded-full bg-white text-black font-bold font-outfit mt-2 xl:mt-0">
              Check my work
            </button>
          </div>

          <View className="z-10 w-full h-[100vh] xl:w-[100vw]  xl:h-[100vh] absolute left-0 xl:left-1/2 xl:-translate-x-[50%]">
            <Roomw />
          </View>
        </div>
      </section>
    </>
  );
}
