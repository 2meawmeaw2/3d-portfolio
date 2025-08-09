import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useToggleStore } from "../app/zustand";

export function Robot({ ...rest }) {
  const { nodes, materials } = useGLTF("/Untitled.gltf");
  const groupRef = useRef();
  const { isOpen } = useToggleStore();

  // Capture original material properties once
  const originalMaterialProps = useMemo(() => {
    const snapshot = {};
    Object.entries(materials).forEach(([key, mat]) => {
      if (!mat) return;
      snapshot[key] = {
        color: mat.color?.clone?.(),
        emissive: mat.emissive?.clone?.(),
        emissiveIntensity: mat.emissiveIntensity ?? 0,
        metalness: mat.metalness ?? undefined,
        roughness: mat.roughness ?? undefined,
        envMapIntensity: mat.envMapIntensity ?? undefined,
      };
    });
    return snapshot;
  }, [materials]);

  // Darken materials synchronously before paint to avoid initial flash
  useLayoutEffect(() => {
    Object.entries(materials).forEach(([key, mat]) => {
      if (!mat) return;
      const original = originalMaterialProps[key];
      if (!isOpen) {
        if (mat.color) mat.color.setRGB(0, 0, 0);
        if (mat.emissive) mat.emissive.setRGB(0, 0, 0);
        if (typeof mat.emissiveIntensity === "number")
          mat.emissiveIntensity = 0;
        if (typeof mat.envMapIntensity === "number") mat.envMapIntensity = 0;
      } else if (original) {
        if (original.color && mat.color) mat.color.copy(original.color);
        if (original.emissive && mat.emissive)
          mat.emissive.copy(original.emissive);
        if (typeof original.emissiveIntensity === "number")
          mat.emissiveIntensity = original.emissiveIntensity;
        if (typeof original.envMapIntensity === "number")
          mat.envMapIntensity = original.envMapIntensity;
        if (typeof original.metalness === "number")
          mat.metalness = original.metalness;
        if (typeof original.roughness === "number")
          mat.roughness = original.roughness;
      }
      // Flag for update
      mat.needsUpdate = true;
    });
  }, [isOpen, materials, originalMaterialProps]);

  function getScale() {
    const rawScale = (window.innerWidth / 850) * 1.5;
    return Math.min(2, Math.max(1.3, rawScale));
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
