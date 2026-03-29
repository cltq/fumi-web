"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Test", path: "/test" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [isReady, setIsReady] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isFirstRender = useRef(true);

  const normalizedPath = pathname?.replace(/\/$/, "") || "/";
  const activeLink =
    navLinks.find((item) => item.path === normalizedPath) || navLinks[0];

  const updateIndicator = useCallback(() => {
    const idx = navLinks.findIndex((item) => item.path === activeLink.path);
    const btn = buttonRefs.current[idx];
    const nav = navRef.current;
    if (!btn || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    setIndicatorStyle({
      left: btnRect.left - navRect.left,
      width: btnRect.width,
    });
  }, [activeLink.path]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      requestAnimationFrame(() => {
        requestAnimationFrame(updateIndicator);
      });
    }

    setIsReady(false);
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(updateIndicator);
        setIsReady(true);
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname, updateIndicator]);

  return (
    <div className="fixed top-3 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-center z-50 pointer-events-none">
      <nav
        ref={navRef}
        className="relative flex items-center gap-0.5 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-[65px] pointer-events-auto"
        style={{
          background: "rgba(0, 0, 0, 0.72)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow:
            "0 8px 32px rgba(255, 255, 255, 0.01), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        <div className="pl-1.5 sm:pl-2">
            <Image src="/vercel.svg" alt="logo" width={16} height={16} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        </div>
        
        {/* Divider */}
        <div
        className="flex-shrink-0 mx-2 sm:mx-3"
        style={{
            width: "1px",
            height: 16,
            background: "rgba(129, 129, 129, 0.85)",
        }}
        />

        <div
          className="absolute rounded-[65px]"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            height: 32,
            top: "50%",
            transform: "translateY(-50%)",
            background: "linear-gradient(135deg, #ffffff, #ffffff)",
            boxShadow: "0 0 18px rgba(255, 255, 255, 0.55)",
            transition: isReady
              ? "left 0.34s cubic-bezier(0.25, 0.8, 0.25, 1), width 0.34s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.15s ease"
              : "none",
            opacity: isReady ? 1 : 0,
            zIndex: 0,
          }}
        />

        {navLinks.map((nav, i) => {
          const isActive = activeLink.path === nav.path;
          return (
            <button
              key={nav.path}
              ref={(el) => {
                buttonRefs.current[i] = el;
              }}
              onClick={() => router.push(nav.path)}
              className="relative z-10 px-3 sm:px-4 py-1.5 rounded-[65px] text-xs sm:text-sm border-none outline-none cursor-pointer select-none transition-all duration-250 ease-in-out hover:scale-105 hover:text-white font-[family-name:var(--font-geist-mono)]"
              style={{
                background: "transparent",
                color: isActive ? "#000" : "rgba(255,255,255,0.78)",
                fontWeight: isActive ? 700 : 500,
                letterSpacing: "0.01em",
                textShadow: isActive ? "0 0 10px rgba(252, 253, 253, 0.85)" : "none",
                transition: "color 0.18s ease, transform 0.25s ease, text-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.98)";
                  (e.currentTarget as HTMLButtonElement).style.textShadow = "0 0 8px rgba(255, 255, 255, 0.8)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.78)";
                  (e.currentTarget as HTMLButtonElement).style.textShadow = "none";
                }
              }}
            >
              {nav.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
