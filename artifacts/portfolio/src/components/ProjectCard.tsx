import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGitBranch, FiGithub, FiStar } from "react-icons/fi";
import type { PortfolioProject } from "@/hooks/use-github-projects";

type ProjectCardProps = {
  project: PortfolioProject;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 15, y: x * -15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      viewport={{ once: true }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
        transition: hovered ? "transform 0.05s ease-out" : "transform 0.4s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-full cursor-default flex-col overflow-hidden rounded-2xl p-6"
    >
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500"
        style={{
          background: project.gradient,
          border: `1px solid ${hovered ? project.border : project.border + "80"}`,
          boxShadow: hovered
            ? `0 20px 60px ${project.glow}, 0 0 30px ${project.glow}, inset 0 0 20px ${project.glow}`
            : `0 4px 20px ${project.glow}40`,
        }}
      />

      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${project.accentColor} 3px, ${project.accentColor} 4px)`,
          }}
        />
      )}

      <div className="relative flex h-full flex-col" style={{ transform: "translateZ(30px)" }}>
        <div className="mb-4 flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-black"
            style={{
              background: `${project.accentColor}15`,
              border: `1px solid ${project.accentColor}40`,
              color: project.accentColor,
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            {project.icon}
          </div>
          <span
            className="text-6xl font-black leading-none opacity-10"
            style={{ color: project.accentColor, fontFamily: "'Orbitron', sans-serif" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          className="mb-1 text-xl font-black"
          style={{
            color: "white",
            textShadow: hovered ? `0 0 15px ${project.accentColor}60` : "none",
          }}
        >
          {project.title}
        </h3>
        <p className="mb-3 text-xs tracking-wider" style={{ color: project.accentColor }}>
          {project.subtitle}
        </p>

        <p className="mb-5 text-sm leading-6" style={{ color: "rgba(255,255,255,0.6)" }}>
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-md px-2.5 py-1 text-xs font-medium"
              style={{
                background: `${project.accentColor}10`,
                border: `1px solid ${project.accentColor}30`,
                color: project.accentColor,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mb-5 flex items-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
          <span className="flex items-center gap-1.5">
            <FiStar className="h-3.5 w-3.5" />
            {project.stars}
          </span>
          <span className="flex items-center gap-1.5">
            <FiGitBranch className="h-3.5 w-3.5" />
            {project.forks}
          </span>
          <span>
            Updated{" "}
            {new Date(project.updatedAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="mt-auto flex items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              background: `${project.accentColor}15`,
              border: `1px solid ${project.accentColor}40`,
              color: project.accentColor,
              boxShadow: `0 0 10px ${project.accentColor}20`,
            }}
          >
            <FiGithub className="h-4 w-4" />
            GitHub
          </a>
          {project.liveDemo ? (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs transition-all duration-300 hover:gap-2"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <FiExternalLink className="h-3 w-3" />
              Live Demo
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
