"use client";

import { useEffect, useRef } from "react";

const TEXT = "Fumi | <3   ";
const GAP = "     ";
const FULL_TEXT = TEXT + GAP;

const SPEED = 220;       // normal scrolling speed
const DELAY_SPEED = 1000; // pause when loop restarts
const WINDOW_SIZE = 10;

export default function Title() {
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const tick = () => {
      const i = indexRef.current;

      const loop = FULL_TEXT.repeat(3);
      const visible = loop.slice(i, i + WINDOW_SIZE);

      document.title = visible;

      const isLoopEnd = i === FULL_TEXT.length - 1;

      indexRef.current = (i + 1) % FULL_TEXT.length;

      // 👇 use different delay at loop boundary
      const nextDelay = isLoopEnd ? DELAY_SPEED : SPEED;
      timeoutRef.current = setTimeout(tick, nextDelay);
    };

    tick();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      document.title = "Fumi";
    };
  }, []);

  return null;
}