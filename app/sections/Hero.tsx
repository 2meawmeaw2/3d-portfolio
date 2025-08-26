"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import MagneticButton from "../component2D/magButton";

gsap.registerPlugin(useGSAP);

/* ----------------------------- utilities ------------------------------ */

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, [query]);

  return matches;
}

/* ------------------------- Small building blocks ------------------------- */

function ScrollCue({ enabled = true }: { enabled?: boolean }) {
  const barRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!enabled || !barRef.current) return;
    const tween = gsap.fromTo(
      barRef.current,
      { y: 0, opacity: 0.2 },
      {
        y: 22,
        opacity: 1,
        duration: 0.9,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
      }
    );
    return () => {
      tween?.kill();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none mt-10 sm:mt-16 flex flex-col items-center justify-center text-xs text-white/50">
      <div className="h-8 w-[2px] overflow-hidden rounded-full bg-white/15">
        <span
          ref={barRef}
          className="block h-2 w-[2px] rounded-full bg-white/70"
        />
      </div>
      <span className="mt-3 tracking-widest text-center">SCROLL</span>
    </div>
  );
}

function MouseSpotlight({ enabled = true }: { enabled?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const element = ref.current;
    if (!element) return;

    const setX = gsap.quickSetter(element, "--mx", "px");
    const setY = gsap.quickSetter(element, "--my", "px");

    const target = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      gsap.to(target, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power3.out",
        overwrite: true,
        onUpdate: () => {
          setX(target.x);
          setY(target.y);
        },
      });
    };

    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  type CSSVars = React.CSSProperties & { ["--mx"]?: string; ["--my"]?: string };
  const styleVars: CSSVars = { ["--mx"]: "0px", ["--my"]: "0px" };

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-100"
      style={{
        ...styleVars,
        backgroundImage:
          "radial-gradient(1200px 1200px at var(--mx) var(--my), rgba(100,100,100,0.12), rgba(200,200,200,0.08) 20%, transparent 60%)",
      }}
    />
  );
}

function ParallaxOrbs({ enabled = true }: { enabled?: boolean }) {
  const orb1Ref = useRef<HTMLDivElement | null>(null);
  const orb2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !orb1Ref.current || !orb2Ref.current) return;

    const createQuick = (el: HTMLElement, prop: "xPercent" | "yPercent") =>
      gsap.quickTo(el, prop, { duration: 0.4, ease: "power3.out" });

    const q1x = createQuick(orb1Ref.current, "xPercent");
    const q1y = createQuick(orb1Ref.current, "yPercent");
    const q2x = createQuick(orb2Ref.current, "xPercent");
    const q2y = createQuick(orb2Ref.current, "yPercent");

    const mapX = gsap.utils.mapRange(-0.5, 0.5, -8, 8);
    const mapY = gsap.utils.mapRange(-0.5, 0.5, -6, 6);
    const mapX2 = gsap.utils.mapRange(-0.5, 0.5, 8, -8);
    const mapY2 = gsap.utils.mapRange(-0.5, 0.5, 6, -6);

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const ny = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      q1x(mapX(nx));
      q1y(mapY(ny));
      q2x(mapX2(nx));
      q2y(mapY2(ny));
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={orb1Ref}
        className="absolute left-[-10%] top-[-10%] h-[50vmax] w-[50vmax] rounded-full blur-[120px] opacity-30"
      >
        <div className="h-full w-full rounded-full opacity-15 bg-[conic-gradient(from_140deg_at_50%_50%,rgba(0,163,255,0.25),rgba(162,89,255,0.22),rgba(0,163,255,0.25))]" />
      </div>
      <div
        ref={orb2Ref}
        className="absolute right-[-10%] bottom-[-15%] h-[55vmax] w-[55vmax] rounded-full blur-[140px] opacity-20"
      >
        <div className="h-full w-full rounded-full bg-[conic-gradient(from_320deg_at_50%_50%,rgba(255,93,93,0.10),rgba(255,210,120,0.14),rgba(255,93,93,0.010))]" />
      </div>
    </>
  );
}

/* -------------------------------- Hero ----------------------------------- */

export default function Hero() {
  const scope = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const hasFinePointer = useMediaQuery("(pointer: fine)");
  const interactive = hasFinePointer && !prefersReduced;

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".reveal");
      if (prefersReduced) {
        gsap.set(items, { y: 0, autoAlpha: 1 });
        return;
      }
      gsap.from(items, {
        y: 24,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
      });
    },
    { scope, dependencies: [prefersReduced] }
  );

  return (
    <section
      id="hero"
      aria-label="Intro section"
      className="relative z-0 min-h-[100svh] md:min-h-[110svh] w-full overflow-clip bg-black text-white flex items-center justify-center"
      ref={scope}
    >
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_15%,rgba(140,160,255,0.18),transparent_60%)] md:bg-[radial-gradient(60%_60%_at_50%_20%,rgba(140,160,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_90%_at_50%_110%,rgba(255,120,80,0.08),transparent_60%)]" />
        <div className="hidden md:block">
          <ParallaxOrbs enabled={interactive} />
          <MouseSpotlight enabled={interactive} />
        </div>
      </div>

      {/* content */}
      <div className="z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-[1100px] overflow-clip rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center bg-white/5">
          {/* top badge */}
          <div className="reveal flex justify-center">
            <span className="overflow-clip inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] sm:text-xs text-white/70 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="whitespace-nowrap">
                Full-Stack • Frontend-First — 2025
              </span>
            </span>
          </div>

          {/* big headline */}
          <h1
            className={cn(
              "reveal mt-5 sm:mt-6 text-center font-semibold leading-[0.98] md:leading-[0.95] flex flex-col items-center justify-center",
              "text-[9.5vw] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
            )}
            style={{ textShadow: "0 20px 80px rgba(255,255,255,0.12)" }}
          >
            <span className="bg-gradient-to-b from-white via-white to-black/10 bg-clip-text text-transparent text-center">
              Building Modern{" "}
              <span className="bg-gradient-to-b from-white via-white to-black bg-clip-text text-transparent">
                Web Apps
              </span>
            </span>
            <span className="bg-gradient-to-b from-white via-white to-black/10 bg-clip-text text-transparent text-center">
              Full-Stack,{" "}
              <span className="bg-gradient-to-b mx-2 sm:mx-3 from-white via-white to-black bg-clip-text text-transparent">
                Frontend-Focused
              </span>
            </span>
          </h1>

          {/* subcopy */}
          <p className="reveal mt-4 sm:mt-6 max-w-2xl text-center text-pretty text-sm sm:text-base text-white/70 mx-auto">
            I design and ship production web apps with TypeScript/React on the
            front, reliable APIs on the back, and great DX in between. Clean UI,
            performance, accessibility, and maintainability come standard.
          </p>

          {/* single CTA */}
          <div className="reveal mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 w-full">
            <div className="flex justify-center w-full">
              <MagneticButton href="#Projects">
                <span>Explore Projects</span>
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </MagneticButton>
            </div>
          </div>

          {/* metrics mini-cards / scroll cue */}
          <div className="w-full flex justify-center">
            <ScrollCue enabled={!prefersReduced} />
          </div>
        </div>
      </div>
    </section>
  );
}
