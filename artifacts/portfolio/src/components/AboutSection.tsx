import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const interests = [
  { icon: "🤖", label: "Artificial Intelligence", color: "#00f5ff" },
  { icon: "🔐", label: "Cybersecurity", color: "#a855f7" },
  { icon: "⚡", label: "Full Stack Dev", color: "#3b82f6" },
  { icon: "🌱", label: "Spring Boot", color: "#22c55e" },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #00f5ff, transparent)" }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#00f5ff" }}>
            Get to Know Me
          </p>
          <h2
            className="text-4xl md:text-5xl font-black section-title"
            style={{ color: "white", fontFamily: "'Orbitron', sans-serif" }}
          >
            About Me
          </h2>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
          {/* Flip Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flip-card h-80 cursor-pointer"
          >
            <div className="flip-card-inner relative w-full h-full">
              {/* Front */}
              <div
                className="flip-card-front absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-4 p-6"
                style={{
                  background: "linear-gradient(135deg, rgba(0,245,255,0.08), rgba(168,85,247,0.08))",
                  border: "1px solid rgba(0,245,255,0.3)",
                  boxShadow: "0 0 30px rgba(0,245,255,0.1)",
                }}
              >
                {/* Avatar */}
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(168,85,247,0.2))",
                    border: "2px solid rgba(0,245,255,0.5)",
                    color: "#00f5ff",
                    boxShadow: "0 0 20px rgba(0,245,255,0.3)",
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  VV
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-1">Veerendra Vishwakarma</h3>
                  <p className="text-sm" style={{ color: "#00f5ff" }}>The Codex</p>
                </div>
                <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Hover to reveal more →
                </p>
              </div>

              {/* Back */}
              <div
                className="flip-card-back absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-4 p-8 text-center"
                style={{
                  background: "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(0,245,255,0.08))",
                  border: "1px solid rgba(168,85,247,0.4)",
                  boxShadow: "0 0 30px rgba(168,85,247,0.15)",
                }}
              >
                <div className="text-3xl mb-2">👨‍💻</div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                  I'm a <span style={{ color: "#00f5ff" }}>3rd Year B.Tech Student</span> passionate about
                  building the future with AI and Cybersecurity. Currently mastering{" "}
                  <span style={{ color: "#a855f7" }}>Spring Boot</span> and exploring the intersection of
                  intelligence and security. Every line of code is a step toward innovation.
                </p>
                <div
                  className="px-4 py-1.5 rounded-full text-xs tracking-wider"
                  style={{
                    background: "rgba(0,245,255,0.1)",
                    border: "1px solid rgba(0,245,255,0.3)",
                    color: "#00f5ff",
                  }}
                >
                  B.Tech Computer Science
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-3 gradient-text-cyan">
                Engineering the Future
              </h3>
              <p className="text-sm leading-7" style={{ color: "rgba(255,255,255,0.6)" }}>
                A passionate developer at the crossroads of Artificial Intelligence and Cybersecurity.
                I build secure, intelligent systems that solve real-world problems. With a hacker mindset
                and a builder's heart, I turn complex ideas into elegant solutions.
              </p>
            </div>

            {/* Interest cards */}
            <div className="grid grid-cols-2 gap-3">
              {interests.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="p-3 rounded-xl flex items-center gap-3 transition-all duration-300 cursor-default"
                  style={{
                    background: `rgba(${item.color === "#00f5ff" ? "0,245,255" : item.color === "#a855f7" ? "168,85,247" : item.color === "#3b82f6" ? "59,130,246" : "34,197,94"},0.08)`,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              {[
                { value: "3+", label: "Years Coding" },
                { value: "4+", label: "Hackathons" },
                { value: "3+", label: "Projects" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-2xl font-black"
                    style={{ color: "#00f5ff", textShadow: "0 0 10px rgba(0,245,255,0.5)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
