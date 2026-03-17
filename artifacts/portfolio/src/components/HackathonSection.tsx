import { motion } from "framer-motion";

const hackathons = [
  {
    title: "Navonmesh Hackathon",
    result: "Finalist",
    description: "Competed among top college teams, reaching the finals with an AI-based project solution.",
    icon: "🚀",
    color: "#00f5ff",
    year: "2024",
  },
  {
    title: "HackPrix",
    result: "Participant",
    description: "Participated in this competitive hackathon, building a full-stack solution within 24 hours.",
    icon: "💡",
    color: "#a855f7",
    year: "2024",
  },
  {
    title: "RNTU Tech Fest",
    result: "2nd Place 🥈",
    description: "Secured 2nd place in the technical competition at RNTU Tech Fest, showcasing innovative problem-solving skills.",
    icon: "🏆",
    color: "#f59e0b",
    year: "2023",
  },
  {
    title: "EcoCode Hackathon",
    result: "Participant",
    description: "Built an eco-friendly tech solution focusing on sustainable development and environmental impact.",
    icon: "🌱",
    color: "#22c55e",
    year: "2023",
  },
];

export default function HackathonSection() {
  return (
    <section id="hackathons" className="py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#f59e0b" }}>
            Battle Records
          </p>
          <h2
            className="text-4xl md:text-5xl font-black section-title"
            style={{ color: "white", fontFamily: "'Orbitron', sans-serif" }}
          >
            Hackathons
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden md:block"
            style={{
              background: "linear-gradient(to bottom, #00f5ff, #a855f7, #f59e0b, #22c55e)",
              boxShadow: "0 0 10px rgba(0,245,255,0.3)",
            }}
          />

          <div className="space-y-12">
            {hackathons.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Card */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="p-6 rounded-2xl transition-all duration-300"
                    style={{
                      background: `rgba(${item.color === "#00f5ff" ? "0,245,255" : item.color === "#a855f7" ? "168,85,247" : item.color === "#f59e0b" ? "245,158,11" : "34,197,94"},0.06)`,
                      border: `1px solid ${item.color}30`,
                      boxShadow: `0 4px 20px ${item.color}10`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 40px ${item.color}20, 0 0 20px ${item.color}10`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${item.color}60`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${item.color}10`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${item.color}30`;
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{
                          background: `${item.color}15`,
                          border: `1px solid ${item.color}40`,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap mb-1">
                          <h3 className="text-lg font-bold text-white">{item.title}</h3>
                          <span
                            className="text-xs px-3 py-1 rounded-full font-semibold"
                            style={{
                              background: `${item.color}15`,
                              border: `1px solid ${item.color}40`,
                              color: item.color,
                            }}
                          >
                            {item.result}
                          </span>
                        </div>
                        <p className="text-xs mb-2" style={{ color: item.color + "90" }}>
                          {item.year}
                        </p>
                        <p className="text-sm leading-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex items-center justify-center w-8 flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                    viewport={{ once: true }}
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: item.color,
                      boxShadow: `0 0 15px ${item.color}, 0 0 30px ${item.color}50`,
                    }}
                  />
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
