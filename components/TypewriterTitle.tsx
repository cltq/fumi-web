"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  phrases?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  cursorBlinkSpeed?: number;
}

export default function Typewriter({
  phrases = ["Fumi"],
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 1500,
  cursorBlinkSpeed = 530,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const phraseIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorInterval);
  }, [cursorBlinkSpeed]);

  useEffect(() => {
    const randomBetween = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const updateTitle = (text: string) => {
      setDisplayedText(text);
      document.title = text || "\u200B";
    };

    const tick = () => {
      const currentPhrase = phrases[phraseIndexRef.current];
      const currentCharIndex = charIndexRef.current;

      if (!isDeletingRef.current) {
        if (currentCharIndex < currentPhrase.length) {
          charIndexRef.current = currentCharIndex + 1;
          const newText = currentPhrase.slice(0, charIndexRef.current);
          updateTitle(newText);
          timeoutIdRef.current = setTimeout(tick, randomBetween(typingSpeed * 0.5, typingSpeed * 1.5));
        } else {
          isDeletingRef.current = true;
          timeoutIdRef.current = setTimeout(tick, pauseDuration);
        }
      } else {
        if (currentCharIndex > 0) {
          charIndexRef.current = currentCharIndex - 1;
          const newText = currentPhrase.slice(0, charIndexRef.current);
          updateTitle(newText);
          timeoutIdRef.current = setTimeout(tick, randomBetween(deletingSpeed * 0.5, deletingSpeed * 1.5));
        } else {
          isDeletingRef.current = false;
          phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
          timeoutIdRef.current = setTimeout(tick, 300);
        }
      }
    };

    timeoutIdRef.current = setTimeout(tick, 500);

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      document.title = "Fumi";
    };
  }, [phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span>
      {displayedText}
      <span
        className="animate-pulse"
        style={{ opacity: showCursor ? 1 : 0 }}
      >
        |
      </span>
    </span>
  );
}
