"use client";
import React, { useRef, useState, Suspense, useEffect, useMemo } from "react";
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

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Scene(): React.JSX.Element {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);
  const groupRef = useRef<Group>(null);
  const { isOpen } = useToggleStore();

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobileDevice(window.matchMedia("(max-width: 768px)").matches);
    }
  }, [width]);

  // Memoize timeline configuration to prevent recreating on every render
  const timelineConfig = useMemo(
    () => [
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
            xPercent: -35,
            yPercent: -110,
            x: Math.PI * 2 + Math.PI / 6,
            y: Math.PI * 2 + Math.PI / 6,
            z: Math.PI * 2 - Math.PI / 16,
            opacity: 0.7,
          },
        ],
      },
    ],
    []
  );

  useGSAP(() => {
    // Use RAF for better frame timing
    let rafId: number;

    const setupAnimations = () => {
      const rotationProxy: RotationProxy = { x: 0, y: 0, z: 0 };
      const positionProxy: PositionProxy = {
        opacity: 1,
        xPercent: 0,
        yPercent: 0,
      };

      // Throttle updates for mobile
      let lastUpdate = 0;
      const throttleDelay = isMobileDevice ? 16 : 8; // ~60fps on mobile, 120fps on desktop

      const applyProps = (): void => {
        const now = performance.now();
        if (now - lastUpdate < throttleDelay) return;
        lastUpdate = now;

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

      timelineConfig.forEach((section) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            invalidateOnRefresh: true,
            trigger: section.trigger,
            start: section.start,
            end: section.end,
            scrub: isMobileDevice ? 2 : 1, // Slower scrub on mobile for smoother animation
            refreshPriority: -1,
          },
          onStart: () =>
            setWillChange(containerRef.current, "transform, opacity"),
        });

        section.steps.forEach((step) => {
          tl.to([positionProxy, rotationProxy], {
            ...step,
            onUpdate: applyProps,
            ease: isMobileDevice ? "power1.out" : "none", // Smoother easing on mobile
          });
        });
      });
    };

    rafId = requestAnimationFrame(setupAnimations);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [width, isMobileDevice, timelineConfig]);

  // Optimize Canvas props for mobile
  const canvasProps = useMemo(
    () => ({
      camera: { fov: 75 },
      performance: {
        min: isMobileDevice ? 0.3 : 0.1,
        max: isMobileDevice ? 0.8 : 1,
        debounce: isMobileDevice ? 300 : 200,
      },
      dpr: isMobileDevice ? [1, 1.5] : [1.5, 2.5], // Lower DPR on mobile
      gl: {
        antialias: !isMobileDevice, // Disable antialiasing on mobile
        toneMapping: ACESFilmicToneMapping,
        outputColorSpace: SRGBColorSpace,
        powerPreference: isMobileDevice ? "default" : "high-performance",
        alpha: false, // Disable alpha for better performance
        depth: true,
        stencil: false,
      },
    }),
    [isMobileDevice]
  );

  // Optimize Float component props for mobile
  const floatProps = useMemo(
    () => ({
      speed: isMobileDevice ? 0.5 : 1,
      rotationIntensity: isMobileDevice ? 0.2 : 0.4,
      floatIntensity: isMobileDevice ? 0.3 : 0.6,
      floatingRange: [-0.3, 0.3] as [number, number],
    }),
    [isMobileDevice]
  );

  return (
    <>
      <div
        ref={containerRef}
        className="fixed -bottom-10 z-50 h-[50dvh] w-full pointer-events-none"
        style={{
          willChange: isMobileDevice ? "transform, opacity" : "auto",
          // Add mobile-specific optimizations
          backfaceVisibility: "hidden",
          perspective: isMobileDevice ? "1000px" : "none",
        }}
      >
        <Canvas
          className="fixed -bottom-10 z-60 h-[50dvh] w-full pointer-events-none"
          style={{ willChange: "auto", pointerEvents: "none" }}
          {...canvasProps}
        >
          {/* Simplified lighting for mobile */}
          {isOpen && <RobotLights isMobile={isMobileDevice} />}

          <group ref={groupRef} scale={0.03}>
            <Float {...floatProps}>
              <Suspense fallback={null}>
                <Robot />
              </Suspense>
            </Float>
          </group>

          {/* Disable post-processing on mobile for better performance */}
          {!isMobileDevice && (
            <EffectComposer multisampling={0}>
              <SMAA />
            </EffectComposer>
          )}
        </Canvas>
      </div>
      <LoaderScreen />
    </>
  );
}

function RobotLights({ isMobile }: { isMobile: boolean }): React.JSX.Element {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const dir1Ref = useRef<THREE.DirectionalLight>(null);
  const dir2Ref = useRef<THREE.DirectionalLight>(null);

  // Additional lights only for desktop
  const dir3Ref = useRef<THREE.DirectionalLight>(null);
  const dir4Ref = useRef<THREE.DirectionalLight>(null);

  useEffect(() => {
    // Simplified lighting setup for mobile
    const targets = isMobile
      ? {
          ambient: 0.4,
          hemi: 0.5,
          dir1: 1.5,
          dir2: 0.8,
        }
      : {
          ambient: 0.2,
          hemi: 0.35,
          dir1: 2.2,
          dir2: 0.6,
          dir3: 3,
          dir4: 1.5,
        };

    const allRefs = isMobile
      ? [ambientRef, hemiRef, dir1Ref, dir2Ref]
      : [ambientRef, hemiRef, dir1Ref, dir2Ref, dir3Ref, dir4Ref];

    allRefs.forEach((ref) => {
      if (ref.current) ref.current.intensity = 0;
    });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
    });

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
      );

    // Add additional lights only on desktop
    if (!isMobile) {
      tl.to(
        dir3Ref.current || {},
        { intensity: targets.dir3, duration: 1.5 },
        0
      ).to(
        dir4Ref.current || {},
        { intensity: targets.dir4, duration: 1.5 },
        0
      );
    }

    return () => {
      tl.kill();
    };
  }, [isMobile]);

  return (
    <>
      <ambientLight ref={ambientRef} />
      <hemisphereLight ref={hemiRef} args={[0xffffff, 0x1a1a1a]} />
      <directionalLight ref={dir1Ref} position={[3, 5, 2]} />
      <directionalLight ref={dir2Ref} position={[-4, 2, -3]} />

      {/* Additional lights only on desktop */}
      {!isMobile && (
        <>
          <directionalLight ref={dir3Ref} position={[2, 0, 1]} />
          <directionalLight ref={dir4Ref} position={[-2, 0, 1]} />
        </>
      )}
    </>
  );
}
