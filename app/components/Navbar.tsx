"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Row, Text } from "@once-ui-system/core";

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
      <Row
        as="nav"
        gap="12"
        paddingX="16"
        paddingY="8"
        radius="full"
        background="surface"
        border="neutral-alpha-weak"
        className="pointer-events-auto"
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
        vertical="center"
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
        <Row gap="4" vertical="center">
          {navLinks.map((nav) => {
            const isActive = activeLink.path === nav.path;
            return (
              <button
                key={nav.path}
                onClick={() => router.push(nav.path)}
                className="relative z-10 px-3 sm:px-2 py-1.5 border-none outline-none cursor-pointer select-none transition-all duration-300 ease-in-out hover:scale-105 rounded-md"
                style={{
                  background: "transparent",
                }}
              >
                <Text
                  variant="label-default-s"
                  onBackground={isActive ? "neutral-strong" : "neutral-weak"}
                  style={{
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: "0.02em",
                    textShadow: isActive
                      ? "0 0 16px rgba(255, 255, 255, 0.5)"
                      : "none",
                  }}
                >
                  {nav.label}
                </Text>
              </button>
            );
          })}
        </Row>

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
      </Row>
    </div>
  );
}
