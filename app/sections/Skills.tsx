"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

type Skill = {
  name: string;
  icon: React.ReactNode;
  progress: number; // 0–100
};

const skills: Skill[] = [
  {
    name: "HTML/CSS",
    icon: (
      <Image
        src="/tools/html.svg"
        alt="HTML/CSS"
        fill
        className="w-12 h-12 p-1 rounded-2xl bg-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300 ease-out"
      />
    ),
    progress: 90,
  },
  {
    name: "R3F",
    icon: (
      <Image
        src="/tools/r3f.png"
        alt="r3f"
        fill
        className="w-10 h-10 p-[0.5rem] my-1 bg-white rounded-full scale-99 hover:bg-white hover:scale-105 transition-all duration-300 ease-out"
      />
    ),
    progress: 70,
  },
  {
    name: "GSAP",
    icon: (
      <svg
        className="w-12 h-12 hover:scale-125 scale-115 transition-all duration-300 ease-out bg-white/10 rounded-2xl p-2 hover:bg-white/20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 82 30"
        aria-label="GSAP"
      >
        <path
          fill="#0ae448"
          d="M23.81 14.013v.013l-1.075 4.665c-.058.264-.322.458-.626.458H20.81a.218.218 0 0 0-.208.155c-1.198 4.064-2.82 6.858-4.962 8.535-1.822 1.428-4.068 2.093-7.069 2.093-2.696 0-4.514-.867-6.056-2.578C.478 25.09-.364 21.388.146 16.926 1.065 8.549 5.41.096 13.776.096c2.545-.023 4.543.762 5.933 2.33 1.47 1.657 2.216 4.154 2.22 7.421a.55.55 0 0 1-.549.536h-6.13a.42.42 0 0 1-.407-.41c-.05-2.259-.72-3.36-2.052-3.36-2.35 0-3.736 3.19-4.471 4.959-1.027 2.47-1.55 5.152-1.447 7.824.049 1.244.249 2.994 1.43 3.718 1.047.643 2.541.217 3.446-.495.904-.711 1.632-1.942 1.938-3.065.043-.156.046-.277.005-.332-.043-.055-.162-.068-.253-.068h-1.574a.572.572 0 0 1-.438-.202.42.42 0 0 1-.087-.362l1.076-4.674c.053-.24.27-.42.537-.453v-.011h10.33c.024 0 .049 0 .072.005.268.034.457.284.452.556h.002Z"
        />
        <path
          fill="#0ae448"
          d="M41.594 8.65a.548.548 0 0 1-.548.531H35.4c-.37 0-.679-.3-.679-.665 0-1.648-.57-2.45-1.736-2.45s-1.918.717-1.94 1.968c-.025 1.395.764 2.662 3.01 4.84 2.957 2.774 4.142 5.232 4.085 8.48C38.047 26.605 34.476 30 29.042 30c-2.775 0-4.895-.743-6.305-2.207-1.431-1.486-2.087-3.668-1.95-6.485a.548.548 0 0 1 .549-.53h5.84a.55.55 0 0 1 .422.209.48.48 0 0 1 .106.384c-.065 1.016.112 1.775.512 2.195.256.272.613.41 1.058.41 1.079 0 1.711-.763 1.735-2.09.02-1.148-.343-2.155-2.321-4.19-2.555-2.496-4.846-5.075-4.775-9.13.042-2.351.976-4.502 2.631-6.056C28.294.868 30.687 0 33.465 0c2.783.02 4.892.813 6.269 2.359 1.304 1.466 1.932 3.582 1.862 6.29h-.002Z"
        />
        <path
          fill="#0ae448"
          d="m59.096 29.012.037-27.932a.525.525 0 0 0-.529-.533h-8.738c-.294 0-.423.252-.507.42L36.707 28.842v.005l-.005.006c-.14.343.126.71.497.71h6.108c.33 0 .548-.1.656-.308l1.213-2.915c.149-.388.177-.424.601-.424h5.836c.406 0 .415.008.408.405l-.131 2.71a.525.525 0 0 0 .529.532h6.17a.522.522 0 0 0 .403-.182.458.458 0 0 0 .104-.369Zm-10.81-9.326c-.057 0-.102-.001-.138-.005a.146.146 0 0 1-.13-.183c.012-.041.029-.095.053-.163l4.377-10.827c.038-.107.086-.212.136-.314.071-.145.157-.155.184-.047.023.09-.502 11.118-.502 11.118-.041.413-.06.43-.467.464l-3.509-.041h-.008l.003-.002Z"
        />
        <path
          fill="#0ae448"
          d="M71.545.547h-4.639c-.245 0-.52.13-.585.422l-6.455 28.029a.423.423 0 0 0 .088.364.572.572 0 0 0 .437.202h5.798c.311 0 .525-.153.583-.418 0 0 .703-3.168.704-3.178.05-.247-.036-.439-.258-.555-.105-.054-.209-.108-.312-.163l-1.005-.522-1-.522-.387-.201a.186.186 0 0 1-.102-.17.199.199 0 0 1 .198-.194l3.178.014c.95.005 1.901-.062 2.836-.234 6.58-1.215 10.95-6.485 11.076-13.656.107-6.12-3.309-9.221-10.15-9.221l-.005.003Zm-1.579 16.68h-.124c-.278 0-.328-.03-.337-.04-.004-.007 1.833-8.073 1.834-8.084.047-.233.045-.367-.099-.446-.184-.102-2.866-1.516-2.866-1.516a.188.188 0 0 1-.101-.172.197.197 0 0 1 .197-.192h4.241c1.32.04 2.056 1.221 2.021 3.237-.061 3.492-1.721 7.09-4.766 7.214Z"
        />
      </svg>
    ),
    progress: 80,
  },
  {
    name: "Three js",
    icon: (
      <Image
        src="/tools/Threejs-logo.svg"
        alt="3js"
        fill
        className="w-12 h-12 p-1 hover:scale-105 transition-all duration-300 ease-out bg-white/10 rounded-2xl hover:bg-white/20"
      />
    ),
    progress: 90,
  },
  {
    name: "Typescript",
    icon: (
      <Image
        src="/tools/typescript.svg"
        alt="typrscript"
        fill
        className="w-12 h-12 p-2 hover:scale-105 transition-all duration-300 ease-out bg-white/10 rounded-2xl hover:bg-white/20"
      />
    ),
    progress: 80,
  },
  {
    name: "React",
    icon: (
      <Image
        src="/tools/j2.svg"
        alt="React"
        fill
        className="w-12 h-12 p-1 hover:scale-105 transition-all duration-300 ease-out bg-white/10 rounded-2xl hover:bg-white/20"
      />
    ),
    progress: 80,
  },
  {
    name: "Next js",
    icon: (
      <Image
        src="/tools/next.svg"
        alt="Next js"
        fill
        className="w-12 h-12 p-1 hover:scale-105 transition-all duration-300 ease-out bg-white/10 rounded-2xl hover:bg-white/20"
      />
    ),
    progress: 80,
  },
  {
    name: "Tailwind ",
    icon: (
      <Image
        src="/tools/tail.svg"
        alt="Tailwind Css"
        fill
        className="w-12 h-12 p-1 hover:scale-105 transition-all duration-300 ease-out bg-white/10 rounded-2xl hover:bg-white/20"
      />
    ),
    progress: 90,
  },
  {
    name: "Motion",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 9"
        className="fill-yellow-300 w-12 h-12 p-1 hover:scale-105 transition-all duration-300 ease-out bg-white/10 rounded-2xl hover:bg-white/20"
        aria-label="Motion"
      >
        <path d="M9.062 0 L4.32 8.992 L0 8.992 L3.703 1.971 C4.277 0.882 5.709 0 6.902 0 Z M19.656 2.248 C19.656 1.006 20.623 0 21.816 0 C23.009 0 23.976 1.006 23.976 2.248 C23.976 3.49 23.009 4.496 21.816 4.496 C20.623 4.496 19.656 3.49 19.656 2.248 Z M9.872 0 L14.192 0 L9.45 8.992 L5.13 8.992 Z M14.974 0 L19.294 0 L15.592 7.021 C15.018 8.11 13.585 8.992 12.392 8.992 L10.232 8.992 Z" />
      </svg>
    ),
    progress: 80,
  },
  {
    name: "React Native",
    icon: (
      <Image
        src="/tools/j2.svg"
        alt="React Native"
        fill
        className="w-12 h-12 p-1 hover:scale-105 transition-all duration-300 ease-out bg-white/10 rounded-2xl hover:bg-white/20"
      />
    ),
    progress: 70,
  },
  {
    name: "Expo",
    icon: (
      <Image
        src="/tools/expo.svg"
        alt="Expo"
        fill
        className="w-12 h-12 p-1 hover:scale-105 transition-all duration-300 ease-out bg-white/10 rounded-2xl hover:bg-white/20"
      />
    ),
    progress: 65,
  },
];

export default function Skills() {
  // Refs for GSAP targets
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

  const gridRef = useRef<HTMLUListElement | null>(null);
  const skillItemsRef = useRef<HTMLLIElement[]>([]);
  useGSAP(() => {
    if (!gridRef.current) return;

    // Add split text animation for heading
    if (headingRef.current) {
      const headingElements = headingRef.current.querySelectorAll("h3, p");
      const splitHeadings = SplitText.create(headingElements, {
        type: "words",
      });

      gsap.from(splitHeadings.words, {
        scrollTrigger: {
          trigger: "#Skills",
          start: "0% 70%",
          end: "10% center",
          scrub: true,
        },
        color: "#000000",
        duration: 1,
        ease: "power1.inOut",
        stagger: 0.1,
      });
    }

    const skillItems = skillItemsRef.current;

    // Create animations for each skill item individually
    skillItems.forEach((item) => {
      // Find elements within this specific skill card
      const cardHeadlines = item.querySelectorAll(".skill-headline");
      const cardDescription = item.querySelectorAll(".skill-description");
      const progressBar = item.querySelector(".progress-bar-fill");
      const iconContainer = item.querySelector(".skill-icon-container");
      const levelLabels = item.querySelectorAll(".skill-level-label");

      if (cardHeadlines.length > 0) {
        // Split text for each headline in this card
        const splitCardHeadlines = SplitText.create(cardHeadlines, {
          type: "chars",
        });
        const splitCardDescription = SplitText.create(cardDescription, {
          type: "chars",
        });
        // Animate the headlines for this specific card using its own ref as the trigger
        gsap.from(splitCardHeadlines.chars, {
          scrollTrigger: {
            trigger: item, // Using the card's own ref as trigger
            start: "top 80%",
            end: "bottom center",

            toggleActions: "play none none reverse",
            scrub: true,
          },
          color: "#000000",
          duration: 1,
          ease: "power2.out",
          stagger: 0.05, // Slightly faster stagger for individual cards
        });

        gsap.from(splitCardDescription.chars, {
          scrollTrigger: {
            trigger: item, // Using the card's own ref as trigger
            start: "top 75%",
            end: "80% 60%",

            toggleActions: "play none none reverse",
            scrub: true,
          },
          duration: 1,
          color: "#000000",
          ease: "power2.out",
          stagger: 0.05, // Adjusted duration for a faster stagger
        });
      }

      // Animate the progress bar
      if (progressBar) {
        gsap.fromTo(
          progressBar,
          {
            width: "0%",
            background: "linear-gradient(to right, #1a1a1a, #252525)", // Start with a dark gradient
          },
          {
            width: progressBar.getAttribute("data-progress") + "%",
            background: "linear-gradient(to right, #6366f1, #a5b4fc, #f3f4f6)", // End with an even lighter blue-purple gradient
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "bottom center",
              toggleActions: "play none none reverse",
              scrub: true,
            },
            duration: 1,
            ease: "power2.out",
          }
        );
      }

      // Animate the icon with a fun bounce/rotate effect
      if (iconContainer) {
        gsap.fromTo(
          iconContainer,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "bottom center",

              toggleActions: "play none none reverse",
              scrub: true,
            },
            duration: 1,
            ease: "power1.out",
          }
        );
      }

      // Animate the level labels (Beginner-Expert)
      if (levelLabels.length) {
        // Create a staggered fade-in effect for the labels
        gsap.fromTo(
          levelLabels,
          {
            y: 20,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              end: "bottom center",
              toggleActions: "play none none reverse",
            },
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }
    });
  });

  return (
    <section
      id="Skills"
      ref={sectionRef}
      className="relative  bg-black text-white py-20 md:py-28 overflow-hidden"
      aria-label="Skills"
    >
      {/* Enhanced background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_center,rgba(24,24,24,0)_0%,rgba(0,0,0,0.7)_60%,rgba(0,0,0,1)_100%)]" />
        <div className="absolute -top-24 -left-16 w-[50vw] h-[50vw] blur-[120px] rounded-full bg-[#3b82f6] opacity-[0.12]" />
        <div className="absolute -bottom-24 -right-24 w-[60vw] h-[60vw] blur-[140px] rounded-full bg-[#a855f7] opacity-[0.12]" />
        <div className="absolute inset-0 mix-blend-soft-light opacity-[0.06] bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAL0lEQVR4AWOgGPrnPwMDA0M0GJqY+P//PxgYGEgwwuZg0j9gYFDE4ZkC0z8QTFgA4t4gkq7iPvEAAAAASUVORK5CYII=')]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-10">
        {/* Enhanced Header */}
        <div ref={headingRef} className="mb-16 md:mb-20 text-center">
          <h3 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Skills that power the polish.
          </h3>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Technologies and tools I&apos;ve mastered to create exceptional
            digital experiences
          </p>
        </div>

        {/* Enhanced Grid */}
        <ul
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {skills.map((skill, i) => (
            <li
              key={skill.name}
              ref={(el) => {
                if (el) skillItemsRef.current[i] = el;
              }}
              className="group relative rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl p-6 md:p-7 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 ease-out transform-gpu"
            >
              {/* Enhanced top row */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative size-14 shrink-0 skill-headline skill-icon-container">
                  {skill.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-lg skill-headline md:text-xl font-bold text-white mb-1">
                    {skill.name}
                  </h4>
                  <p className="skill-description text-sm text-white/60 font-medium">
                    Proficiency: {skill.progress}%
                  </p>
                </div>
              </div>

              {/* Enhanced progress bar */}
              <div className="space-y-3">
                <div className="flex justify-between items-center overflow-clip text-xs text-white/50">
                  <span className="skill-level-label ">Beginner</span>
                  <span className="skill-level-label ">Expert</span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-900/50 overflow-hidden backdrop-blur-sm">
                  <div
                    className="progress-bar-fill h-full rounded-full shadow-lg shadow-indigo-900/25"
                    data-progress={skill.progress}
                    style={{
                      width: "0%", // Start at 0% and animate to the final value
                    }}
                  />
                </div>
              </div>

              {/* Enhanced hover effects */}
              <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-all duration-500 group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-fuchsia-500/10" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
