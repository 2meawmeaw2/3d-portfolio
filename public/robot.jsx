import React, { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";

export function Robot({ boxSize, ...rest }) {
  const { nodes, materials } = useGLTF("/Untitled.gltf");
  const [scaleFactor, setScaleFactor] = useState(getScale());

  function getScale() {
    const rawScale = (window.innerWidth / 850) * 1.3;
    return Math.min(2, Math.max(1, rawScale));
  }

  useEffect(() => {
    function handleResize() {
      setScaleFactor(getScale());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <group scale={scaleFactor} {...rest} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.Acetal_Resin_White_2}
        position={[-9.034, 10.417, 0.11]}
        rotation={[-3.002, 0, 0]}
        scale={0.75}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.ABS_White}
        position={[-9.034, 10.417, 0.11]}
        rotation={[-3.002, 0, 0]}
        scale={0.75}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_5.geometry}
        material={materials.Acetal_Resin_White}
        position={[-9.034, 10.417, 0.11]}
        rotation={[-3.002, 0, 0]}
        scale={0.75}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={materials.Acetal_Resin_White}
        position={[-9.034, 10.417, 0.11]}
        rotation={[-3.002, 0, 0]}
        scale={0.75}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_7.geometry}
        material={materials.Acetal_Resin_White_1}
        position={[-9.034, 10.417, 0.11]}
        rotation={[-3.002, 0, 0]}
        scale={0.75}
      />
      <mesh
        castShadow
        receiveShadow
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
