"use client";

import { useRef, useEffect, useCallback } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/* ─── Types ─── */
interface HubNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
  label: string;
  glow: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  speed: number;
}

/* ─── Hub definitions ─── */
const HUBS: { label: string; color: string; radius: number; glow: number }[] = [
  { label: "AI/ML", color: "#6366F1", radius: 7, glow: 12 },
  { label: "Mobile", color: "#54C5F8", radius: 6, glow: 10 },
  { label: "Web", color: "#3178C6", radius: 6, glow: 10 },
  { label: "Enterprise", color: "#FF9900", radius: 6.5, glow: 11 },
  { label: "Cloud", color: "#2496ED", radius: 5.5, glow: 9 },
  { label: "Security", color: "#0EA5E9", radius: 5.5, glow: 9 },
  { label: "Games", color: "#EC4899", radius: 5, glow: 8 },
  { label: "Education", color: "#22C55E", radius: 5.5, glow: 9 },
  { label: "AI", color: "#8B5CF6", radius: 6.5, glow: 11 },
  { label: "Design", color: "#F59E0B", radius: 5, glow: 8 },
];

/* ─── Connected Product Ecosystem ─── */
export default function InteractiveEngineeringCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });
  const animationRef = useRef<number>(0);
  const hubsRef = useRef<HubNode[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  const init = useCallback((w: number, h: number) => {
    // Create hub nodes
    const hubs: HubNode[] = HUBS.map((hub, i) => ({
      x: (0.08 + Math.sin(i * 1.7) * 0.35 + 0.5) * w,
      y: (0.1 + Math.cos(i * 2.3) * 0.3 + 0.5) * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      radius: hub.radius,
      alpha: 0.3 + Math.random() * 0.3,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.005 + Math.random() * 0.01,
      color: hub.color,
      label: hub.label,
      glow: hub.glow,
    }));
    hubsRef.current = hubs;

    // Create ambient particles
    const particles: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: 0.8 + Math.random() * 1.5,
        alpha: 0.05 + Math.random() * 0.12,
        speed: 0.1 + Math.random() * 0.2,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let mouseInfluenceX = 0.5;
    let mouseInfluenceY = 0.5;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;
      init(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    // Subscribe to mouse springs
    const unsubX = springX.on("change", (v) => { mouseInfluenceX = v; });
    const unsubY = springY.on("change", (v) => { mouseInfluenceY = v; });

    const draw = (timestamp: number) => {
      timeRef.current = timestamp;
      ctx!.clearRect(0, 0, w, h);

      const hubs = hubsRef.current;
      const particles = particlesRef.current;

      // Mouse influence offset for flow field
      const mOffX = (mouseInfluenceX - 0.5) * 60;
      const mOffY = (mouseInfluenceY - 0.5) * 60;

      // Update and draw particles
      for (const p of particles) {
        // Drift toward mouse
        const dx = (mouseInfluenceX * w - p.x) * 0.00002;
        const dy = (mouseInfluenceY * h - p.y) * 0.00002;
        p.vx += dx;
        p.vy += dy;
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;
        // Damping
        p.vx *= 0.995;
        p.vy *= 0.995;
        // Clamp
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > p.speed) {
          p.vx = (p.vx / speed) * p.speed;
          p.vy = (p.vy / speed) * p.speed;
        }
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Draw
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(22, 155, 98, ${p.alpha})`;
        ctx!.fill();
      }

      // Update and draw hub nodes
      for (const hub of hubs) {
        // Gentle drift with mouse influence
        hub.pulsePhase += hub.pulseSpeed;
        const pulse = 0.7 + 0.3 * Math.sin(hub.pulsePhase);

        hub.vx += (Math.random() - 0.5) * 0.01;
        hub.vy += (Math.random() - 0.5) * 0.01;
        hub.vx += mOffX * 0.00001;
        hub.vy += mOffY * 0.00001;
        hub.vx *= 0.99;
        hub.vy *= 0.99;
        hub.x += hub.vx;
        hub.y += hub.vy;

        // Keep in bounds
        const margin = 40;
        if (hub.x < margin) hub.vx += 0.05;
        if (hub.x > w - margin) hub.vx -= 0.05;
        if (hub.y < margin) hub.vy += 0.05;
        if (hub.y > h - margin) hub.vy -= 0.05;

        // Draw glow
        const glowRadius = hub.radius * hub.glow * pulse;
        const gradient = ctx!.createRadialGradient(
          hub.x, hub.y, 0,
          hub.x, hub.y, glowRadius
        );
        gradient.addColorStop(0, hub.color + "20");
        gradient.addColorStop(0.5, hub.color + "10");
        gradient.addColorStop(1, hub.color + "00");
        ctx!.beginPath();
        ctx!.arc(hub.x, hub.y, glowRadius, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();

        // Draw dot
        ctx!.beginPath();
        ctx!.arc(hub.x, hub.y, hub.radius * pulse, 0, Math.PI * 2);
        ctx!.fillStyle = hub.color + "40";
        ctx!.fill();

        // Draw inner bright core
        ctx!.beginPath();
        ctx!.arc(hub.x, hub.y, hub.radius * 0.5, 0, Math.PI * 2);
        ctx!.fillStyle = hub.color + "80";
        ctx!.fill();
      }

      // Draw connection lines between hubs
      ctx!.lineWidth = 0.4;
      for (let i = 0; i < hubs.length; i++) {
        for (let j = i + 1; j < hubs.length; j++) {
          const dx = hubs[i].x - hubs[j].x;
          const dy = hubs[i].y - hubs[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = Math.min(w, h) * 0.25;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.08;
            const gradient = ctx!.createLinearGradient(
              hubs[i].x, hubs[i].y,
              hubs[j].x, hubs[j].y
            );
            gradient.addColorStop(0, hubs[i].color + "00");
            gradient.addColorStop(0.3, hubs[i].color + "10");
            gradient.addColorStop(0.5, "rgba(22, 155, 98, 0.06)");
            gradient.addColorStop(0.7, hubs[j].color + "10");
            gradient.addColorStop(1, hubs[j].color + "00");
            ctx!.beginPath();
            ctx!.moveTo(hubs[i].x, hubs[i].y);
            ctx!.lineTo(hubs[j].x, hubs[j].y);
            ctx!.strokeStyle = gradient;
            ctx!.stroke();

            // Animated energy pulse along connection
            const pulsePhase = (timestamp * 0.001 * 0.3 + i + j) % 1;
            if (pulsePhase < 0.1) {
              const t = pulsePhase / 0.1;
              const px = hubs[i].x + (hubs[j].x - hubs[i].x) * t;
              const py = hubs[i].y + (hubs[j].y - hubs[i].y) * t;
              ctx!.beginPath();
              ctx!.arc(px, py, 2, 0, Math.PI * 2);
              ctx!.fillStyle = `rgba(22, 155, 98, ${0.3 * (1 - t)})`;
              ctx!.fill();
            }
          }
        }
      }

      // Central glow
      const cx = w * 0.5;
      const cy = h * 0.5;
      const centralGlow = ctx!.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.35);
      centralGlow.addColorStop(0, "rgba(22, 155, 98, 0.04)");
      centralGlow.addColorStop(0.5, "rgba(22, 155, 98, 0.02)");
      centralGlow.addColorStop(1, "rgba(22, 155, 98, 0)");
      ctx!.beginPath();
      ctx!.arc(cx, cy, Math.min(w, h) * 0.35, 0, Math.PI * 2);
      ctx!.fillStyle = centralGlow;
      ctx!.fill();

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      unsubX();
      unsubY();
    };
  }, [springX, springY, init]);

  /* ─── Track mouse position ─── */
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}
