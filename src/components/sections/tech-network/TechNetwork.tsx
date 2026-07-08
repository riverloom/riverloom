"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { techNodes } from "@/data/tech";

const catColors: Record<string, string> = {
  Frontend: "bg-[#169B62]/10 text-[#169B62]",
  Backend: "bg-[#169B62]/10 text-[#169B62]",
  AI: "bg-[#169B62]/10 text-[#169B62]",
  Language: "bg-[#169B62]/10 text-[#169B62]",
  Infrastructure: "bg-[#169B62]/10 text-[#169B62]",
  Cloud: "bg-[#169B62]/10 text-[#169B62]",
  Systems: "bg-[#169B62]/10 text-[#169B62]",
  Data: "bg-[#169B62]/10 text-[#169B62]",
};

const nodeSizes = {
  sm: "w-14 h-14 text-[9px]",
  md: "w-18 h-18 text-[11px]",
  lg: "w-22 h-22 text-xs",
};

export default function TechNetwork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Canvas animation for connection lines
  useEffect(() => {
    if (!mounted || !isInView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      if (!canvas || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Draw connections
      techNodes.forEach((a) => {
        a.connections.forEach((bId) => {
          const b = techNodes.find((n) => n.id === bId);
          if (!b) return;

          const ax = (a.x / 100) * w;
          const ay = (a.y / 100) * h;
          const bx = (b.x / 100) * w;
          const by = (b.y / 100) * h;

          const isHighlighted =
            hoveredNode === a.id || hoveredNode === b.id;

          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.strokeStyle = isHighlighted
            ? "rgba(22, 155, 98, 0.2)"
            : "rgba(22, 155, 98, 0.06)";
          ctx.lineWidth = isHighlighted ? 1.5 : 0.5;
          ctx.stroke();

          // Animated dot along connection
          const time = Date.now() / 3000;
          const t = (Math.sin(time + a.id.charCodeAt(0)) + 1) / 2;
          const dx = ax + (bx - ax) * t;
          const dy = ay + (by - ay) * t;

          ctx.beginPath();
          ctx.arc(dx, dy, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(22, 155, 98, 0.3)";
          ctx.fill();
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [mounted, isInView, hoveredNode]);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding-lg overflow-hidden bg-[#F2F8F4]"
      id="tech"
      onMouseMove={(e) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (rect) {
          setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
          });
        }
      }}
    >
      {/* Background glow following mouse */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(22,155,98,0.04) 0%, transparent 60%)",
          transform: "translate(-50%, -50%)",
        }}
        animate={{ left: `${mousePos.x}%`, top: `${mousePos.y}%` }}
        transition={{ type: "spring", stiffness: 30, damping: 25 }}
      />

      {/* Canvas for connection lines */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      <div className="container-main relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="badge-premium text-[11px] tracking-[0.15em] uppercase font-medium inline-flex mb-5"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-[#169B62] mr-2" />
            Technology Ecosystem
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="text-[clamp(32px,5vw,60px)] font-semibold tracking-tight text-[#1C1C1C] mt-3"
          >
            Our Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[15px] leading-relaxed text-[#6B6B6B] max-w-md mx-auto mt-4"
          >
            Every technology we use is selected for its ability to ship production-grade software at scale.
          </motion.p>
        </div>

        {/* Network visualization */}
        <div className="relative max-w-5xl mx-auto aspect-[16/9]">
          {/* Grid background */}
          <div className="absolute inset-0 opacity-[0.02]">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <pattern id="tech-grid-light" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1C1C1C" strokeWidth="0.5" />
              </pattern>
              <rect width="100" height="100" fill="url(#tech-grid-light)" />
            </svg>
          </div>

          {/* Nodes */}
          {techNodes.map((node) => {
            const isHovered = hoveredNode === node.id;
            return (
              <motion.button
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: parseInt(node.id.length.toString()) * 0.03,
                  duration: 0.5,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2",
                  "flex flex-col items-center justify-center",
                  nodeSizes[node.size],
                  "rounded-2xl border backdrop-blur-sm cursor-pointer",
                  "transition-all duration-300",
                  isHovered
                    ? "border-[#169B62]/30 bg-white shadow-lg shadow-[#169B62]/10 scale-110 z-20"
                    : "border-[#E7E2D8] bg-white/80 hover:border-[#169B62]/20 hover:bg-white hover:shadow-md"
                )}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className={cn(
                  "w-2 h-2 rounded-full mb-1.5",
                  catColors[node.category] || "bg-[#169B62]/20"
                )} />
                <span className={cn(
                  "font-semibold text-[#1C1C1C] leading-tight text-center",
                  node.size === "sm" ? "text-[9px]" : node.size === "md" ? "text-[10px]" : "text-[11px]"
                )}>
                  {node.name}
                </span>

                {/* Tooltip on hover */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg bg-white border border-[#E7E2D8] text-[10px] font-medium text-[#6B6B6B] shadow-lg"
                  >
                    {node.category}
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
          {Object.entries(catColors).map(([cat]) => (
            <div key={cat} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#169B62]/20" />
              <span className="text-[10px] uppercase tracking-wider text-[#9E9E9E] font-medium">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
