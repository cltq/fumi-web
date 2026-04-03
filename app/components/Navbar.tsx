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
    /*
     * Outer wrapper: ALWAYS left-0 right-0, flex justify-center.
     * This is the key — the nav shrinks/grows within a stable full-width
     * container, so both edges animate inward/outward symmetrically.
     */
    <div
      className="fixed left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        top: isScrolled ? "1rem" : "0",
      }}
    >
      <nav
        ref={navRef}
        className="flex items-center justify-between pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          // Width drives the "compress from both sides" animation.
          // No maxWidth — width alone handles it.
          width: isScrolled ? "300px" : "100%",
          padding: isScrolled ? "0.5rem 1.5rem" : "1rem 2rem",
          borderRadius: isScrolled ? "9999px" : "0px",
          background: isScrolled
            ? "rgba(255, 255, 255, 0.1)"
            : "transparent",
          border: isScrolled
            ? "1px solid rgba(255,255,255,0.2)"
            : "1px solid transparent",
          backdropFilter: isScrolled
            ? "blur(20px) saturate(180%)"
            : "blur(0px)",
          WebkitBackdropFilter: isScrolled
            ? "blur(20px) saturate(180%)"
            : "blur(0px)",
          // Keep border always present but transparent when not scrolled
          // so the transition animates smoothly instead of snapping.
          border: isScrolled
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid transparent",
          boxShadow: "none",
          willChange: "width, border-radius, background",
        }}
      >
        {/* Logo — left side */}
        <div className="flex items-center flex-shrink-0">
          <Image
            src="/vercel.svg"
            alt="logo"
            width={16}
            height={16}
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
        </div>

        {/* Nav links — right side */}
        <div className="flex items-center gap-1">
          {navLinks.map((nav) => {
            const isActive = activeLink.path === nav.path;
            return (
              <button
                key={nav.path}
                onClick={() => router.push(nav.path)}
                className="relative z-10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm border-none outline-none cursor-pointer select-none transition-all duration-300 ease-in-out hover:scale-105 font-[family-name:var(--font-geist-mono)] rounded-md"
                style={{
                  background: "transparent",
                  color: isActive
                    ? "rgb(255, 255, 255)"
                    : "rgba(255, 255, 255, 0.56)",
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: "0.02em",
                  textShadow: isActive
                    ? "0 0 16px rgba(255, 255, 255, 0.5)"
                    : "none",
                  borderRadius: "6px",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "rgba(255,255,255,0.95)";
                    (e.currentTarget as HTMLButtonElement).style.textShadow =
                      "0 0 12px rgba(255, 255, 255, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "rgba(255,255,255,0.7)";
                    (e.currentTarget as HTMLButtonElement).style.textShadow =
                      "none";
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
  );
}