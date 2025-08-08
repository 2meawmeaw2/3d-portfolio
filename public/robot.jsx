import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Robot({ ...rest }) {
  const { nodes, materials } = useGLTF("/Untitled.gltf");
  const groupRef = useRef();

  function getScale() {
    const rawScale = (window.innerWidth / 850) * 1.3;
    return Math.min(2, Math.max(1, rawScale));
  }

  useEffect(() => {
    function applyScale() {
      const scale = getScale();
      if (groupRef.current) {
        groupRef.current.scale.set(scale, scale, scale);
      }
    }
    applyScale();
    function handleResize() {
      applyScale();
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <group ref={groupRef} {...rest} dispose={null}>
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
