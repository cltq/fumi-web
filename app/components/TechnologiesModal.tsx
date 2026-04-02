"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { technologies, type Technology } from "@/app/lib/technologies";
import { glassmorphism } from "@/app/lib/styles";

const categoryLabels: Record<Technology["category"], string> = {
  framework: "Framework",
  language: "Language",
  library: "Library",
  tool: "Tool",
  deployment: "Deployment",
  font: "Font",
};

interface TechnologiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TechnologiesModal({ isOpen, onClose }: TechnologiesModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
    } else {
      setIsVisible(false);
      timeoutRef.current = setTimeout(() => {
        setMounted(false);
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const grouped = technologies.reduce(
    (acc, tech) => {
      if (!acc[tech.category]) {
        acc[tech.category] = [];
      }
      acc[tech.category].push(tech);
      return acc;
    },
    {} as Record<Technology["category"], Technology[]>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 transition-all duration-300"
      style={{
        background: isVisible ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0)",
        backdropFilter: isVisible ? "blur(6px)" : "blur(0px)",
        WebkitBackdropFilter: isVisible ? "blur(6px)" : "blur(0px)",
        opacity: isVisible ? 1 : 0,
      }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-[24px] p-6 sm:p-8 transition-all duration-300"
        style={{
          ...glassmorphism,
          background: "rgba(10, 10, 10, 0.9)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          transform: isVisible ? "scale(1) translateY(0)" : "scale(0.95) translateY(10px)",
          opacity: isVisible ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold">Technologies</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-all duration-200 hover:scale-110"
            style={{ color: "rgba(255, 255, 255, 0.6)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.95)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="space-y-6 sm:space-y-8">
          {Object.entries(grouped).map(([category, techs]) => (
            <section key={category}>
              <h3 className="text-sm font-medium mb-3 sm:mb-4 opacity-50 uppercase tracking-wide">
                {categoryLabels[category as Technology["category"]]}
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {techs.map((tech) => (
                  <Link
                    key={tech.name}
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 sm:p-4 rounded-lg border transition-all duration-200 hover:border-white/30"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      borderColor: "rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <h4 className="font-medium text-sm sm:text-base mb-1">{tech.name}</h4>
                    <p className="text-xs sm:text-sm opacity-50">{tech.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
