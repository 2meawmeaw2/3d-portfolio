import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useToggleStore } from "../app/zustand";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register on the client
gsap.registerPlugin(ScrollTrigger, useGSAP);
export function Robot({ ...rest }) {
  const { nodes, materials } = useGLTF("/Untitled.gltf");
  const groupRef = useRef();

  useGSAP(() => {
    if (!groupRef.current) return;

    gsap.to(groupRef.current.rotation, {
      scrollTrigger: {
        trigger: "#About",
        start: "40% center",
        end: "100% center",
        scrub: 1.1,
      },
      x: Math.PI,
      y: 3 * Math.PI,
      ease: "power1.inOut",
    });
  });
  return (
    <group ref={groupRef} position={[0, 0, 0]} {...rest} dispose={null}>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials.Acetal_Resin_White_2}
        position={[-9.034, 10.417, 0.11]}
        rotation={[-3.002, 0, 0]}
        scale={0.75}
      />
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials.ABS_White}
        position={[-9.034, 10.417, 0.11]}
        rotation={[-3.002, 0, 0]}
        scale={0.75}
      />
      <mesh
        geometry={nodes.Object_5.geometry}
        material={materials.Acetal_Resin_White}
        position={[-9.034, 10.417, 0.11]}
        rotation={[-3.002, 0, 0]}
        scale={0.75}
      />
      <mesh
        geometry={nodes.Object_6.geometry}
        material={materials.Acetal_Resin_White}
        position={[-9.034, 10.417, 0.11]}
        rotation={[-3.002, 0, 0]}
        scale={0.75}
      />
      <mesh
        geometry={nodes.Object_7.geometry}
        material={materials.Acetal_Resin_White_1}
        position={[-9.034, 10.417, 0.11]}
        rotation={[-3.002, 0, 0]}
        scale={0.75}
      />
      <mesh
        geometry={nodes.Object_8.geometry}
        material={materials["Aluminum_-_Anodized_Rough_Grey"]}
        position={[-9.034, 10.417, 0.11]}
        rotation={[-3.002, 0, 0]}
        scale={0.75}
      />
    </group>
  );
}

useGLTF.preload("/Untitled.gltf");
