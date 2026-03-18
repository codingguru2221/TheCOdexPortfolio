import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActive(id.replace("#", ""));
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div
        className="max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.2)",
          backdropFilter: "blur(20px)",
          border: scrolled ? "1px solid rgba(0,245,255,0.2)" : "1px solid rgba(255,255,255,0.05)",
          boxShadow: scrolled ? "0 4px 30px rgba(0,245,255,0.1)" : "none",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("#home")}
          className="flex items-center"
          aria-label="The Codex Home"
        >
          <img
            src="/images/codex.jpg"
            alt="The Codex logo"
            className="h-12 w-12 rounded-xl object-cover"
            style={{
              border: "1px solid rgba(0,245,255,0.35)",
              boxShadow: "0 0 18px rgba(0,245,255,0.2)",
            }}
          />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm tracking-wider transition-all duration-300 relative group"
              style={{
                color: active === link.href.replace("#", "") ? "#00f5ff" : "rgba(255,255,255,0.7)",
                textShadow: active === link.href.replace("#", "") ? "0 0 10px rgba(0,245,255,0.8)" : "none",
              }}
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300"
                style={{ background: "#00f5ff", boxShadow: "0 0 6px #00f5ff" }}
              />
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollTo("#contact")}
          className="hidden md:block text-xs px-5 py-2 rounded-full font-semibold tracking-wider transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(168,85,247,0.15))",
            border: "1px solid rgba(0,245,255,0.4)",
            color: "#00f5ff",
            boxShadow: "0 0 15px rgba(0,245,255,0.2)",
          }}
        >
          Hire Me
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-6 h-[2px] transition-all duration-300"
              style={{ background: "#00f5ff" }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 mx-auto max-w-6xl rounded-2xl px-6 py-4"
            style={{
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,245,255,0.2)",
            }}
          >
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left py-3 text-sm tracking-wider border-b border-white/5 last:border-0"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
