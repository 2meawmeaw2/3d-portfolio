"use client";
import MagneticButton from "../component2D/magButton";
import { useEffect, useRef, useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/* ----------------------------- tiny helpers ------------------------------ */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function useHasFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(pointer: fine)");
    const onChange = () => setFine(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return fine;
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
      tween.kill();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none mt-10 sm:mt-16 hidden sm:flex flex-col items-center text-xs text-white/50">
      <div className="h-8 w-[2px] overflow-hidden rounded-full bg-white/15">
        <span
          ref={barRef}
          className="block h-2 w-[2px] rounded-full bg-white/70"
        />
      </div>
      <span className="mt-3 tracking-widest">SCROLL</span>
    </div>
  );
}

/* -------------------- Mouse-follow spotlight & orbs ---------------------- */

function MouseSpotlight({ enabled = true }: { enabled?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const setX = gsap.quickSetter(el, "--mx", "px");
    const setY = gsap.quickSetter(el, "--my", "px");

    const pos = { x: 0, y: 0 };
    const move = (e: MouseEvent) => {
      gsap.to(pos, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power3.out",
        overwrite: true,
        onUpdate: () => {
          setX(pos.x);
          setY(pos.y);
        },
      });
    };

    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, [enabled]);

  if (!enabled) return null;

  type Vars = React.CSSProperties & { ["--mx"]?: string; ["--my"]?: string };
  const varStyle: Vars = { ["--mx"]: "0px", ["--my"]: "0px" };

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-100"
      style={{
        ...varStyle,
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

    const q1x = gsap.quickTo(orb1Ref.current, "xPercent", {
      duration: 0.4,
      ease: "power3.out",
    });
    const q1y = gsap.quickTo(orb1Ref.current, "yPercent", {
      duration: 0.4,
      ease: "power3.out",
    });
    const q2x = gsap.quickTo(orb2Ref.current, "xPercent", {
      duration: 0.4,
      ease: "power3.out",
    });
    const q2y = gsap.quickTo(orb2Ref.current, "yPercent", {
      duration: 0.4,
      ease: "power3.out",
    });

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
  const prefersReduced = usePrefersReducedMotion();
  const hasFinePointer = useHasFinePointer();

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".reveal");
      if (prefersReduced) {
        gsap.set(items, { y: 0, autoAlpha: 1 });
      } else {
        gsap.from(items, {
          y: 24,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
        });
      }
    },
    { scope, dependencies: [prefersReduced] }
  );

  return (
    <section
      id="hero"
      aria-label="Intro section"
      className="relative z-0 min-h-[100svh] md:min-h-[110svh] w-full overflow-clip bg-black text-white"
      ref={scope}
    >
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_15%,rgba(140,160,255,0.18),transparent_60%)] md:bg-[radial-gradient(60%_60%_at_50%_20%,rgba(140,160,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_90%_at_50%_110%,rgba(255,120,80,0.08),transparent_60%)]" />
        {/* Disable heavy effects on touch devices / reduced motion */}
        <div className="hidden md:block">
          <ParallaxOrbs enabled={hasFinePointer && !prefersReduced} />
          <MouseSpotlight enabled={hasFinePointer && !prefersReduced} />
        </div>
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-20 pt-28 sm:px-6 md:px-8 md:pt-40 md:pb-24">
        <div className="w-full max-w-[1100px] overflow-clip rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-6 md:p-8 flex flex-col items-center bg-white/5">
          {/* top badge */}
          <div className="reveal">
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
              "reveal mt-5 sm:mt-6 text-center font-semibold leading-[0.98] md:leading-[0.95]",
              // fluid on tiny screens, then step up
              "text-[9.5vw] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
            )}
            style={{ textShadow: "0 20px 80px rgba(255,255,255,0.12)" }}
          >
            <span className="bg-gradient-to-b from-white via-white to-black/10 bg-clip-text text-transparent">
              Building Modern{" "}
              <span className="bg-gradient-to-b from-white via-white to-black bg-clip-text text-transparent">
                Web Apps
              </span>
            </span>
            <br />
            <span className="bg-gradient-to-b from-white via-white to-black/10 bg-clip-text text-transparent">
              Full-Stack,{" "}
              <span className="bg-gradient-to-b mx-2 sm:mx-3 from-white via-white to-black bg-clip-text text-transparent">
                Frontend-Focused
              </span>
            </span>
          </h1>

          {/* subcopy */}
          <p className="reveal mt-4 sm:mt-6 max-w-2xl text-center text-pretty text-sm sm:text-base text-white/70">
            I design and ship production web apps with TypeScript/React on the
            front, reliable APIs on the back, and great DX in between. Clean UI,
            performance, accessibility, and maintainability come standard.
          </p>

          {/* single CTA */}
          <div className="reveal mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="#Projects">
              <span>Explore Projects</span>
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
          </div>

          {/* metrics mini-cards / scroll cue */}
          <div className="w-full">
            <ScrollCue enabled={!prefersReduced} />
          </div>
        </div>
      </div>
    </section>
  );
}
