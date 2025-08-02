"use client";
import LoaderScreen from "../component2D/Loader";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { Suspense } from "react";

export default function ViewCanvas() {
  return (
    <>
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
        <Suspense fallback={false}>
          <View.Port />
        </Suspense>
      </Canvas>
      <LoaderScreen />
    </>
  );
}
