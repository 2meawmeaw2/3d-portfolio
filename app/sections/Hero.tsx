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
        className={`h-[100vh] absolute z-20 bg-black/40  rounded-2xl  w-full flex items-end`}
      >
        <div className="w-[100vw] h-[100vh] absolute">
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

        <div className="w-full h-[20%] rounded-[100%] bg-[#91919135] blur-[10vw] absolute top-0 left-0 " />
        <div className="w-full h-[20%] rounded-[100%] bg-[#3741FF31] blur-[10vw] absolute bottom-0 left-0 " />

        <div className="flex relative  lg:flex-row items-center justify-center lg:justify-between w-full h-[90vh]  text-white max-w-[1800px] mx-auto">
          <div className="absolute left-0  z-90 w-[50%] p-20 border-blue/20 border-1 bg-black/20 rounded-[10%]   lg:h-[50%] flex flex-col justify-center items-center lg:items-start gap-10">
            <div className="texts  text-[1em] work px-7 py-2 rounded-full text-blue border-1  font-bold font-outfit">
              ● Available for work
            </div>
            <h1 className="texts  text-[3.5em] name-shadow text-white font-bold">
              Hi , I am{" "}
              <span className="name-stroke text-transparent [text-shadow:_6px_0px_40px_rgb(13_61_255_/_1.00)] ">
                Taha
              </span>
            </h1>
            <p className="texts  name-shadow text-[1em] text-center lg:text-start">
              ADD GLOW TO THE ENTIRE DIV of the printing and typesetting <br />
              industry. Lorem Ipsum has been the industry&apos;s standard
            </p>

            <button className="texts  text-[1em] px-7 py-2 rounded-full bg-white text-black   font-bold font-outfit">
              Check my work
            </button>
          </div>
          <View className="absolute left-1/2 -translate-x-[50%]   w-[100vw]  h-[100vh]  ">
            <Roomw />{" "}
          </View>
        </div>
      </section>
    </>
  );
}
