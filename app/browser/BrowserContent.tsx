"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "../components/Footer";
import Image from "next/image";

interface Theme {
  gradient: string;
  dateColor: string;
  inputBorder: string;
  inputBg: string;
  inputText: string;
  inputRing: string;
  buttonColor: string;
  background: string;
}

const themes: Record<string, Theme> = {
  k: {
    gradient: "linear-gradient(to right, #a855f7, #ec4899)",
    dateColor: "rgba(255, 255, 255, 0.8)",
    inputBorder: "rgba(255, 255, 255, 0.5)",
    inputBg: "rgba(0, 0, 0, 0.3)",
    inputText: "rgba(255, 255, 255, 0.8)",
    inputRing: "rgba(255, 255, 255, 0.3)",
    buttonColor: "rgba(255, 255, 255, 0.5)",
    background: "https://raw.githubusercontent.com/cltq/cltq/refs/heads/main/assets/Kanade.png",
  },
  yuki: {
    gradient: "linear-gradient(to right, #2d1b69, #6b3fa0)",
    dateColor: "rgba(255, 255, 255, 0.8)",
    inputBorder: "rgba(255, 255, 255, 0.4)",
    inputBg: "rgba(107, 63, 160, 0.2)",
    inputText: "rgba(255, 255, 255, 0.9)",
    inputRing: "rgba(107, 63, 160, 0.5)",
    buttonColor: "rgba(255, 255, 255, 0.5)",
    background: "https://raw.githubusercontent.com/cltq/cltq/refs/heads/main/assets/Mafuyu.png",
  },
  nene: {
    gradient: "linear-gradient(to right, #33dd99, #33dd99)",
    dateColor: "rgba(255, 255, 255, 0.8)",
    inputBorder: "rgba(255, 255, 255, 0.4)",
    inputBg: "rgba(51, 221, 153, 0.2)",
    inputText: "rgba(255, 255, 255, 0.9)",
    inputRing: "rgba(51, 221, 153, 0.5)",
    buttonColor: "rgba(255, 255, 255, 0.5)",
    background: "https://raw.githubusercontent.com/cltq/cltq/refs/heads/main/assets/Nene.png",
  },
};

export default function BrowserContent() {
  const searchParams = useSearchParams();
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const themeKey = searchParams.get("theme") || "k";
  const theme = useMemo(() => themes[themeKey] || themes.k, [themeKey]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-stretch font-[family-name:var(--font-geist-pixel-square)] relative">
      <div className="absolute inset-0 z-0">
        <Image
          src={theme.background}
          alt="background"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="absolute top-4 right-4 z-20 text-right" style={{ lineHeight: 1 }}>
        <p
          style={{
            fontSize: "65px",
            background: theme.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {time}
        </p>
        <p className="text-lg" style={{ color: theme.dateColor }}>
          {date}
        </p>
      </div>

      <main className="flex flex-1 flex-col items-end justify-end pb-8 px-4 relative z-10">
        <div className="w-full max-w-2xl mx-auto">
          <form action="https://search.brave.com/search" method="GET">
            <div className="relative">
              <input
                type="text"
                name="q"
                placeholder="Search"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                className="w-full px-5 py-3 pr-12 rounded-full border-2 text-lg focus:outline-none placeholder:opacity-40"
                style={{
                  borderColor: theme.inputBorder,
                  background: theme.inputBg,
                  color: theme.inputText,
                }}
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ color: theme.buttonColor }}
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
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
