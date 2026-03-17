import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const projects = [
  {
    id: 1,
    title: "CryptoShield",
    subtitle: "Pendrive Password Manager",
    description:
      "A portable, secure password manager that lives on your pendrive. Uses AES-256 encryption to protect your credentials — access anywhere, no cloud dependency.",
    tech: ["Python", "Cryptography", "Tkinter", "SQLite"],
    github: "#",
    gradient: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(59,130,246,0.1))",
    border: "rgba(0,245,255,0.3)",
    glow: "rgba(0,245,255,0.15)",
    icon: "🛡️",
    accentColor: "#00f5ff",
  },
  {
    id: 2,
    title: "AI Study Platform",
    subtitle: "Adaptive Learning System",
    description:
      "An AI-powered personalized learning platform that adapts to your learning style. Features smart quizzes, progress tracking, and intelligent content recommendations.",
    tech: ["React", "Python", "TensorFlow", "FastAPI", "PostgreSQL"],
    github: "#",
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.1))",
    border: "rgba(168,85,247,0.3)",
    glow: "rgba(168,85,247,0.15)",
    icon: "🧠",
    accentColor: "#a855f7",
  },
  {
    id: 3,
    title: "College Event Hub",
    subtitle: "Campus Events Platform",
    description:
      "A centralized platform that brings the entire campus together — events, registrations, announcements, and club activities all in one elegant interface.",
    tech: ["React", "Spring Boot", "PostgreSQL", "JWT"],
    github: "#",
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(34,197,94,0.1))",
    border: "rgba(59,130,246,0.3)",
    glow: "rgba(59,130,246,0.15)",
    icon: "🎓",
    accentColor: "#3b82f6",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
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
      transition={{ duration: 0.7, delay: index * 0.15 }}
      viewport={{ once: true }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
        transition: hovered ? "transform 0.05s ease-out" : "transform 0.4s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl p-6 flex flex-col h-full overflow-hidden cursor-default"
    >
      {/* Card background */}
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

      {/* Scan line on hover */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none opacity-5 rounded-2xl overflow-hidden"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${project.accentColor} 3px, ${project.accentColor} 4px)`,
          }}
        />
      )}

      {/* Inner content (lifted with preserve-3d) */}
      <div className="relative" style={{ transform: "translateZ(30px)" }}>
        {/* Icon + number */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{
              background: `${project.accentColor}15`,
              border: `1px solid ${project.accentColor}40`,
            }}
          >
            {project.icon}
          </div>
          <span
            className="text-6xl font-black opacity-10 leading-none"
            style={{ color: project.accentColor, fontFamily: "'Orbitron', sans-serif" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-xl font-black mb-1"
          style={{
            color: "white",
            textShadow: hovered ? `0 0 15px ${project.accentColor}60` : "none",
          }}
        >
          {project.title}
        </h3>
        <p className="text-xs tracking-wider mb-3" style={{ color: project.accentColor }}>
          {project.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm leading-6 mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md text-xs font-medium"
              style={{
                background: `${project.accentColor}10`,
                border: `1px solid ${project.accentColor}30`,
                color: project.accentColor,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              background: `${project.accentColor}15`,
              border: `1px solid ${project.accentColor}40`,
              color: project.accentColor,
              boxShadow: `0 0 10px ${project.accentColor}20`,
            }}
          >
            <FiGithub className="w-4 h-4" />
            GitHub
          </a>
          <a
            href={project.github}
            className="flex items-center gap-1 text-xs transition-all duration-300 hover:gap-2"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <FiExternalLink className="w-3 h-3" />
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden">
      {/* Background glows */}
      <div
        className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full pointer-events-none opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#3b82f6" }}>
            What I've Built
          </p>
          <h2
            className="text-4xl md:text-5xl font-black section-title"
            style={{ color: "white", fontFamily: "'Orbitron', sans-serif" }}
          >
            Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
