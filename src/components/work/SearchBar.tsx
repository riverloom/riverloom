"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, TrendingUp, Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const suggestions = [
  { icon: TrendingUp, text: "Trending: MalwareX", color: "#E14B3D" },
  { icon: TrendingUp, text: "Trending: Wordique", color: "#169B62" },
  { icon: Sparkles, text: "New: Universe", color: "#2E8FE0" },
];

export default function SearchBar({ value, onChange, placeholder = "Search products..." }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      <motion.div
        className="relative"
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="relative flex items-center rounded-2xl border bg-white/80 backdrop-blur-md transition-all duration-300 overflow-hidden"
          style={{
            borderColor: isFocused ? "#169B62" : "#EBE8E0",
            boxShadow: isFocused
              ? "0 8px 32px rgba(22,155,98,0.12), 0 0 0 3px rgba(22,155,98,0.08)"
              : "0 1px 3px rgba(0,0,0,0.03)",
          }}
        >
          <div className="pl-3.5 pr-2 flex items-center">
            <Search className="w-4 h-4" style={{ color: isFocused ? "#169B62" : "#9E9E9E" }} />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            className="flex-1 bg-transparent py-3 pr-3 text-sm outline-none text-[#1C1C1C] placeholder:text-[#9E9E9E] font-medium"
          />

          <AnimatePresence>
            {value && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => { onChange(""); inputRef.current?.focus(); }}
                className="mr-2 w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#F4F1EC] transition-colors"
              >
                <X className="w-3.5 h-3.5 text-[#9E9E9E]" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {isFocused && !value && (
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="absolute top-full left-0 right-0 mt-2 p-3 rounded-2xl bg-white border border-[#EBE8E0] shadow-xl z-20"
            style={{ transformOrigin: "top center" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9E9E9E] mb-2 px-2">
              Suggestions
            </p>
            <div className="space-y-1">
              {suggestions.map((s) => (
                <button
                  key={s.text}
                  onClick={() => {
                    const searchTerm = s.text.replace(/^(Trending|New):\s*/, "");
                    onChange(searchTerm);
                    setIsFocused(false);
                  }}
                  className="flex items-center gap-2.5 w-full px-2 py-2 rounded-xl hover:bg-[#F4F1EC] transition-colors text-left group"
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${s.color}0A` }}>
                    <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                  </div>
                  <span className="text-sm text-[#6B6B6B] group-hover:text-[#1C1C1C] transition-colors">
                    {s.text}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
