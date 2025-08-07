"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
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
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const gsapScope = useRef(null);

  // Enhanced device detection with SSR support
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);

      // Device classification with breakpoints
      if (newWidth <= 768) setDeviceType("mobile");
      else if (newWidth <= 1024) setDeviceType("tablet");
      else setDeviceType("desktop");
    };

    // Initialize on client side
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  // Device flags for cleaner conditionals
  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";
  const isDesktop = deviceType === "desktop";

  // Responsive parameters
  const canvasHeight = isDesktop ? "60dvh" : "50dvh";
  const canvasBottom = isDesktop ? "0" : "-bottom-10";
  const robotScale = isDesktop ? 0.04 : 0.03;

  // Float configuration per device
  const floatConfig = {
    speed: isDesktop ? 1.2 : isMobile ? 2 : 1.5,
    rotationIntensity: isDesktop ? 0.8 : isMobile ? 2 : 1.5,
    floatIntensity: isDesktop ? 0.8 : isMobile ? 2 : 1.5,
    floatingRange: (isDesktop
      ? [-0.4, 0.4]
      : isMobile
      ? [-0.6, 0.6]
      : [-0.5, 0.5]) as [number, number], // Add type assertion here
  };

  const setWillChange = (
    element: HTMLElement | null,
    properties: string
  ): void => {
    if (element && isMobile) element.style.willChange = properties;
  };

  useGSAP(
    () => {
      if (width === 0) return; // Skip on initial render

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
            start: isDesktop ? "top center" : isTablet ? "30% top" : "40% top",
            end: isDesktop ? "45% center" : isTablet ? "55% top" : "65% top",
            steps: [
              {
                xPercent: isDesktop ? -35 : -40,
                yPercent: isDesktop ? 5 : 0,
                x: 0,
                y: Math.PI / 4,
                z: 0,
              },
            ],
          },
          {
            trigger: "#Projects",
            start: "15% center",
            end: "70% center",
            steps: [
              isMobile
                ? {
                    xPercent: 40,
                    yPercent: -40,
                    x: Math.PI * 2,
                    y: Math.PI * 2 - Math.PI / 4,
                    z: Math.PI * 3,
                  }
                : {},
            ],
          },
          {
            trigger: "#Skills",
            start: "top bottom",
            end: "30% center",
            steps: [
              {
                xPercent: isDesktop ? -25 : -20,
                yPercent: isDesktop ? 5 : 0,
                x: Math.PI * 2 - Math.PI / (isDesktop ? 5 : 4),
                y: Math.PI * 4 + Math.PI / (isDesktop ? 6 : 4),
                z: Math.PI * 4,
              },
            ],
          },
          {
            trigger: "#Contact",
            start: "top bottom",
            end: "40% center",
            steps: [
              {
                // Desktop-specific animation
                xPercent: -35,
                yPercent: -110,
                x: Math.PI * 2 + Math.PI / 6,
                y: Math.PI * 4 + Math.PI / 6,
                z: Math.PI * 4 - Math.PI / 16,
                opacity: 1,
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
            if (Object.keys(step).length > 0) {
              // Skip empty steps
              tl.to([positionProxy, rotationProxy], {
                ...step,
                onUpdate: applyProps,
                duration: isDesktop ? 1.8 : 1,
                ease: isDesktop ? "power2.inOut" : "none",
              });
            }
          }
        }
      });
    },
    { scope: gsapScope, dependencies: [width] }
  );

  return (
    <>
      <div
        ref={containerRef}
        className={`fixed ${canvasBottom} z-50 w-full pointer-events-none`}
        style={{
          height: canvasHeight,
          willChange: isMobile ? "transform, opacity" : "auto",
        }}
      >
        <Canvas
          className="h-full w-full"
          style={{ pointerEvents: "none" }}
          camera={{
            fov: isDesktop ? 60 : 75,
            position: isDesktop ? [0, 0, 10] : [0, 0, 15],
          }}
          performance={{
            min: isDesktop ? 0.5 : 0.1,
            max: 1,
            debounce: 200,
          }}
          dpr={
            typeof window !== "undefined"
              ? Math.min(window.devicePixelRatio, isDesktop ? 1.5 : 2)
              : 1
          }
          gl={{
            preserveDrawingBuffer: true,
            powerPreference: isDesktop ? "high-performance" : "default",
          }}
          shadows={isDesktop}
        >
          <group scale={robotScale} rotation={rotation}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[1, 0, 1]} intensity={2} />
            <directionalLight position={[-1, 0, 1]} intensity={2} />
            <directionalLight position={[-2, 0, -4]} intensity={2.5} />

            <Float {...floatConfig}>
              <Suspense fallback={null}>
                <Robot
                  boxSize={isDesktop ? 4 : isMobile ? 3 : 2}
                  detailLevel={isDesktop ? 2 : 1}
                />
              </Suspense>
            </Float>

            {isDesktop && (
              <Environment preset="city" background={false} blur={0.5} />
            )}
          </group>
        </Canvas>
      </div>
      <LoaderScreen />
    </>
  );
}
