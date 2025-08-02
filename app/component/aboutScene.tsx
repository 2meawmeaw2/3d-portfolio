"use client";
import React, { useRef, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Mesh } from "three";
import Text from "./Text";
export const AboutScene = () => {
  const viewport = useThree((state) => state.viewport);
  const [isMobile, setIsMobile] = useState(false);
  const [factors, setFactors] = useState({
    scaleFactor: 1.5,
    xFactor: 1,
    yFactor: 1,
  });

  useEffect(() => {
    const computeFactors = () => {
      const width = window.innerWidth;
      // Check if mobile (below 768px)
      const mobile = width < 1280;
      setIsMobile(mobile);

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
    <group scale={factors.scaleFactor * 0.4}>
      <directionalLight position={[0.1, 0, 2]} intensity={10} />
      <ambientLight intensity={1.5} />
      <directionalLight
        castShadow
        intensity={5}
        color="#155cfb"
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
        position={[0, 1, 0]}
        scale={1}
        word="I don't only Code"
        float={false}
        rotation={[0, 0, 0]}
        color="#181929"
      />
      <Text
        position={[0, -1, 0]}
        scale={isMobile ? 0.8 : 0.9}
        word="I Create Experiences"
        float={false}
        rotation={[0, 0, 0]}
        color="#181929"
      />

      {/* Corner text elements with positioning and rotation */}
      <Text
        position={isMobile ? [-1, 3.5, -0.5] : [-4.5, 2.5, -1.5]}
        float={true}
        scale={1}
        word="Conversion"
        color="white"
        rotation={[0, 0, -Math.PI / 6]}
      />
      <Text
        position={isMobile ? [1.4, 3.5, 1] : [3.5, 1.5, 0]}
        float={true}
        scale={isMobile ? 0.7 : 1}
        word="Responsive"
        color="white"
        rotation={[0, 0, Math.PI / 6]}
      />
      <Text
        position={isMobile ? [-1.4, -3.5, 1] : [-3.5, -1.5, 0]}
        float={true}
        scale={1}
        word="Code"
        color="white"
        rotation={[0, 0, Math.PI / 6]}
      />
      <Text
        position={isMobile ? [1.4, -3.5, 1] : [-3.5, -1.5, 0]}
        float={true}
        scale={1}
        word="UI/UX"
        color="white"
        rotation={[0, 0, -Math.PI / 6]}
      />
    </group>
  );
};
