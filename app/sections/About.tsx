import { View } from "@react-three/drei";
import React from "react";

import { AboutScene } from "../component/aboutScene";
const About = () => {
  return (
    <section
      id="About"
      className={`h-[100vh] fixed top-0 bg-black z-60 w-full overflow-y-clip p-10 flex justify-center items-center `}
    >
      <div className="w-full h-full bg-black  absolute inset-0" />

      {/* Background elements remain unchanged */}
      <div className="w-full -z-10 h-[100%] bg-white/2 blur-[700px] absolute top-0 left-0" />
      <div className="w-full -z-10 h-[9%] rounded-[100%] bg-[#3741FF] blur-[746.1px] absolute top-0 left-0" />
      <div className="w-full -z-10 h-[9%] rounded-[100%] bg-[#3741FF] blur-[746.1px] absolute bottom-0 left-0" />

      {/* Single View container */}
      <View className="w-full h-full absolute z-60">
        <color attach="background" args={["black"]} />
        <AboutScene />
      </View>
    </section>
  );
};
export default About;
