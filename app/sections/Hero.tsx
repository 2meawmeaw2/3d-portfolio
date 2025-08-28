"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import MagneticButton from "../component2D/magButton";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

function ScrollCueBase({ enabled = true }: { enabled?: boolean }) {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let tween: { kill: () => void } | undefined;
    let isCancelled = false;
    if (!enabled || !barRef.current) return;

    // Lazy-load gsap only when animation is enabled and element is present
    import("gsap").then((mod) => {
      if (isCancelled || !barRef.current) return;
      const gsap = mod.default || mod;
      tween = gsap.fromTo(
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
    });

    return () => {
      isCancelled = true;
      if (tween) tween.kill();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none mt-10 sm:mt-16 flex flex-col items-center text-xs text-white/50"
      aria-hidden
    >
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

const ScrollCue = memo(ScrollCueBase);

export default function Hero() {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const scrollCueEnabled = useMemo(
    () => !prefersReducedMotion,
    [prefersReducedMotion]
  );

  return (
    <section
      id="hero"
      aria-label="Intro section"
      className="relative min-h-screen w-full bg-black text-white flex items-center justify-center"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_15%,rgba(140,160,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_90%_at_50%_110%,rgba(255,120,80,0.08),transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-4xl rounded-2xl border border-white/20 p-6 md:p-8 bg-white/5">
          {/* Status badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-300" />
              Available for work
            </span>
          </div>

          {/* Main headline */}
          <h1
            className={cn(
              "mt-6 text-center font-semibold leading-tight",
              "text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
            )}
          >
            <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent block">
              Building Modern
            </span>
            <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent block">
              Web Apps
            </span>
            <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent block mt-2">
              Full-Stack, Frontend-Focused
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-center text-sm md:text-base text-white/70 mx-auto">
            I design and ship production web apps with TypeScript/React on the
            front, reliable APIs on the back, and great DX in between. Clean UI,
            performance, accessibility, and maintainability come standard.
          </p>

          {/* CTA Button */}
          <div className="mt-8 flex justify-center">
            <MagneticButton href="#Projects" className="px-5 py-3">
              <span>Explore Projects</span>
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
          </div>

          {/* Scroll indicator */}
          <ScrollCue enabled={scrollCueEnabled} />
        </div>
      </div>
    </section>
  );
}
