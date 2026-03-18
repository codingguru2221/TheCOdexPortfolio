import { motion } from "framer-motion";
import { Link } from "wouter";
import ProjectCard from "@/components/ProjectCard";
import { useGithubProjects } from "@/hooks/use-github-projects";

export default function ProjectsSection() {
  const { projects, loading, error } = useGithubProjects();
  const latestProjects = projects.slice(0, 3);

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-24">
      <div
        className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full pointer-events-none opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm uppercase tracking-widest" style={{ color: "#3b82f6" }}>
            What I've Built
          </p>
          <h2
            className="section-title text-4xl font-black md:text-5xl"
            style={{ color: "white", fontFamily: "'Orbitron', sans-serif" }}
          >
            Projects
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm md:text-base" style={{ color: "rgba(255,255,255,0.6)" }}>
            Latest repositories directly GitHub se sync ho rahe hain. Naya public repo banega to ye section automatically update ho jayega.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-[380px] rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              />
            ))}
          </div>
        ) : error ? (
          <div
            className="rounded-3xl px-6 py-10 text-center"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(239,68,68,0.25)",
            }}
          >
            <p className="text-lg font-semibold text-white">GitHub sync unavailable</p>
            <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              {error}
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-3">
              {latestProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-12 flex justify-center"
            >
              <Link href="/projects">
                <a
                  className="inline-flex items-center rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(168,85,247,0.15))",
                    border: "1px solid rgba(0,245,255,0.35)",
                    color: "#00f5ff",
                    boxShadow: "0 0 24px rgba(0,245,255,0.15)",
                  }}
                >
                  Explore Projects
                </a>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
