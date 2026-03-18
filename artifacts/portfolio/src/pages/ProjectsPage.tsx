import { motion } from "framer-motion";
import { Link } from "wouter";
import { FiArrowLeft, FiGithub } from "react-icons/fi";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { useGithubProjects } from "@/hooks/use-github-projects";

export default function ProjectsPage() {
  const { projects, loading, error } = useGithubProjects();

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "hsl(222, 47%, 4%)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(0,245,255,0.12), transparent 30%), radial-gradient(circle at top right, rgba(168,85,247,0.12), transparent 35%)",
        }}
      />

      <div className="relative z-10 px-6 pt-8 pb-24">
        <div className="mx-auto max-w-6xl">
          <div
            className="mb-12 flex flex-col gap-6 rounded-3xl px-6 py-6 md:flex-row md:items-center md:justify-between"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(18px)",
            }}
          >
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.35em]" style={{ color: "#00f5ff" }}>
                Auto Synced
              </p>
              <h1
                className="text-4xl font-black md:text-5xl"
                style={{ color: "white", fontFamily: "'Orbitron', sans-serif" }}
              >
                All GitHub Projects
              </h1>
              <p className="mt-3 max-w-2xl text-sm md:text-base" style={{ color: "rgba(255,255,255,0.65)" }}>
                Ye page directly GitHub public repositories se data la raha hai. Naya public repo banate hi yahan automatically show ho jayega.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/">
                <a
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wider transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                  }}
                >
                  <FiArrowLeft className="h-4 w-4" />
                  Back Home
                </a>
              </Link>

              <a
                href="https://github.com/codingguru2221?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wider transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(168,85,247,0.15))",
                  border: "1px solid rgba(0,245,255,0.35)",
                  color: "#00f5ff",
                }}
              >
                <FiGithub className="h-4 w-4" />
                Open GitHub
              </a>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
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
              <div className="mb-8 flex items-center justify-between gap-4">
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Showing {projects.length} repositories from `codingguru2221`
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
