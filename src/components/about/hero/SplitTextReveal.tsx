"use client";

import { motion } from "framer-motion";

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  wordByWord?: boolean;
}

export default function SplitTextReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.035,
  as: Tag = "h1",
  wordByWord = false,
}: SplitTextRevealProps) {
  if (wordByWord) {
    const words = text.split(" ");
    return (
      <motion.span
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 1 },
          visible: {
            opacity: 1,
            transition: { delay, staggerChildren: staggerDelay },
          },
        }}
        className={className}
        aria-label={text}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { y: 50, opacity: 0, rotateX: -60 },
              visible: {
                y: 0,
                opacity: 1,
                rotateX: 0,
                transition: {
                  type: "spring",
                  damping: 14,
                  stiffness: 120,
                  mass: 0.8,
                },
              },
            }}
            className="inline-block"
            style={{ whiteSpace: "pre" }}
          >
            {word}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  const letters = text.split("");

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { delay, staggerChildren: staggerDelay },
        },
      }}
      className={className}
      aria-label={text}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { y: 40, opacity: 0, rotateX: -45 },
            visible: {
              y: 0,
              opacity: 1,
              rotateX: 0,
              transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
              },
            },
          }}
          className="inline-block"
          style={{ whiteSpace: letter === " " ? "pre" : undefined }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
