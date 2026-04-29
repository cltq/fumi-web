"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { label: "Home", path: "/" },
  // { label: "About", path: "/about" },
  { label: "Test", path: "/test" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const normalizedPath = pathname?.replace(/\/$/, "") || "/";
  const activeLink =
    navLinks.find((item) => item.path === normalizedPath) || navLinks[0];

  return (
    <div
      className="fixed left-0 right-0 z-50 flex justify-center pointer-events-none"
      style={{
        top: "1rem",
      }}
    >
      <nav
        className="flex items-center gap-3 pointer-events-auto px-4 py-2 rounded-full"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        {/* Logo — left side */}
        <button
          onClick={() => router.push("/")}
          className="cursor-pointer hover:scale-110 transition-transform duration-200 flex-shrink-0"
        >
          <Image
            src="/favicon.ico"
            alt="logo"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-7 sm:h-7"
          />
        </button>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navLinks.map((nav) => {
            const isActive = activeLink.path === nav.path;
            return (
              <button
                key={nav.path}
                onClick={() => router.push(nav.path)}
                className="relative z-10 px-3 sm:px-2 py-1.5 border-none outline-none cursor-pointer select-none transition-all duration-300 ease-in-out hover:scale-105 rounded-md bg-transparent"
              >
                <span
                  className={`text-sm tracking-wide ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-white/60 font-normal"
                  }`}
                  style={{
                    textShadow: isActive
                      ? "0 0 16px rgba(255, 255, 255, 0.5)"
                      : "none",
                  }}
                >
                  {nav.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Haunt logo — right side */}
        <button
          onClick={async () => {
            const win = window.open(
              "https://haunt.gg/fumi",
              "_blank",
              "noopener,noreferrer"
            );
            try {
              const response = await fetch("/api/s/haunt");
              const data = await response.json();
              if (data.url && win && !win.closed) {
                win.location.href = data.url;
              }
            } catch (error) {
              console.error("Failed to fetch redirect URL:", error);
            }
          }}
          className="cursor-pointer hover:scale-110 transition-transform duration-200 flex-shrink-0"
        >
          <Image
            src="/hauntgg.png"
            alt="logo"
            width={25}
            height={25}
            className="w-5 h-5 sm:w-7 sm:h-7"
          />
        </button>
      </nav>
    </div>
  );
}
