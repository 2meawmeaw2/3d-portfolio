"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail, MapPin } from "lucide-react";
// optional: keep your word flipper

gsap.registerPlugin(SplitText, ScrollTrigger);

export function Contact() {
  const root = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  // ---- form state (unchanged) ----
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setIsSubmitted(false);
    setLoading(true);
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        console.error("Failed to send", await res.json().catch(() => ({})));
        return;
      }
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error submitting form", err);
    } finally {
      setLoading(false);
    }
  };

  // ---- GSAP animations to match Hero ----
  useGSAP(
    () => {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Split headings
      const splitH1 = SplitText.create(".contact-headline", {
        type: "words,chars",
      });
      const splitH2 = SplitText.create(".contact-sub", { type: "chars" });

      gsap.set([splitH1.chars, splitH2.chars], { yPercent: 120, autoAlpha: 0 });
      gsap.set(".form-field", { y: 24, autoAlpha: 0 });
      gsap.set(".info-item", { y: 10, autoAlpha: 0 });

      // Entrance timeline on scroll
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          end: "top 70%",
          toggleActions: "play none reverse none",
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
        0
      )
        .to(".hero-shine", { opacity: 1, duration: 0.6 }, 0)
        .to(
          splitH2.chars,
          { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.01 },
          0.9
        )
        .to(
          ".info-item",
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.06,
          },
          1.0
        )
        .to(
          ".form-field",
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.08,
          },
          1.1
        )
        .from(
          ".cta",
          {
            y: 20,
            autoAlpha: 0,
            duration: 0.5,
          },
          1.2
        );

      // Subtle parallax layers
      gsap.utils.toArray<HTMLElement>(".parallax-y").forEach((el, i) => {
        const speed = Number(el.dataset.speed || (i % 2 ? 0.6 : 0.3));
        gsap.to(el, {
          yPercent: prefersReduced ? 0 : gsap.utils.random(-5, 5) * speed,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
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

  // Magnetic CTA (same behavior as Hero)
  useEffect(() => {
    const items = Array.from(
      (root.current || document).querySelectorAll<HTMLButtonElement>(
        ".magnetic"
      )
    );
    const enter = (e: MouseEvent) => {
      gsap.to(e.currentTarget as HTMLButtonElement, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
      });
    };
    const leave = (e: MouseEvent) => {
      gsap.to(e.currentTarget as HTMLButtonElement, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.35,
        ease: "power3.out",
      });
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

  return (
    <section
      id="Contact"
      ref={root}
      className="relative min-h-screen w-full bg-black text-white overflow-clip"
      aria-label="Contact"
    >
      {/* BACKGROUND LAYERS (mirrors Hero) */}
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
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-10 py-20 md:py-28">
        {/* badges row to echo Hero */}
        <div className="flex items-center gap-3 md:gap-4 mb-8">
          <span
            className="float-card parallax-y text-xs md:text-sm uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md"
            data-speed="0.6"
          >
            Let’s talk
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* Left: headline + info */}
          <div className="md:col-span-6">
            <h1 className="contact-headline text-[9vw] leading-[0.9] md:text-[5.5vw] font-extrabold tracking-tight">
              Contact Me{" "}
            </h1>

            <h2 className="contact-sub mt-4 md:mt-6 text-base md:text-xl max-w-[60ch] text-white/80">
              Projects, collaborations, or a quick idea .
            </h2>

            <div className="mt-8 space-y-3 md:space-y-4">
              <div className="info-item flex items-center gap-3 text-white/90 text-sm md:text-base">
                <Mail className="w-5 h-5 opacity-90" aria-hidden />
                <span className="select-all">tahaslco@gmail.com</span>
              </div>
              <div className="info-item flex items-center gap-3 text-white/90 text-sm md:text-base">
                <MapPin className="w-5 h-5 opacity-90" aria-hidden />
                <span>Algeria</span>
              </div>
            </div>
          </div>

          {/* Right: form card */}
          <div className="md:col-span-6 relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md">
            {/* subtle halo behind form (mirrors robot halo) */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[140%] h-[140%] rounded-[50%] blur-[80px] opacity-40 bg-[radial-gradient(closest-side,rgba(39,93,250,0.4),rgba(167,139,250,0.25),transparent_70%)]" />
            <form
              onSubmit={handleSubmit}
              className="relative z-10 p-4 sm:p-6 md:p-8"
            >
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-6 hero-shine opacity-0"
                style={{ textShadow: "0px -1px 10px #FFFFFF80" }}
              >
                Send me a message
              </h3>

              <div className="space-y-4 sm:space-y-5">
                <div className="space-y-2 form-field">
                  <label
                    htmlFor="name"
                    className="text-white/80 text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    required
                    id="name"
                    type="text"
                    placeholder="Your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full text-sm sm:text-base bg-white/10 py-2 px-3 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 border border-white/10"
                  />
                </div>

                <div className="space-y-2 form-field">
                  <label
                    htmlFor="email"
                    className="text-white/80 text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    required
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-sm sm:text-base bg-white/10 py-2 px-3 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 border border-white/10"
                  />
                </div>

                <div className="space-y-2 form-field">
                  <label
                    htmlFor="subject"
                    className="text-white/80 text-sm font-medium"
                  >
                    Subject
                  </label>
                  <input
                    required
                    id="subject"
                    type="text"
                    placeholder="What's this about?"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full text-sm sm:text-base bg-white/10 py-2 px-3 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 border border-white/10"
                  />
                </div>

                <div className="space-y-2 form-field">
                  <label
                    htmlFor="message"
                    className="text-white/80 text-sm font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    required
                    id="message"
                    rows={4}
                    placeholder="Tell me about your project..."
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full text-sm sm:text-base bg-white/10 border border-white/10 rounded-xl p-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="cta magnetic w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 bg-white text-black font-semibold shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_20px_60px_-20px_rgba(255,255,255,0.25)] transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>{loading ? "Sending..." : "Send Message"}</span>
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

                {isSubmitted && (
                  <p className="text-green-400 rounded-2xl border p-2 text-center w-[50%] mx-auto text-sm">
                    Your message has been sent!
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
