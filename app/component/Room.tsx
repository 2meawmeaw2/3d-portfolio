"use client";
import React, { useRef, useEffect, useState } from "react";
import { Screen } from "@/public/Screen";
import { gsap } from "gsap";
import { OrbitControls } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { useThree } from "@react-three/fiber";
import { Mesh } from "three";
gsap.registerPlugin(useGSAP);

export const Roomw = () => {
  const viewport = useThree((state) => state.viewport);
  const screen = useRef<Mesh>(null); // define ref at top level

  const [factors, setFactors] = useState({
    scaleFactor: 1.5,
    xFactor: 1,
    yFactor: 1,
  });

  useEffect(() => {
    const computeFactors = () => {
      const width = window.innerWidth;
      const scaleFactor = Math.min(Math.max(width / 1490, 1.5), 2);
      const xFactor = Math.min(Math.max(viewport.width / 1490, 1.7), 0.8);
      const yFactor = Math.min(Math.max(viewport.width / 1490, 1.5), 1);
      setFactors({ scaleFactor, xFactor, yFactor });
    };

    computeFactors();
    window.addEventListener("resize", computeFactors);
    return () => window.removeEventListener("resize", computeFactors);
  }, [viewport.width]);

  return (
    <group
      position={[4 * factors.xFactor, -2 * factors.yFactor, 0]}
      scale={0.8 * factors.scaleFactor}
    >
      <ambientLight intensity={4} />
      <ambientLight intensity={10} color={"#155cfb"} />
      <directionalLight
        castShadow
        intensity={5}
        color={"#155cfb"}
        position={[0, 4, 0]}
      />
      <directionalLight
        intensity={5}
        color={"#155cfb"}
        position={[0, 4, 2]}
        castShadow
      />

      <color attach="background" args={["#000000"]} />
      <Screen ref={screen} />
    </group>
  );
};
