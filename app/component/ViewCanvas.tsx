"use client";
import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { EffectComposer, SMAA } from "@react-three/postprocessing";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { Robot } from "@/public/robot";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LoaderScreen from "../component2D/Loader";
import type { Group } from "three";
import type * as THREE from "three";
import { useToggleStore } from "../zustand";
interface PositionProxy {
  opacity: number;
  xPercent: number;
  yPercent: number;
}

interface RotationProxy {
  x: number;
  y: number;
  z: number;
}
// Removed unused RotationTuple type

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Scene(): React.JSX.Element {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null); // initial is safe for SSR
  const groupRef = useRef<Group>(null);
  const { isOpen } = useToggleStore();

  // Removed unused gsapScope ref
  const setWillChange = (
    element: HTMLElement | null,
    properties: string
  ): void => {
    if (element && isMobileDevice) element.style.willChange = properties;
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Detect mobile once on resize changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobileDevice(window.matchMedia("(max-width: 768px)").matches);
    }
  }, [width]);
  useGSAP(() => {
    requestAnimationFrame(() => {
      const rotationProxy: RotationProxy = { x: 0, y: 0, z: 0 };
      const positionProxy: PositionProxy = {
        opacity: 1,
        xPercent: 0,
        yPercent: 0,
      };
      const applyProps = (): void => {
        if (containerRef.current) {
          gsap.set(containerRef.current, {
            opacity: positionProxy.opacity,
            xPercent: positionProxy.xPercent,
            yPercent: positionProxy.yPercent,
          });
        }
        if (groupRef.current) {
          groupRef.current.rotation.set(
            rotationProxy.x,
            rotationProxy.y,
            rotationProxy.z
          );
        }
      };

      const allTimelines = [
        {
          trigger: "#Mix",
          start: "top top",
          end: "20% top",
          steps: [
            {
              xPercent: 30,
              yPercent: -50,
              x: 0,
              y: Math.PI * 2 - Math.PI / 4,
              z: Math.PI,
            },
          ],
        },
        {
          trigger: "#Mix",
          start: "40% top",
          end: "65% top",
          steps: [
            {
              xPercent: -40,
              yPercent: 0,
              x: 0,
              y: Math.PI / 4,
              z: 0,
            },
          ],
        },
        {
          trigger: "#Projects",
          start: "20% center",
          end: "80% center",
          steps: [
            {
              xPercent: 40,
              yPercent: -40,
              x: Math.PI * 2,
              y: Math.PI * 2 - Math.PI / 4,
              z: Math.PI * 3,
            },
          ],
        },
        {
          trigger: "#Skills",
          start: "10% 80%",
          end: "50% center",
          steps: [
            {
              xPercent: -20,
              yPercent: 0,
              x: Math.PI * 4 - Math.PI / 4,
              y: Math.PI * 2 + Math.PI / 4,
              z: Math.PI * 4,
            },
          ],
        },
        {
          trigger: "#Contact",
          start: "20% 90%",
          end: "60% center",
          steps: [
            {
              xPercent: -35, // smooth continuation
              yPercent: -110, // slight vertical motion
              x: Math.PI * 2 + Math.PI / 6, // head slightly down (30° forward)
              y: Math.PI * 2 + Math.PI / 6, // turned slightly right (from robot's POV)
              z: Math.PI * 2 - Math.PI / 16,
              opacity: 0.7,
            },
          ],
        },
      ];

      for (const section of allTimelines) {
        const tl = gsap.timeline({
          scrollTrigger: {
            invalidateOnRefresh: true,
            trigger: section.trigger,
            start: section.start,
            end: section.end,
            scrub: 1,
            refreshPriority: -1,
          },
          onStart: () =>
            setWillChange(containerRef.current, "transform, opacity"),
        });

        for (const step of section.steps) {
          tl.to([positionProxy, rotationProxy], {
            ...step,
            onUpdate: applyProps,
          });
        }
      }
    });
  }, [width]);

  return (
    <>
      {" "}
      <div
        ref={containerRef}
        className="fixed -bottom-10 z-50 h-[50dvh] w-full pointer-events-none"
        style={{ willChange: isMobileDevice ? "transform, opacity" : "auto" }}
      >
        <Canvas
          camera={{ fov: 75 }}
          performance={{ min: 0.5, max: 1, debounce: 200 }}
          dpr={isMobileDevice ? [1, 0.9] : [1.5, 2]}
          gl={{
            antialias: !isMobileDevice, // disable on mobile
            toneMapping: ACESFilmicToneMapping,
            outputColorSpace: SRGBColorSpace,
            powerPreference: "high-performance",
          }}
        >
          {/* Lights only appear when state opens (mirrors hero light behavior) */}
          {isOpen && <RobotLights />}

          <group ref={groupRef} scale={0.03}>
            <Float
              speed={isMobileDevice ? 0.5 : 1}
              rotationIntensity={isMobileDevice ? 0.2 : 0.4}
              floatIntensity={isMobileDevice ? 0.3 : 0.6}
            >
              <Suspense>
                <Robot />
              </Suspense>
            </Float>
          </group>
          <EffectComposer multisampling={0}>
            <SMAA />
          </EffectComposer>
        </Canvas>
      </div>
      <LoaderScreen />
    </>
  );
}

function RobotLights(): React.JSX.Element {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const dir1Ref = useRef<THREE.DirectionalLight>(null);
  const dir2Ref = useRef<THREE.DirectionalLight>(null);
  const dir3Ref = useRef<THREE.DirectionalLight>(null);
  const dir4Ref = useRef<THREE.DirectionalLight>(null);
  const dir5Ref = useRef<THREE.DirectionalLight>(null);
  const dir6Ref = useRef<THREE.DirectionalLight>(null);

  useEffect(() => {
    const targets = {
      ambient: 0.2,
      hemi: 0.35,
      dir1: 2.2,
      dir2: 0.6,
      dir3: 5,
      dir4: 2,
      dir5: 1,
      dir6: 1,
    };

    [
      ambientRef,
      hemiRef,
      dir1Ref,
      dir2Ref,
      dir3Ref,
      dir4Ref,
      dir5Ref,
      dir6Ref,
    ].forEach((ref) => {
      if (ref.current) ref.current.intensity = 0;
    });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.delay(1.25)
      .to(
        ambientRef.current || {},
        { intensity: targets.ambient, duration: 1.5 },
        0
      )
      .to(hemiRef.current || {}, { intensity: targets.hemi, duration: 1.5 }, 0)
      .to(dir1Ref.current || {}, { intensity: targets.dir1, duration: 1.5 }, 0)
      .to(
        dir2Ref.current || {},
        { intensity: targets.dir2, duration: 1.2 },
        0.1
      )
      .to(dir3Ref.current || {}, { intensity: targets.dir3, duration: 1.5 }, 0)
      .to(dir4Ref.current || {}, { intensity: targets.dir4, duration: 1.5 }, 0)
      .to(dir5Ref.current || {}, { intensity: targets.dir5, duration: 1.5 }, 0)
      .to(dir6Ref.current || {}, { intensity: targets.dir6, duration: 1.5 }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <ambientLight ref={ambientRef} />
      <hemisphereLight ref={hemiRef} args={[0xffffff, 0x1a1a1a]} />
      <directionalLight ref={dir1Ref} position={[3, 5, 2]} />
      <directionalLight ref={dir2Ref} position={[-4, 2, -3]} />
      <directionalLight ref={dir3Ref} position={[2, 0, 1]} intensity={5} />
      <directionalLight ref={dir4Ref} position={[-2, 0, 1]} intensity={2} />
      <directionalLight ref={dir5Ref} position={[0, -1, 1]} intensity={1} />
      <directionalLight ref={dir6Ref} position={[0, 5, 1]} intensity={1} />
    </>
  );
}
