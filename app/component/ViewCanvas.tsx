"use client";
import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, AdaptiveDpr, Environment } from "@react-three/drei";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { Robot } from "@/public/robot";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LoaderScreen from "../component2D/Loader";
import type { Group } from "three";
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
type RotationTuple = [number, number, number];

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Scene(): React.JSX.Element {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null); // initial is safe for SSR
  const groupRef = useRef<Group>(null);

  const gsapScope = useRef(null);
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
          className="fixed -bottom-10 z-60 h-[50dvh] w-full pointer-events-none"
          style={{ willChange: "auto", pointerEvents: "none" }}
          camera={{ fov: 75 }}
          performance={{ min: 0.1, max: 1, debounce: 200 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            toneMapping: ACESFilmicToneMapping,
            outputColorSpace: SRGBColorSpace,
          }}
        >
          {/* Global high-quality lighting */}
          <ambientLight intensity={0.2} />
          <hemisphereLight args={[0xffffff, 0x1a1a1a, 0.35]} />
          <directionalLight position={[3, 5, 2]} intensity={2.2} />
          <directionalLight position={[-4, 2, -3]} intensity={0.6} />
          <Environment preset="studio" />

          <group ref={groupRef} scale={0.03}>
            <AdaptiveDpr />
            <Float
              speed={1}
              rotationIntensity={0.4}
              floatIntensity={0.6}
              floatingRange={[-0.5, 0.5]}
            >
              <Suspense>
                <Robot />
              </Suspense>
            </Float>
          </group>
        </Canvas>
      </div>
      <LoaderScreen />
    </>
  );
}
