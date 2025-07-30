"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

export default function ViewCanvas() {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
      }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      camera={{
        fov: 75,
      }}
    >
      <View.Port />
    </Canvas>
  );
}
