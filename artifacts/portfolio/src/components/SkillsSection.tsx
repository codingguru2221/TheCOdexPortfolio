import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    icon: "{ }",
    color: "#00f5ff",
    skills: [
      { name: "Java", level: 85 },
      { name: "Python", level: 80 },
      { name: "C", level: 75 },
      { name: "C++", level: 70 },
    ],
  },
  {
    title: "Frameworks",
    icon: "⚡",
    color: "#a855f7",
    skills: [
      { name: "React", level: 80 },
      { name: "Spring Boot", level: 60 },
    ],
  },
  {
    title: "Tools",
    icon: "🔧",
    color: "#3b82f6",
    skills: [
      { name: "Linux", level: 75 },
      { name: "Git", level: 85 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
          {name}
        </span>
        <span className="text-xs font-mono" style={{ color }}>
          {level}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 10px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full pointer-events-none opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#a855f7" }}>
            What I Know
          </p>
          <h2
            className="text-4xl md:text-5xl font-black section-title"
            style={{ color: "white", fontFamily: "'Orbitron', sans-serif" }}
          >
            Skills
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: ci * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-2xl space-y-5 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${cat.color}25`,
                boxShadow: `0 0 20px ${cat.color}10`,
              }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                  style={{
                    background: `${cat.color}15`,
                    border: `1px solid ${cat.color}40`,
                    color: cat.color,
                  }}
                >
                  {cat.icon}
                </div>
                <h3
                  className="text-lg font-bold tracking-wider"
                  style={{ color: cat.color, textShadow: `0 0 10px ${cat.color}60` }}
                >
                  {cat.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={cat.color}
                    delay={ci * 0.2 + si * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech tags cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {["Algorithms", "Data Structures", "OOP", "REST APIs", "SQL", "AES Encryption", "TensorFlow", "FastAPI", "Networking", "Bash Scripting"].map((tag, i) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-4 py-1.5 rounded-full text-xs cursor-default transition-all duration-300"
              style={{
                background: `rgba(${i % 3 === 0 ? "0,245,255" : i % 3 === 1 ? "168,85,247" : "59,130,246"},0.08)`,
                border: `1px solid rgba(${i % 3 === 0 ? "0,245,255" : i % 3 === 1 ? "168,85,247" : "59,130,246"},0.3)`,
                color: i % 3 === 0 ? "#00f5ff" : i % 3 === 1 ? "#a855f7" : "#3b82f6",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
