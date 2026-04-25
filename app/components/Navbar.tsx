"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { label: "Home", path: "/" },
  // { label: "About", path: "/about" },
  { label: "Test", path: "/test" },
];

function useWindowWidth() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const windowWidth = useWindowWidth();

  const normalizedPath = pathname?.replace(/\/$/, "") || "/";
  const activeLink =
    navLinks.find((item) => item.path === normalizedPath) || navLinks[0];

  // Responsive pill width: ~55% of viewport, clamped between 260px and 520px.
  // This ensures it looks proportional on mobile, tablet, and desktop alike.
  const scrolledWidth =
    windowWidth > 0
      ? `${Math.min(Math.max(260, Math.round(windowWidth * 0.55)), 220)}px`
      : "350px";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
          width: isScrolled ? scrolledWidth : "100%",
          padding: isScrolled ? "0.5rem 1.2rem" : "1rem 2rem",
          borderRadius: isScrolled ? "500px" : "0px",
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
          boxShadow: "none",
          willChange: "width, border-radius, background",
        }}
      >
        {/* Logo — left side */}
        <div className="flex items-center flex-shrink-0">
          <button
            onClick={() => router.push("/")}
            className="cursor-pointer hover:scale-110 transition-transform duration-200"
          >
            <Image
              src="/favicon.ico"
              alt="logo"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-7 sm:h-7"
            />
          </button>
        </div>

        {/* Nav links — right side */}
        <div className="flex items-center gap-1">
          {navLinks.map((nav) => {
            const isActive = activeLink.path === nav.path;
            return (
              <button
                key={nav.path}
                onClick={() => router.push(nav.path)}
                className="relative z-10 px-3 sm:px-2 py-1.5 text-xs sm:text-sm border-none outline-none cursor-pointer select-none transition-all duration-300 ease-in-out hover:scale-105 font-[family-name:var(--font-geist-mono)] rounded-md"
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
        <div className="flex items-center flex-shrink-0">
          <button
            onClick={async () => {
              // Open window synchronously (required by mobile browsers to avoid popup block)
              const win = window.open('https://haunt.gg/fumi', '_blank', 'noopener,noreferrer');
              try {
                const response = await fetch('/api/s/haunt');
                const data = await response.json();
                if (data.url && win && !win.closed) {
                  win.location.href = data.url;
                }
              } catch (error) {
                console.error('Failed to fetch redirect URL:', error);
                // Window already opened with fallback URL — nothing more to do
              }
            }}
            className="cursor-pointer hover:scale-110 transition-transform duration-200"
          >
            <Image
              src="/hauntgg.png"
              alt="logo"
              width={25}
              height={25}
              className="w-5 h-5 sm:w-7 sm:h-7"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}