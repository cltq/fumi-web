"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  cursorChar?: string;
  cursorBlinkSpeed?: number;
}

export default function Typewriter({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 1500,
  cursorChar = "|",
  cursorBlinkSpeed = 530,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const phraseIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const getRandomDelay = useCallback((baseSpeed: number) => {
    return baseSpeed + Math.random() * baseSpeed * 0.5 - baseSpeed * 0.25;
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorInterval);
  }, [cursorBlinkSpeed]);

  useEffect(() => {
    const tick = () => {
      const currentPhrase = phrases[phraseIndexRef.current];
      const currentLength = charIndexRef.current;

      if (!isDeletingRef.current) {
        if (currentLength < currentPhrase.length) {
          charIndexRef.current++;
          const newText = currentPhrase.slice(0, charIndexRef.current);
          setDisplayedText(newText);
          document.title = newText;
          timeoutRef.current = setTimeout(tick, getRandomDelay(typingSpeed));
        } else {
          isDeletingRef.current = true;
          timeoutRef.current = setTimeout(tick, pauseDuration);
        }
      } else {
        if (currentLength > 0) {
          charIndexRef.current--;
          const newText = currentPhrase.slice(0, charIndexRef.current);
          setDisplayedText(newText);
          document.title = newText;
          timeoutRef.current = setTimeout(tick, getRandomDelay(deletingSpeed));
        } else {
          isDeletingRef.current = false;
          phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
          timeoutRef.current = setTimeout(tick, 300);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      document.title = "";
    };
  }, [phrases, typingSpeed, deletingSpeed, pauseDuration, getRandomDelay]);

  return (
    <span className="inline-block">
      <span>{displayedText}</span>
      <span
        className="inline-block w-[2px] h-[1em] bg-white ml-[2px] align-middle transition-opacity duration-100"
        style={{ opacity: showCursor ? 1 : 0 }}
      >
        {cursorChar === "|" || cursorChar === "_" ? "" : cursorChar}
      </span>
    </span>
  );
}
