"use client";

import { useEffect, useRef } from "react";

const PHRASES = ["Fumi"];
const TYPING_SPEED = 100;
const DELETING_SPEED = 60;
const PAUSE_TIME = 1500;

export default function TypewriterTitle() {
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const phraseIndexRef = useRef(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const phrase = PHRASES[phraseIndexRef.current];

      if (!isDeletingRef.current) {
        charIndexRef.current++;
        const newText = phrase.slice(0, charIndexRef.current);
        document.title = newText || "\u200B";

        if (charIndexRef.current >= phrase.length) {
          isDeletingRef.current = true;
          timeoutId = setTimeout(tick, PAUSE_TIME);
          return;
        }
        timeoutId = setTimeout(tick, TYPING_SPEED + Math.random() * 50);
      } else {
        charIndexRef.current--;
        const newText = phrase.slice(0, charIndexRef.current);
        document.title = newText || "\u200B";

        if (charIndexRef.current <= 0) {
          isDeletingRef.current = false;
          phraseIndexRef.current = (phraseIndexRef.current + 1) % PHRASES.length;
          timeoutId = setTimeout(tick, 300);
          return;
        }
        timeoutId = setTimeout(tick, DELETING_SPEED + Math.random() * 30);
      }
    };

    timeoutId = setTimeout(tick, 500);

    return () => {
      clearTimeout(timeoutId);
      document.title = "Fumi";
    };
  }, []);

  return null;
}
