"use client";
import { View } from "@react-three/drei";
import React from "react";
import Text from "../component/Text";

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
      <View className="w-full h-full absolute">
        {/* Global lighting */}
        <directionalLight position={[0.1, 0, 2]} intensity={10} />
        <ambientLight intensity={1.5} />
        <directionalLight
          castShadow
          intensity={5}
          color="#03e7f1"
          position={[0, 4, 0]}
        />
        <directionalLight
          intensity={10}
          color="#155cfb"
          position={[0, 0, 4]}
          castShadow
        />

        {/* Central text elements */}
        <Text
          position={[-1, 1, 0]}
          scale={1}
          word="I don't only Code"
          float={false}
          rotation={[0, 0, 0]}
          color="#181929"
        />
        <Text
          position={[1, -1, 0]}
          scale={0.9}
          word="I Create Experiences"
          float={false}
          rotation={[0, 0, 0]}
          color="#181929"
        />

        {/* Corner text elements with positioning and rotation */}
        <Text
          position={[-4.5, 2.5, -1.5]}
          float={true}
          scale={1}
          word="Conversion"
          color="white"
          rotation={[0, 0, -Math.PI / 6]}
        />
        <Text
          position={[3.5, 1.5, 0]}
          float={true}
          scale={1}
          word="Responsive"
          color="white"
          rotation={[0, 0, Math.PI / 6]}
        />
        <Text
          position={[-3.5, -1.5, 0]}
          float={true}
          scale={1}
          word="Code"
          color="white"
          rotation={[0, 0, Math.PI / 6]}
        />
        <Text
          position={[3.5, 0, -2]}
          float={true}
          scale={1}
          word="UI/UX"
          color="white"
          rotation={[0, 0, -Math.PI / 6]}
        />
      </View>
    </section>
  );
};
export default About;
