"use client";

import { useEffect, useRef } from "react";

const PHRASES = ["Fumi"];
const FLASH_INTERVAL = 500;
const PAUSE_TIME = 1500;

export default function TypewriterTitle() {
  const phraseIndexRef = useRef(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const phrase = PHRASES[phraseIndexRef.current];

      isVisibleRef.current = !isVisibleRef.current;
      document.title = isVisibleRef.current ? phrase : "\u200B";

      if (!isVisibleRef.current) {
        timeoutId = setTimeout(tick, FLASH_INTERVAL);
      } else {
        timeoutId = setTimeout(tick, PAUSE_TIME);
      }
    };

    document.title = PHRASES[0];
    timeoutId = setTimeout(tick, FLASH_INTERVAL);

    return () => {
      clearTimeout(timeoutId);
      document.title = "Fumi";
    };
  }, []);

  return null;
}
