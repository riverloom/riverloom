"use client";

import { useState, useEffect, useCallback } from "react";

const WORDS = [
  "AI Solutions.",
  "Custom Software.",
  "Enterprise Websites.",
  "Modern SaaS Platforms.",
  "CRM Systems.",
  "ERP Solutions.",
  "Cloud Infrastructure.",
  "Business Automation.",
  "API Integrations.",
  "Mobile Applications.",
  "SEO & Digital Growth.",
  "AI Agents.",
];

const TYPING_SPEED = 50;
const DELETING_SPEED = 28;
const PAUSE_AFTER_TYPING = 2000;
const PAUSE_AFTER_DELETING = 400;

export default function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");

  const tick = useCallback(() => {
    const currentWord = WORDS[wordIndex];

    if (!isDeleting) {
      setText(currentWord.slice(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);

      if (charIndex + 1 === currentWord.length) {
        setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPING);
        return;
      }
    } else {
      setText(currentWord.slice(0, charIndex - 1));
      setCharIndex((prev) => prev - 1);

      if (charIndex - 1 === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        return;
      }
    }
  }, [wordIndex, charIndex, isDeleting]);

  useEffect(() => {
    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const timeout = setTimeout(tick, speed);
    return () => clearTimeout(timeout);
  }, [tick, isDeleting, charIndex, wordIndex]);

  return (
    <span className="inline-flex items-center">
      <span>{text}</span>
      <span
        className="inline-block w-[2px] h-[1.1em] ml-[1px] -translate-y-[1px]"
        style={{
          background: "#16C784",
          boxShadow: "0 0 6px rgba(22,199,132,0.5)",
          animation: "blink 1s step-end infinite",
        }}
      />
    </span>
  );
}
