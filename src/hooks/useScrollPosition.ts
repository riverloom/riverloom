"use client";

import { useState, useEffect } from "react";

interface ScrollPosition {
  scrollY: number;
  scrollProgress: number;
}

export function useScrollPosition(): ScrollPosition {
  const [scroll, setScroll] = useState<ScrollPosition>({ scrollY: 0, scrollProgress: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollY / docHeight : 0;
      setScroll({ scrollY, scrollProgress });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scroll;
}
