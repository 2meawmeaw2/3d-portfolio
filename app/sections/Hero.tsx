"use client";
import MagneticButton from "../component2D/magButton";
import { useEffect, useRef } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/* ------------------------- Small building blocks ------------------------- */

function ScrollCue() {
  const barRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!barRef.current) return;
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
  }, []);

  return (
    <div className="pointer-events-none mt-16 flex flex-col items-center text-xs text-white/50">
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

function MouseSpotlight() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
  }, []);

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

function ParallaxOrbs() {
  const orb1Ref = useRef<HTMLDivElement | null>(null);
  const orb2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!orb1Ref.current || !orb2Ref.current) return;

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
  }, []);

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

  useGSAP(
    () => {
      // Simple fade + slide up for all .reveal items
      const items = gsap.utils.toArray<HTMLElement>(".reveal");
      gsap.from(items, {
        y: 24,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
      });
    },
    { scope }
  );

  return (
    <section
      id="hero"
      aria-label="Intro section"
      className="relative z-0 min-h-[110svh] w-full overflow-clip bg-black text-white"
      ref={scope}
    >
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,rgba(140,160,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_110%,rgba(255,120,80,0.08),transparent_60%)]" />
        <ParallaxOrbs />
        <MouseSpotlight />
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-24 pt-36 sm:px-8 md:pt-40">
        <div className="w-full max-w-[1100px] overflow-clip rounded-2xl border border-white/20 p-4 sm:p-6 md:p-8 flex flex-col items-center bg-white/5">
          {/* top badge */}
          <div className="reveal">
            <span className="overflow-clip inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span>Portfolio — 2025 Edition</span>
            </span>
          </div>

          {/* big headline */}
          <h1
            className={cn(
              "reveal mt-6 text-center font-semibold leading-[0.95]",
              "text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
            )}
            style={{ textShadow: "0 20px 80px rgba(255,255,255,0.12)" }}
          >
            <span className="bg-gradient-to-b from-white via-white to-black/10 bg-clip-text text-transparent">
              Crafting Playful{" "}
              <span className="bg-gradient-to-b from-white via-white to-black bg-clip-text text-transparent">
                3D
              </span>{" "}
              Web
            </span>
            <br />
            <span className="bg-gradient-to-b from-white via-white to-black/10 bg-clip-text text-transparent">
              that Feels
              <span className="bg-gradient-to-b mx-3 from-white via-white to-black bg-clip-text text-transparent">
                Alive
              </span>
            </span>
          </h1>

          {/* subcopy */}
          <p className="reveal mt-6 max-w-2xl text-center text-balance text-sm sm:text-base text-white/70">
            Interactive experiences blending performant WebGL, motion, and
            micro-interactions. Built with care, tuned for delight.
          </p>

          {/* single CTA */}
          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="#Projects">
              <span>View Featured Work</span>
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
          </div>

          {/* metrics mini-cards */}
          <div className="reveal mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "Projects", v: "28+" },
              { k: "Awards", v: "6" },
              { k: "FPS Target", v: "60" },
              { k: "Stack", v: "Three • GSAP" },
            ].map((it) => (
              <div
                key={it.k}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur-xl"
              >
                <div className="text-xs uppercase tracking-widest text-white/60">
                  {it.k}
                </div>
                <div className="mt-1 text-lg font-medium">{it.v}</div>
              </div>
            ))}
          </div>

          <div className="w-full">
            <ScrollCue />
          </div>
        </div>
      </div>
    </section>
  );
}
