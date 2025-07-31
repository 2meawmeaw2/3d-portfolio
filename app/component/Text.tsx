"use client";
import React from "react";
import { Center, Text3D, Float } from "@react-three/drei";
type Props = {
  word: string;
  float: boolean;
  position: Array<number>;
  scale: number;
  color: string;
};

const Text = (props: Props) => {
  const floatOptions = props.float
    ? { floatIntensity: 5, speed: 2, rotationIntensity: 1 }
    : { floatIntensity: 0, speed: 0, rotationIntensity: 0 };
  return (
    <Float
      scale={0.5}
      {...floatOptions}
      position={[props.position[0], props.position[1], props.position[2]]}
    >
      <group>
        {" "}
        <Center position={[0, 0, 0]}>
          <Text3D
            curveSegments={40}
            bevelEnabled
            bevelSize={0.1}
            bevelThickness={0.3}
            height={0.6}
            lineHeight={0.5}
            letterSpacing={0.01}
            size={props.scale}
            font="/outfit.json"
          >
            {props.word}
            <meshStandardMaterial
              metalness={0.9}
              roughness={0.6}
              color={props.color}
            />
          </Text3D>
        </Center>
      </group>
    </Float>
  );
};
export default Text;
