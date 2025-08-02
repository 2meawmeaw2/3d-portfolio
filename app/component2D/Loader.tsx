"use client";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useProgress } from "@react-three/drei";

export default function LoaderScreen() {
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLParagraphElement>(null);
  const { progress } = useProgress();

  // Animate progress bar
  useGSAP(() => {
    document.body.style.overflowY = "hidden";

    if (!progressBarRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        // Auto-focus button for accessibility
        setTimeout(() => buttonRef.current?.focus(), 100);
      },
    });

    // Simulate realistic loading progression
    tl.to(progressBarRef.current, {
      width: "33%",
      duration: 0.7,
      ease: "power1.out",
    })
      .to(progressBarRef.current, {
        width: "67%",
        duration: 0.9,
        ease: "power1.inOut",
      })
      .to(progressBarRef.current, {
        width: "98%",
        duration: 1.2,
        ease: "power1.in",
      })
      .to(progressBarRef.current, {
        width: "100%",
        duration: 0.3,
        ease: "none",
      });
  }, []);

  // Handle exit animation
  const handleExit = () => {
    const tl = gsap.timeline({
      onComplete: () => setIsVisible(false),
    });

    tl.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.2,
      ease: "power2.out",
    })
      .to(
        buttonRef.current,
        {
          backgroundColor: "white",
          color: "black",
          borderRadius: "16px",
          scale: 1.05,
          duration: 0.3,
        },
        "<"
      )
      .to(
        loaderRef.current,
        {
          autoAlpha: 0,
          backgroundColor: "white",
          duration: 0.8,
          ease: "power2.inOut",
        },
        ">0.2"
      )
      .to(
        "body",
        {
          overflowY: "auto",
          duration: 0.1,
        },
        "<"
      );
  };

  // Remove loader from DOM when not visible
  if (!isVisible) return null;

  return (
    <div
      ref={loaderRef}
      className="loader fixed z-[60] inset-0 bg-black flex flex-col w-screen h-screen justify-center items-center"
    >
      <div
        className={`w-full max-w-md px-10 h-20 flex justify-start items-center border-2 rounded-lg overflow-hidden transition-colors duration-500 ${
          isComplete ? "border-white" : "border-white/20"
        }`}
      >
        <span
          ref={progressBarRef}
          className="block h-0.5 rounded-full bg-white origin-left"
          style={{ width: "0%" }}
        />
      </div>

      <div className="h-16 mt-10 flex items-center justify-center">
        <p
          ref={buttonRef}
          className={`enter px-5 py-2 text-white text-xl md:text-2xl font-light rounded-lg transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] transform-gpu cursor-pointer focus:ring-2 focus:ring-white focus:outline-none ${
            isComplete
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[50%] pointer-events-none"
          }`}
          onClick={handleExit}
          tabIndex={isComplete ? 0 : -1}
          aria-hidden={!isComplete}
        >
          Enter the portfolio
        </p>
      </div>
    </div>
  );
}
