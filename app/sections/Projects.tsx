"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";
gsap.registerPlugin(ScrollTrigger, SplitText);

// Use the actual parameter type that `urlFor` expects (no `any`)
type ImageSource = Parameters<typeof urlFor>[0];

interface Project {
  title: string;
  description: string;
  url: string;
  image: ImageSource;
  subtitle?: string;
  slug?: { current: string };
}

const query = `*[_type == "project"] | order(_createdAt desc){
  title,
  subtitle,
  slug,
  description,
  url,
  image
}`;

export function Project() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  // Refs for GSAP targets
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Store SplitText instances to avoid recreation
  const splitInstancesRef = useRef<{
    headline?: SplitText;
    description?: SplitText;
    cards?: SplitText;
  }>({});

  // GSAP animations
  useGSAP(() => {
    if (!headingRef.current || !gridRef.current || !sectionRef.current) return;

    // Clean up existing instances
    Object.values(splitInstancesRef.current).forEach((instance) => {
      instance?.revert?.();
    });

    // Create SplitText instances
    const splitHeadline = SplitText.create(".work-headline", {
      type: "words", // Changed to words to match About section
    });

    const splitDescription = SplitText.create(".work-description", {
      type: "words", // Changed to words to match About section
    });

    // Store instances for cleanup
    splitInstancesRef.current = {
      headline: splitHeadline,
      description: splitDescription,
    };

    // Set initial styles to avoid FOUC

    // Optimized heading animation with better performance - similar to About section
    gsap.from(splitHeadline.words, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "0% 70%",
        end: "70% center",
        scrub: !isMobile,
      },
      color: "#000000",
      duration: 1,
      ease: "power1.inOut",
      stagger: 0.1,
    });

    gsap.from(splitDescription.words, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "0% 60%",
        end: "80% center",
        scrub: !isMobile,
      },
      color: "#000000",
      duration: 1,
      ease: "power1.inOut",
      stagger: 0.1,
    });

    // Card animations - only run when data is loaded
    if (!loading && data.length > 0) {
      // Create card text splits
      const splitCard = SplitText.create(".project-card-texts", {
        type: "words",
        wordsClass: "split-char-card",
      });

      splitInstancesRef.current.cards = splitCard;

      // Set initial states
      gsap.set(".project-card", {
        opacity: 0,
      });

      // Animate cards in
      gsap.to(".project-card", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top center",
          end: "60% center",
          scrub: !isMobile,
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        duration: 1,
        stagger: 0.03,
        ease: "power2.out",
      });
      gsap.from(splitCard.words, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top center",
          end: "60% center",
          scrub: !isMobile,
          toggleActions: "play none none reverse",
        },
        autoAlpha: 0,
        stagger: 0.02,
        duration: 1,
        ease: "power1.inOut",
      });
    }
    // Removed duplicate animation for splitDescriptionFav since we now animate it with the others

    // Cleanup function
    return () => {
      Object.values(splitInstancesRef.current).forEach((instance) => {
        instance?.revert?.();
      });
    };
  }, [loading, data.length]);

  const items = useMemo(
    () =>
      data.map((p, i) => ({
        ...p,
        _id:
          "project-" +
          p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
          "-" +
          i,
        slug:
          p.slug?.current ||
          p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
          `project-${i}`,
      })),
    [data]
  );

  // Fetch data
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await client.fetch<Project[]>(query);

        if (!mounted) return;

        setData(res || []);
        setLoading(false);

        // Refresh ScrollTrigger after data loads
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      } catch (err) {
        console.error(err);
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Track image loads to refresh ScrollTrigger precisely after images paint
  useEffect(() => {
    if (loading || !data.length) return;

    const el = gridRef.current;
    if (!el) return;

    let pending = 0;
    const imgs = Array.from(el.querySelectorAll("img"));
    if (!imgs.length) return;

    const maybeRefresh = () => {
      ScrollTrigger.refresh();
    };

    const onLoad = () => {
      pending -= 1;
      if (pending <= 0) {
        requestAnimationFrame(maybeRefresh);
      }
    };

    imgs.forEach((img) => {
      if (img.complete) return;
      pending += 1;
      img.addEventListener("load", onLoad);
      img.addEventListener("error", onLoad);
    });

    if (pending === 0) maybeRefresh();

    return () => {
      imgs.forEach((img) => {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onLoad);
      });
    };
  }, [data.length, loading]);

  return (
    <section
      id="Projects"
      ref={sectionRef}
      className="relative z-40 bg-black text-white py-20 md:py-28 overflow-clip"
      aria-label="Selected projects"
    >
      {/* BACKGROUND LAYERS */}
      <div className="pointer-events-none absolute inset-0">
        {/* large vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_center,rgba(24,24,24,0)_0%,rgba(0,0,0,0.6)_60%,rgba(0,0,0,1)_100%)]" />
        {/* spotlights */}
        <div
          className="parallax-y absolute -top-40 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] max-w-[1200px] max-h-[1200px] rounded-full blur-[120px] opacity-60 bg-[conic-gradient(from_90deg_at_50%_50%,#275DFA33_0%,#B794FF33_30%,transparent_60%)]"
          data-speed="0.5"
        />
        <div
          className="parallax-y absolute -bottom-32 -right-20 w-[70vw] h-[70vw] blur-[140px] rounded-full bg-[#a855f7] opacity-[0.10]"
          data-speed="0.35"
        />
        {/* grain */}
        <div className="absolute inset-0 mix-blend-soft-light opacity-[0.08] bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAL0lEQVR4AWOgGPrnPwMDA0M0GJqY+P//PxgYGEgwwuZg0j9gYFDE4ZkC0z8QTFgA4t4gkq7iPvEAAAAASUVORK5CYII=')]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-10">
        {/* headline + cta */}
        <div
          ref={headingRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8"
        >
          <div>
            <h2 className="work-headline mb-10 text-[9vw] leading-[0.9] md:text-[4.5vw] font-extrabold tracking-tight will-change-transform">
              Work that moves people.
            </h2>
            <p className="work-description mt-3 md:mt-4 text-white/80 max-w-[65ch] will-change-transform">
              Hand-tuned micro-interactions, clean systems, and purposeful
              motion.
            </p>
            <p className="work-description overflow-clip mt-3 md:mt-4 text-white/80 max-w-[65ch] will-change-transform">
              Here are a few recent favorites :
            </p>
          </div>
        </div>

        {/* cards */}
        <div
          ref={gridRef}
          className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7"
        >
          {loading && !items.length
            ? // minimal skeleton
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md animate-pulse"
                >
                  <div className="aspect-[4/3] bg-white/5" />
                  <div className="p-4 md:p-5">
                    <div className="h-5 w-2/3 bg-white/10 rounded" />
                    <div className="mt-3 h-4 w-full bg-white/10 rounded" />
                    <div className="mt-2 h-4 w-5/6 bg-white/10 rounded" />
                  </div>
                </div>
              ))
            : items.map((p) => (
                <Link
                  key={p._id}
                  href={`/projects/${p.slug}`}
                  aria-labelledby={`${p._id}-title`}
                  className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md will-change-transform"
                >
                  <div className="project-card relative aspect-[4/3] overflow-hidden">
                    <Image
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      alt={p.title}
                      src={urlFor(p.image).url()}
                      className="object-cover"
                    />
                    {/* halo */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[160%] h-[160%] rounded-[50%] blur-[90px] opacity-35 bg-[radial-gradient(closest-side,rgba(39,93,250,0.35),rgba(167,139,250,0.22),transparent_70%)] pointer-events-none" />
                    {/* gloss */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
                  </div>

                  {/* body */}
                  <div className="relative p-4 md:p-5">
                    <h3
                      id={`${p._id}-title`}
                      className="text-lg project-card-texts md:text-xl font-semibold tracking-tight"
                    >
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-base project-card-texts text-white/70 line-clamp-2">
                      {p.description}
                    </p>

                    {/* hover footer */}
                    <div className="mt-4 flex items-center justify-between opacity-90">
                      <span className="flex items-center gap-1 text-sm md:text-base">
                        <span className="project-card-texts">
                          View case study
                        </span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="transition-transform duration-300 group-hover:translate-x-1"
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
                      </span>

                      <span className="project-card-texts text-[11px] md:text-xs text-white/50 group-hover:text-white/70 transition-colors">
                        Open
                      </span>
                    </div>

                    {/* focus ring */}
                    <span className="absolute inset-0 ring-0 ring-white/0 group-focus-visible:ring-2 group-focus-visible:ring-white/40 rounded-2xl pointer-events-none" />
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
