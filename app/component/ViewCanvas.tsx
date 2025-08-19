"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { Robot } from "@/public/robot";

import { Environment, Float } from "@react-three/drei";

// Register on the client

export function Scene(): React.JSX.Element {
  return (
    <Canvas
      camera={{ fov: 75, position: [0, 0, 5] }}
      dpr={1}
      style={{ zIndex: 60 }}
      gl={{
        antialias: true,
        toneMapping: ACESFilmicToneMapping,
        outputColorSpace: SRGBColorSpace,
        powerPreference: "high-performance",
      }}
    >
      <Float
        speed={2}
        rotationIntensity={2}
        floatIntensity={1}
        floatingRange={[-0.5, 0.5]}
      >
        <group scale={0.04}>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <ambientLight intensity={11} />
            <Robot />
          </Suspense>
        </group>
      </Float>
    </Canvas>
  );
}
