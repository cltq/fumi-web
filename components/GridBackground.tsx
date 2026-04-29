"use client";

import { useEffect, useRef, useState } from "react";

export default function GridBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const animate = () => {
      currentX += (mouseX - currentX) * 0.2; // fast follow
      currentY += (mouseY - currentY) * 0.2;

      el.style.setProperty("--x", `${currentX}px`);
      el.style.setProperty("--y", `${currentY}px`);

      requestAnimationFrame(animate);
    };

    animate();

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setActive(true); // enable effect after first move
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 bg-[#0b0b0f]"
      style={{
        ["--x" as any]: "50%",
        ["--y" as any]: "50%",
      }}
    >
      {/* Base grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Brighter grid near cursor */}
      {active && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage: `radial-gradient(circle 160px at var(--x) var(--y), white, transparent 70%)`,
            WebkitMaskImage: `radial-gradient(circle 160px at var(--x) var(--y), white, transparent 70%)`,
          }}
        />
      )}

      {/* Thicker grid near cursor */}
      {active && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.16) 2px, transparent 2px),
              linear-gradient(90deg, rgba(255,255,255,0.16) 2px, transparent 2px)
            `,
            backgroundSize: "48px 48px",
            maskImage: `radial-gradient(circle 100px at var(--x) var(--y), white, transparent 70%)`,
            WebkitMaskImage: `radial-gradient(circle 100px at var(--x) var(--y), white, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
}