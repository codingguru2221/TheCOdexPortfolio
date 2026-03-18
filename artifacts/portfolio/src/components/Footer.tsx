import { motion } from "framer-motion";
import { FiYoutube, FiInstagram, FiLinkedin, FiGithub } from "react-icons/fi";

const socials = [
  { icon: FiYoutube, href: "https://www.youtube.com/@The_COdex-Official", label: "YouTube", color: "#ff0000" },
  { icon: FiInstagram, href: "https://www.instagram.com/the_codex_official_", label: "Instagram", color: "#e1306c" },
  { icon: FiLinkedin, href: "https://www.linkedin.com/in/veerendra-vishwakarma-041584393/", label: "LinkedIn", color: "#0077b5" },
  { icon: FiGithub, href: "https://github.com/codingguru2221", label: "GitHub", color: "#a855f7" },
];

export default function Footer() {
  return (
    <footer className="py-12 px-6 relative overflow-hidden">
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.3), rgba(168,85,247,0.3), transparent)",
        }}
      />

      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <img
            src="/images/codex.jpg"
            alt="The Codex logo"
            className="mb-4 h-20 w-20 rounded-2xl object-cover"
            style={{
              border: "1px solid rgba(0,245,255,0.25)",
              boxShadow: "0 0 24px rgba(0,245,255,0.15)",
            }}
          />
          <h3
            className="text-2xl font-black tracking-widest"
            style={{
              background: "linear-gradient(135deg, #00f5ff, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            The Codex
          </h3>
          <p className="text-xs mt-1 tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
            Veerendra Vishwakarma
          </p>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center gap-5"
        >
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              whileHover={{ scale: 1.2, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = social.color + "80";
                el.style.boxShadow = `0 0 15px ${social.color}40, 0 0 30px ${social.color}15`;
                el.style.background = `${social.color}15`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.boxShadow = "none";
                el.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <social.icon className="w-5 h-5" style={{ color: "rgba(255,255,255,0.6)" }} />
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div
          className="w-full h-[1px]"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-xs text-center"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          © 2025 Veerendra Vishwakarma (The Codex). Crafted with{" "}
          <span style={{ color: "#00f5ff" }}>passion</span> &{" "}
          <span style={{ color: "#a855f7" }}>code</span>.
        </motion.p>
      </div>
    </footer>
  );
}
