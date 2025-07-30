"use client";
import { OrbitControls, View } from "@react-three/drei";
import { Roomw } from "../component/Room";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
export default function Hero() {
  useGSAP(() => {
    gsap.to(".view", { y: window.innerHeight, duration: 5, rotateX: 180 });
  });
  return (
    <>
      <section id="Hero" className="h-[100vh] relative w-full flex items-end ">
        <div className="w-full h-[20%] rounded-[100%] bg-[#91919135] blur-[10vw] absolute top-0 left-0 " />
        <div className="w-full h-[20%] rounded-[100%] bg-[#3741FF31] blur-[10vw] absolute bottom-0 left-0 " />

        <div className="flex relative flex-col lg:flex-row items-center justify-center lg:justify-between w-full h-[90vh]  text-white max-w-[1800px] mx-auto">
          <div className="absolute left-0  z-90 w-[50%] p-20 border-blue/20 border-1 bg-black/20 rounded-[10%]  h-[50%] flex flex-col justify-center items-center lg:items-start gap-10">
            <div className="work px-7 py-2 rounded-full text-blue border-1  font-bold font-outfit">
              ● Available for work
            </div>
            <h1 className="text-5xl name-shadow text-white font-bold">
              Hi , I am{" "}
              <span className="name-stroke text-transparent [text-shadow:_6px_0px_40px_rgb(13_61_255_/_1.00)] ">
                Taha
              </span>
            </h1>
            <p className="name-shadow text-center lg:text-start">
              ADD GLOW TO THE ENTIRE DIV of the printing and typesetting <br />
              industry. Lorem Ipsum has been the industry&apos;s standard
            </p>

            <button className=" px-7 py-2 rounded-full bg-white text-black   font-bold font-outfit">
              Check my work
            </button>
          </div>
          <View className="absolute  left-1/2 -translate-x-[50%]  w-[100vw]  h-[100vh]  ">
            <axesHelper />
            <Roomw />{" "}
            <OrbitControls
              target={[0, 0, 0]}
              // point camera looks at
              maxPolarAngle={Math.PI / 2} // vertical limit (0 = top, π = bottom)
              minPolarAngle={Math.PI / 3} // upward limit
              maxAzimuthAngle={Math.PI / 6} // horizontal right limit
              minAzimuthAngle={-Math.PI / 6}
              enableZoom={false}
            />
          </View>
        </div>
      </section>
    </>
  );
}
