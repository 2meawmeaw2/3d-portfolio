import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import type React from "react";

type LinkProps = {
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = {
  href?: undefined; // ensures href isn't allowed on the button variant
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type MagneticButtonProps = {
  className?: string;
  children: React.ReactNode;
} & (LinkProps | ButtonProps);

export default function MagneticButton(props: MagneticButtonProps) {
  const { className, children, ...rest } = props;

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const quickX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    quickX.current = gsap.quickTo(wrapRef.current, "x", {
      duration: 0.3,
      ease: "power3.out",
    });
    quickY.current = gsap.quickTo(wrapRef.current, "y", {
      duration: 0.3,
      ease: "power3.out",
    });
    return () => {
      quickX.current = null;
      quickY.current = null;
    };
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el || !quickX.current || !quickY.current) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / 6;
    const dy = (e.clientY - (rect.top + rect.height / 2)) / 6;
    quickX.current(dx);
    quickY.current(dy);
  };

  const reset = () => {
    quickX.current?.(0);
    quickY.current?.(0);
  };

  const isLink = "href" in props && typeof props.href === "string";

  return (
    <div ref={wrapRef}>
      {isLink ? (
        <a
          ref={btnRef as React.MutableRefObject<HTMLAnchorElement | null>}
          href={props.href}
          onMouseMove={handleMove}
          onMouseLeave={reset}
          className={cn(
            "group relative inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-medium",
            "backdrop-blur-xl border border-white/10 bg-white/5 text-white",
            "transition-[transform,background] hover:bg-white/10 active:scale-[0.98]",
            className
          )}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {/* shine */}
          <span className="pointer-events-none absolute inset-0 rounded-2xl [mask-image:radial-gradient(40%_90%_at_50%_10%,#000_50%,transparent_60%)]">
            <span className="absolute inset-0 -translate-y-1/2 animate-[shine_3.2s_linear_infinite] bg-gradient-to-b from-white/30 via-white/5 to-transparent" />
          </span>
          {children}
        </a>
      ) : (
        <button
          ref={btnRef as React.MutableRefObject<HTMLButtonElement | null>}
          type={
            (rest as React.ButtonHTMLAttributes<HTMLButtonElement>).type ??
            "button"
          }
          onMouseMove={handleMove}
          onMouseLeave={reset}
          className={cn(
            "group relative inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-medium",
            "backdrop-blur-xl border border-white/10 bg-white/5 text-white",
            "transition-[transform,background] hover:bg-white/10 active:scale-[0.98]",
            className
          )}
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {/* shine */}
          <span className="pointer-events-none absolute inset-0 rounded-2xl [mask-image:radial-gradient(40%_90%_at_50%_10%,#000_50%,transparent_60%)]">
            <span className="absolute inset-0 -translate-y-1/2 animate-[shine_3.2s_linear_infinite] bg-gradient-to-b from-white/30 via-white/5 to-transparent" />
          </span>
          {children}
        </button>
      )}
    </div>
  );
}
