import React from "react";
import { forwardRef } from "react";

import { useGLTF } from "@react-three/drei";
import { Float } from "@react-three/drei";
export const Screen = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/Untitled.gltf");
  return (
    <group {...props} ref={ref} dispose={null}>
      <Float
        floatSpeed={1}
        rotationIntensity={1}
        floatIntensity={1}
        floatingRange={[-0.03, 0.1]}
      >
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Float
            floatSpeed={1.5}
            rotationIntensity={2}
            floatIntensity={2}
            floatingRange={[-0.3, 0.1]}
          >
            <group position-z={0.3} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.tv004_low_monitor_0.geometry}
                  material={materials["Material.001"]}
                  position={[0, 0.015, 0]}
                />
              </group>

              <mesh
                castShadow
                receiveShadow
                geometry={nodes.tv001_low_monitor_0.geometry}
                material={materials["monitor.002"]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.tv002_low_monitor_0.geometry}
                material={materials["monitor.002"]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.tv003_low_monitor_0.geometry}
                material={materials["monitor.002"]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.tv005_low_monitor_0.geometry}
                material={materials["monitor.002"]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.tv006_low_monitor_0.geometry}
                material={materials["monitor.002"]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.tv007_low_monitor_0.geometry}
                material={materials["monitor.002"]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.tv008_low_monitor_0.geometry}
                material={materials["monitor.002"]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.tv009_low_monitor_0.geometry}
                material={materials["monitor.002"]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.tv010_low_monitor_0.geometry}
                material={materials["monitor.002"]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.tv011_low_monitor_0.geometry}
                material={materials["monitor.002"]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.tv012_low_monitor_0.geometry}
                material={materials["monitor.002"]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.tv_low_monitor_0.geometry}
                material={materials["monitor.002"]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              />
            </group>
          </Float>
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.ground_low_ground_0.geometry}
              material={materials["ground.002"]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={60}
            />
          </group>
        </group>
      </Float>
    </group>
  );
});

useGLTF.preload("/Untitled.gltf");
