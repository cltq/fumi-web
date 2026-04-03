"use client";

import { useState, useRef, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const normalizedPath = pathname?.replace(/\/$/, "") || "/";
  const activeLink =
    navLinks.find((item) => item.path === normalizedPath) || navLinks[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 flex justify-center z-50 pointer-events-none">
      <div className="relative">
        <nav
          ref={navRef}
          className="relative flex items-center pointer-events-auto transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: isScrolled ? "scaleX(0.85)" : "scaleX(1)",
            transformOrigin: "center",
            maxWidth: isScrolled ? "480px" : "100%",
            padding: isScrolled ? "0.5rem 1.5rem" : "1rem 1.5rem",
            borderRadius: isScrolled ? "9999px" : "0px",
            justifyContent: "space-between",
            background: isScrolled
              ? "rgba(10, 10, 10, 0.75)"
              : "transparent",
            backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
            WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
            border: isScrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
            boxShadow: isScrolled
              ? "0 8px 32px rgba(0, 0, 0, 0.4)"
              : "none",
            willChange: "transform",
          }}
        >
          <div className="flex items-center">
            <Image
              src="/vercel.svg"
              alt="logo"
              width={16}
              height={16}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </div>

          <div className="flex items-center gap-1">
            {navLinks.map((nav) => {
              const isActive = activeLink.path === nav.path;
              return (
                <button
                  key={nav.path}
                  onClick={() => router.push(nav.path)}
                  className="relative z-10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm border-none outline-none cursor-pointer select-none transition-all duration-300 ease-in-out hover:scale-105 font-[family-name:var(--font-geist-mono)]"
                  style={{
                    background: "transparent",
                    color: isActive
                      ? "rgba(255,255,255,0.98)"
                      : "rgba(255,255,255,0.7)",
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: "0.02em",
                    textShadow: isActive
                      ? "0 0 16px rgba(255, 255, 255, 0.5)"
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.95)";
                      (e.currentTarget as HTMLButtonElement).style.textShadow = "0 0 12px rgba(255, 255, 255, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
                      (e.currentTarget as HTMLButtonElement).style.textShadow = "none";
                    }
                  }}
                >
                  {nav.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
