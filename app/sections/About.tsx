"use client";
import { View } from "@react-three/drei";
import React from "react";
import Text from "../component/Text";
import { Float } from "@react-three/drei";

const About = () => {
  return (
    <section
      id="About"
      className="h-[100vh]  relative z-10 w-full outline-1 overflow-y-clip outline-amber-300 p-10 flex justify-center items-center "
    >
      <div className="w-full -z-10 h-[100%]  bg-white/2 blur-[700px]  absolute top-0 left-0 " />

      <div className="w-full -z-10 h-[9%] rounded-[100%] bg-[#3741FF] blur-[746.1px] absolute top-0 left-0 " />
      <div className="w-full -z-10 h-[9%] rounded-[100%] bg-[#3741FF] blur-[746.1px] absolute bottom-0 left-0 " />
      <div className="flex justify-center w-full items-center ">
        <View className=" h-[60vh] w-full flex flex-col justify-center">
          <Text
            position={[-1, 1, 0]}
            scale={1}
            word="I don't only Code"
            float={false}
            color="#181929"
          />
          <Text
            position={[1, -1, 0]}
            scale={0.9}
            word="I Create Experiences"
            float={false}
            color="#181929"
          />{" "}
          <Float speed={3} floatIntensity={5} rotationIntensity={1}>
            <directionalLight position={[0.1, 0, 2]} intensity={25} />
          </Float>
        </View>
      </div>

      <View className="w-[20%]  h-[5%]  absolute z-50 top-70 left-50 -rotate-30 ">
        <directionalLight position={[0.1, 0, 2]} intensity={1.5} />
        <Text
          position={[0, 0, 0]}
          float={true}
          scale={1}
          word="Conversion"
          color="white"
        />
      </View>
      <View className="w-[20%]  h-[5%]  absolute z-50 top-70 right-50 rotate-30 ">
        <directionalLight position={[0.1, 0, 2]} intensity={1.5} />
        <Text
          position={[0, 0, 0]}
          float={true}
          scale={1}
          word="Responsive"
          color="white"
        />
      </View>

      <View className="w-[20%]  h-[5%]  absolute z-50 bottom-70 left-50 rotate-30 ">
        <directionalLight position={[0.1, 0, 2]} intensity={1.5} />
        <Text
          position={[0, 0, 0]}
          float={true}
          scale={1}
          word="Code"
          color="white"
        />
      </View>
      <View className="w-[20%]  h-[5%]  absolute z-50 bottom-70 right-50 -rotate-30 ">
        <directionalLight position={[0.1, 0, 2]} intensity={1.5} />
        <Text
          position={[0, 0, 0]}
          float={true}
          scale={1}
          word="UI/UX"
          color="white"
        />
      </View>
    </section>
  );
};
export default About;
