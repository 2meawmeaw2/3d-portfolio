"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { Scene } from "../component/ViewCanvas";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
gsap.registerPlugin(SplitText);

const Hero = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scene = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  useGSAP(() => {
    const split = SplitText.create(rootRef.current, { type: "words" });

    gsap.from(split.words, {
      scrollTrigger: {
        trigger: rootRef.current,
        start: "10% center",
        end: "70% center",
        scrub: !isMobile,
      },
      color: "#000000",
      ease: "power1.inOut",
      stagger: { amount: 2 },
    });
    gsap.to(scene.current, {
      scrollTrigger: {
        trigger: rootRef.current,
        start: "40% center",
        end: "100% center",
        scrub: true,
      },
      xPercent: 50,
      y: !isMobile
        ? (rootRef.current?.offsetHeight ?? 0) / 2
        : (rootRef.current?.offsetHeight ?? 0) / 1.5,
      yPercent: 50,
      x: -(rootRef.current?.offsetWidth ?? 0) / 2,
      duration: 1,
      ease: "power1.inOut",
    });
  });

  return (
    <section
      id="About"
      ref={rootRef}
      className="h-[120vh] sm:h-[140vh] md:h-[160vh] sticky top-0 z-50 overflow-clip bg-black text-white"
      aria-label="Hero"
    >
      {/* BACKGROUND LAYERS */}
      <div className="pointer-events-none absolute inset-0">
        {/* large vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_center,rgba(24,24,24,0)_0%,rgba(0,0,0,0.6)_60%,rgba(0,0,0,1)_100%)]" />
        {/* blue/purple spotlights - optimized for mobile */}
        <div
          className="parallax-y absolute -top-32 sm:-top-40 left-1/2 -translate-x-1/2 w-[110vw] sm:w-[90vw] h-[110vw] sm:h-[90vw] max-w-[1200px] max-h-[1200px] rounded-full blur-[80px] sm:blur-[120px] opacity-50 sm:opacity-60 bg-[conic-gradient(from_90deg_at_50%_50%,#275DFA33_0%,#B794FF33_30%,transparent_60%)]"
          data-speed="0.5"
        />
        <div
          className="parallax-y absolute top-5 sm:top-10 -left-16 sm:-left-24 w-[60vw] sm:w-[50vw] h-[60vw] sm:h-[50vw] blur-[80px] sm:blur-[120px] rounded-full bg-[#3b82f6] opacity-[0.08] sm:opacity-[0.12]"
          data-speed="0.2"
        />
        <div
          className="parallax-y absolute -bottom-16 sm:-bottom-24 -right-16 sm:-right-24 w-[70vw] sm:w-[60vw] h-[70vw] sm:h-[60vw] blur-[100px] sm:blur-[140px] rounded-full bg-[#a855f7] opacity-[0.08] sm:opacity-[0.12]"
          data-speed="0.3"
        />
        {/* grain overlay */}
        <div className="absolute inset-0 mix-blend-soft-light opacity-[0.10] bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAL0lEQVR4AWOgGPrnPwMDA0M0GJqY+P//PxgYGEgwwuZg0j9gYFDE4ZkC0z8QTFgA4t4gkq7iPvEAAAAASUVORK5CYII=')]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col justify-center">
        {/* top row badges - improved mobile layout */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 mb-6 sm:mb-6 md:mb-6 lg:mb-10">
          <span
            className="float-card parallax-y text-[9px] sm:text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] px-2 sm:px-2.5 md:px-3 py-1 md:py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md whitespace-nowrap"
            data-speed="0.6"
          >
            Motion-first Front-End
          </span>
          <span
            className="float-card parallax-y text-[9px] sm:text-[10px] md:text-xs lg:text-sm px-2 sm:px-2.5 md:px-3 py-1 md:py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md whitespace-nowrap"
            data-speed="0.4"
          >
            Available ✳︎ 2025
          </span>
          <span
            className="float-card parallax-y text-[9px] sm:text-[10px] md:text-xs lg:text-sm px-2 sm:px-2.5 md:px-3 py-1 md:py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md whitespace-nowrap"
            data-speed="0.2"
          >
            Web / UI / GSAP
          </span>
        </div>

        {/* HERO TEXT + ROBOT SLOT - improved layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 items-center relative">
          {/* Text content */}
          <div className="w-full lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            <h1 className="hero-headline text-[clamp(2.2rem,9vw,6.5rem)] sm:text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.8] sm:leading-[0.85] md:leading-[0.9] font-extrabold tracking-tight bg-clip-text">
              Interfaces that feel alive.
            </h1>

            <h2 className="hero-sub mt-4 sm:mt-3 md:mt-4 lg:mt-6 text-sm sm:text-base lg:text-xl max-w-none sm:max-w-[60ch] mx-auto lg:mx-0 text-white/80 leading-relaxed px-2 lg:px-0">
              Motion, clarity and intent—crafted with GSAP, clean systems, and
              micro-interactions that guide without shouting.
            </h2>

            {/* CTA Buttons - improved layout */}
            <div className="mt-6 sm:mt-6 lg:mt-8 xl:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 lg:gap-4 px-4 lg:px-0">
              <button className="cta magnetic inline-flex items-center justify-center gap-2 px-5 lg:px-6 py-3 lg:py-3.5 rounded-full border border-white/20 bg-white text-black font-semibold shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_20px_60px_-20px_rgba(255,255,255,0.25)] transition-shadow text-lg lg:text-base">
                <a href="#Projects">View work</a>
                <svg
                  width="16"
                  height="16"
                  className="w-4 h-4 lg:w-[18px] lg:h-[18px]"
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
                className="cta magnetic inline-flex items-center justify-center gap-2 px-5 lg:px-6 py-3 lg:py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-lg text-lg lg:text-base"
              >
                Contact
              </a>
            </div>
          </div>

          {/* 3D Scene */}
          <div className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-none lg:col-span-5 relative z-0 h-[280px] sm:h-[320px] md:h-[400px] lg:h-[56vh] rounded-xl md:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md order-1 lg:order-2 mx-auto lg:mx-0">
            <div
              ref={scene}
              className="absolute inset-0 z-[60] pointer-events-none"
            >
              <Scene />
            </div>
            <div className="absolute -bottom-6 sm:-bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2 w-[110%] sm:w-[120%] md:w-[140%] h-[110%] sm:h-[120%] md:h-[140%] rounded-[50%] blur-[40px] sm:blur-[60px] md:blur-[80px] opacity-30 sm:opacity-40 bg-[radial-gradient(closest-side,rgba(39,93,250,0.4),rgba(167,139,250,0.25),transparent_70%)]" />
          </div>
        </div>

        {/* marquee - improved mobile sizing */}
        <div className="mt-8 sm:mt-10 md:mt-14 overflow-hidden order-3">
          <div className="marquee whitespace-nowrap text-xs sm:text-sm md:text-base opacity-60 sm:opacity-70">
            <span className="mx-4 sm:mx-6">GSAP</span>
            <span className="mx-4 sm:mx-6">React</span>
            <span className="mx-4 sm:mx-6">Three.js</span>
            <span className="mx-4 sm:mx-6">TypeScript</span>
            <span className="mx-4 sm:mx-6">Tailwind</span>
            <span className="mx-4 sm:mx-6">Accessibility</span>
            <span className="mx-4 sm:mx-6">Micro-interactions</span>
            <span className="mx-4 sm:mx-6">Performance</span>
            {/* duplicate for seamless loop */}
            <span className="mx-4 sm:mx-6">GSAP</span>
            <span className="mx-4 sm:mx-6">React</span>
            <span className="mx-4 sm:mx-6">Three.js</span>
            <span className="mx-4 sm:mx-6">TypeScript</span>
            <span className="mx-4 sm:mx-6">Tailwind</span>
            <span className="mx-4 sm:mx-6">Accessibility</span>
            <span className="mx-4 sm:mx-6">Micro-interactions</span>
            <span className="mx-4 sm:mx-6">Performance</span>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-[10px] sm:text-xs md:text-sm text-white/60">
          <div className="size-6 sm:size-8 rounded-full border border-white/20 grid place-items-center mb-2 animate-bounce">
            <div className="w-[1.5px] sm:w-[2px] h-2 sm:h-3 bg-white/60 rounded-full" />
          </div>
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
