"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Robot } from "@/public/robot";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LoaderScreen from "../component2D/Loader";
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
  const [rotation, setRotation] = useState<RotationTuple>([0, 0, 0]);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0); // initial is safe for SSR

  const gsapScope = useRef(null);
  const setWillChange = (
    element: HTMLElement | null,
    properties: string
  ): void => {
    if (element && isMobileDevice) element.style.willChange = properties;
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    setWidth(window.innerWidth); // set initial width after mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useGSAP(
    () => {
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
          setRotation([rotationProxy.x, rotationProxy.y, rotationProxy.z]);
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
            start: width > 1280 ? "-10% center" : "40% top",
            end: width > 1280 ? "43% center" : "65% top",
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
            start: width > 1280 ? "15% center" : "-15% center",
            end: width > 1280 ? "70% center" : "60% center",
            steps: [
              width < 1280
                ? {
                    xPercent: 40,
                    yPercent: -40,
                    x: Math.PI * 2,
                    y: Math.PI * 2 - Math.PI / 4,
                    z: Math.PI * 3,
                  }
                : {
                    xPercent: 40,
                    yPercent: -40,
                    x: 0,
                    y: Math.PI / 4 - Math.PI / 2,
                    z: 0,
                  },
            ],
          },
          {
            trigger: "#Skills",
            start: "20% 80%",
            markers: true,
            end: "60% center",
            steps: [
              width > 1280
                ? {
                    xPercent: -20,
                    yPercent: 0,
                    x: Math.PI * 4 - Math.PI / 4,
                    y: Math.PI * 2 + Math.PI / 4,
                    z: Math.PI * 4,
                  }
                : {
                    xPercent: -20,
                    yPercent: 0,
                    x: -Math.PI / 6,
                    y: Math.PI * 2 + Math.PI / 4,
                    z: Math.PI * 2,
                  },
            ],
          },
          {
            trigger: "#Contact",
            start: "20% 90%",
            markers: true,
            end: "60% center",
            steps: [
              width > 1280
                ? {
                    xPercent: -10,
                    yPercent: -25,
                    x: Math.PI * 2 + Math.PI / 6,
                    y: Math.PI * 4 + Math.PI / 4,
                    z: Math.PI * 3,
                    opacity: 0.8,
                  }
                : {
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
              markers: section.markers,
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
    },
    { scope: gsapScope }
  );

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
          dpr={1}
          gl={{ preserveDrawingBuffer: true }}
          shadows
        >
          <group scale={0.03} rotation={rotation}>
            <ambientLight intensity={0.4} />

            <directionalLight position={[1, 0, 1]} intensity={2} />
            <directionalLight position={[-1, 0, 1]} intensity={2} />
            <directionalLight position={[-2, 0, -4]} intensity={2.5} />
            <Float
              speed={isMobileDevice ? 2 : 2}
              rotationIntensity={isMobileDevice ? 2 : 1}
              floatIntensity={isMobileDevice ? 2 : 1}
              floatingRange={isMobileDevice ? [-0.6, 0.6] : [-2, 2]}
            >
              <Suspense>
                <Robot boxSize={1 > 1280 ? 1.4 : 1} />
              </Suspense>
            </Float>
          </group>
        </Canvas>
      </div>
      <LoaderScreen />
    </>
  );
}
