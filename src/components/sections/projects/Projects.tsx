"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { projects } from "@/data/projects";

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[number];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.08 * index, ease: [0.19, 1, 0.22, 1] }}
      className="h-full"
    >
      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
        <div className="portfolio-card group h-full">
          {/* App icon */}
          <div className="portfolio-logo">
            <Image src={project.logo} alt={`${project.title} logo`} width={56} height={56} className="rounded-2xl" />
          </div>

          {/* Category */}
          <span className="portfolio-category" style={{ color: project.accentColor }}>
            {project.category}
          </span>

          {/* Title */}
          <h3 className="portfolio-title">{project.title}</h3>

          {/* Description */}
          <p className="portfolio-desc">{project.description}</p>

          {/* Tags */}
          <div className="portfolio-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="portfolio-tag">
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="portfolio-cta-row">
            <span className="portfolio-cta" style={{ color: project.accentColor }}>
              Explore Project
              <svg
                className="portfolio-cta-arrow"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10" />
                <path d="M9 4l4 4-4 4" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SectionHeader({ isInView }: { isInView: boolean }) {
  return (
    <div className="flex flex-col items-center text-center mb-14 md:mb-16">
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        className="badge-premium-light mb-6"
      >
        <span className="w-[5px] h-[5px] rounded-full bg-[#169B62]" style={{ boxShadow: "0 0 6px 1px rgba(22,155,98,0.5)" }} />
        Featured Work
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.19, 1, 0.22, 1] }}
        className="text-[clamp(32px,4.2vw,56px)] leading-[1.08] tracking-[-0.025em] text-[#1C1C1C] font-semibold max-w-[700px]"
      >
        Real Products. Real Clients. <span className="text-[#169B62]">Real Impact.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.16, ease: [0.19, 1, 0.22, 1] }}
        className="mt-5 text-[15px] md:text-[16px] text-[#9E9E9E] max-w-[680px] leading-relaxed"
      >
        Explore a selection of products and platforms we've designed, engineered, and launched — from AI-powered applications and enterprise software to premium digital experiences that solve real business challenges.
      </motion.p>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F2EFE9] py-20 md:py-28"
      id="work"
      aria-label="Featured Work"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(22,155,98,0.04) 0%, transparent 70%)" }}
      />

      <div className="container-main relative z-[1]">
        <SectionHeader isInView={isInView} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1320px] mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="flex justify-center mt-12 md:mt-14"
        >
          <Link href="/work" className="btn-primary-light text-[14px]">
            View All Projects
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10" />
              <path d="M9 4l4 4-4 4" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}