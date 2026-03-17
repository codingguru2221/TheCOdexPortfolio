import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import HackathonSection from "@/components/HackathonSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  // Lock scroll during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loading]);

  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main content */}
      {!loading && (
        <div className="relative min-h-screen" style={{ background: "hsl(222, 47%, 4%)" }}>
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <HackathonSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
