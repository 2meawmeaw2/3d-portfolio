"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Scene } from "../component/ViewCanvas";
gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  const root = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Split headings
      const splitH1 = SplitText.create(".hero-headline", {
        type: "words,chars",
      });
      const splitH2 = SplitText.create(".hero-sub", { type: "chars" });

      gsap.set([splitH1.chars, splitH2.chars], { yPercent: 120, autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root.current, // 👈 root ref element
          start: "10% center", // when trigger hits top of viewport
          end: "10% center",
          toggleActions: "play none reverse play",
          // when bottom of trigger hits top
        },
      });

      tl.to(
        splitH1.chars,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: { each: 0.015, from: "random" },
        },
        "0"
      )
        .to(".hero-shine", { opacity: 1, duration: 0.6 }, "0")
        .to(
          splitH2.chars,
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1,
          },
          "1"
        )
        .from(
          ".cta",
          {
            y: 20,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 0.6,
          },
          "1"
        )
        .from(
          ".float-card",
          {
            y: 30,
            autoAlpha: 0,
            rotateX: 6,
            transformOrigin: "50% 100%",
            stagger: 0.06,
            duration: 0.7,
          },
          "1"
        );

      // Subtle parallax on scroll
      gsap.utils.toArray<HTMLElement>(".parallax-y").forEach((el, i) => {
        const speed = Number(el.dataset.speed || (i % 2 ? 0.6 : 0.3));
        gsap.to(el, {
          yPercent: prefersReduced ? 0 : gsap.utils.random(-5, 5) * speed,
          ease: "none",
        });
      });

      // Cursor spotlight
      if (!prefersReduced && spotlightRef.current) {
        const xTo = gsap.quickTo(spotlightRef.current, "x", {
          duration: 0.5,
          ease: "power3",
        });
        const yTo = gsap.quickTo(spotlightRef.current, "y", {
          duration: 0.5,
          ease: "power3",
        });
        const move = (e: MouseEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };
        window.addEventListener("mousemove", move);
        // cleanup
        return () => {
          window.removeEventListener("mousemove", move);
          splitH1.revert();
          splitH2.revert();
        };
      }

      return () => {
        splitH1.revert();
        splitH2.revert();
      };
    },
    { scope: root }
  );

  // magnetic CTA buttons
  useEffect(() => {
    const items = Array.from(
      (root.current || document).querySelectorAll<HTMLButtonElement>(
        ".magnetic"
      )
    );
    const enter = (e: MouseEvent) => {
      const t = e.currentTarget as HTMLButtonElement;
      gsap.to(t, { scale: 1.02, duration: 0.2, ease: "power2.out" });
    };
    const leave = (e: MouseEvent) => {
      const t = e.currentTarget as HTMLButtonElement;
      gsap.to(t, { x: 0, y: 0, scale: 1, duration: 0.35, ease: "power3.out" });
    };
    const move = (e: MouseEvent) => {
      const t = e.currentTarget as HTMLButtonElement;
      const rect = t.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      gsap.to(t, {
        x: relX * 0.12,
        y: relY * 0.12,
        duration: 0.25,
        ease: "power3",
      });
    };
    items.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      el.addEventListener("mousemove", move);
    });
    return () => {
      items.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.removeEventListener("mousemove", move);
      });
    };
  }, []);
  const robotRef = useRef(null);
  useGSAP(
    () => {
      if (!robotRef.current) return;
      gsap.to(robotRef.current, {
        scrollTrigger: {
          trigger: "#About",
          start: "center center",
          end: "120% center",
          scrub: 1.5,
        },
        xPercent: -90,
        yPercent: 180,
      });
      // Malp scroll progress of #About to a full 360° turn
    },
    {} // ensures proper cleanup in StrictMode
  );
  return (
    <section
      id="About" // keep this ID so your About ScrollTriggers still work
      ref={root}
      className=" h-[140vh] md:h-[160vh] sticky top-0 z-50 overflow-clip bg-black text-white"
      aria-label="Hero"
    >
      {/* BACKGROUND LAYERS */}
      <div className="pointer-events-none absolute inset-0">
        {/* large vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_center,rgba(24,24,24,0)_0%,rgba(0,0,0,0.6)_60%,rgba(0,0,0,1)_100%)]" />
        {/* blue/purple spotlights */}
        <div
          className="parallax-y absolute -top-40 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] max-w-[1200px] max-h-[1200px] rounded-full blur-[120px] opacity-60 bg-[conic-gradient(from_90deg_at_50%_50%,#275DFA33_0%,#B794FF33_30%,transparent_60%)]"
          data-speed="0.5"
        />
        <div
          className="parallax-y absolute top-10 -left-24 w-[50vw] h-[50vw] blur-[120px] rounded-full bg-[#3b82f6] opacity-[0.12]"
          data-speed="0.2"
        />
        <div
          className="parallax-y absolute -bottom-24 -right-24 w-[60vw] h-[60vw] blur-[140px] rounded-full bg-[#a855f7] opacity-[0.12]"
          data-speed="0.3"
        />
        {/* grain overlay */}
        <div className="absolute inset-0 mix-blend-soft-light opacity-[0.10] bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAL0lEQVR4AWOgGPrnPwMDA0M0GJqY+P//PxgYGEgwwuZg0j9gYFDE4ZkC0z8QTFgA4t4gkq7iPvEAAAAASUVORK5CYII=')]" />
      </div>

      {/* CURSOR SPOTLIGHT */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed z-[1] size-[38vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-60 mix-blend-screen"
        style={{
          background:
            "radial-gradient(closest-side, rgba(65,124,255,0.35), rgba(65,124,255,0.18) 40%, rgba(0,0,0,0) 70%)",
        }}
        aria-hidden
      />

      {/* CONTENT */}
      <div className="relative  z-10 h-full max-w-[1400px] mx-auto px-4 md:px-10 flex flex-col justify-center">
        {/* top row badges */}
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
          <span
            className="float-card parallax-y text-xs md:text-sm uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md"
            data-speed="0.6"
          >
            Motion-first Front-End
          </span>
          <span
            className="float-card parallax-y text-xs md:text-sm px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md"
            data-speed="0.4"
          >
            Available ✳︎ 2025
          </span>
          <span
            className="float-card parallax-y text-xs md:text-sm px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md"
            data-speed="0.2"
          >
            Web / UI / GSAP
          </span>
        </div>

        {/* HERO TEXT + ROBOT SLOT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center relative">
          <div className="md:col-span-7 lg:col-span-7">
            <h1 className="hero-headline text-[9vw] leading-[0.9] md:text-[6.5vw] font-extrabold tracking-tight  bg-clip-text  ">
              Interfaces that feel alive.
            </h1>

            <h2 className="hero-sub mt-4 md:mt-6 text-base md:text-xl max-w-[60ch] text-white/80">
              Motion, clarity and intent—crafted with GSAP, clean systems, and
              micro-interactions that guide without shouting.
            </h2>

            <div className="mt-8 md:mt-10 flex items-center gap-3 md:gap-4">
              <button className="cta magnetic inline-flex items-center gap-2 px-5 md:px-6 py-3 md:py-3.5 rounded-full border border-white/20 bg-white text-black font-semibold shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_20px_60px_-20px_rgba(255,255,255,0.25)] transition-shadow">
                <a href="#Projects">View work</a>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M7 17L17 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 7h8v8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <a
                href="#Contact"
                className="cta magnetic inline-flex items-center gap-2 px-5 md:px-6 py-3 md:py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md"
              >
                Contact
              </a>
            </div>
          </div>

          <div className=" md:col-span-5 lg:col-span-5 relative z-0 h-[42vh] md:h-[56vh] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div
              ref={robotRef}
              className="absolute inset-0 z-[60] pointer-events-none "
            >
              <Scene />
            </div>
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[140%] h-[140%] rounded-[50%] blur-[80px] opacity-40 bg-[radial-gradient(closest-side,rgba(39,93,250,0.4),rgba(167,139,250,0.25),transparent_70%)]" />
          </div>
        </div>

        {/* marquee */}
        <div className="mt-10 md:mt-14 overflow-hidden">
          <div className="marquee whitespace-nowrap text-sm md:text-base opacity-70">
            <span className="mx-6">GSAP</span>
            <span className="mx-6">React</span>
            <span className="mx-6">Three.js</span>
            <span className="mx-6">TypeScript</span>
            <span className="mx-6">Tailwind</span>
            <span className="mx-6">Accessibility</span>
            <span className="mx-6">Micro-interactions</span>
            <span className="mx-6">Performance</span>
            {/* duplicate for seamless loop */}
            <span className="mx-6">GSAP</span>
            <span className="mx-6">React</span>
            <span className="mx-6">Three.js</span>
            <span className="mx-6">TypeScript</span>
            <span className="mx-6">Tailwind</span>
            <span className="mx-6">Accessibility</span>
            <span className="mx-6">Micro-interactions</span>
            <span className="mx-6">Performance</span>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-xs md:text-sm text-white/60">
          <div className="size-8 rounded-full border border-white/20 grid place-items-center mb-2 animate-bounce">
            <div className="w-[2px] h-3 bg-white/60 rounded-full" />
          </div>
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
