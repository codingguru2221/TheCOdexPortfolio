import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Switch } from "wouter";
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
import ProjectsPage from "@/pages/ProjectsPage";

function HomePage() {
  return (
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
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loading]);

  return (
    <>
      <CustomCursor />

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/projects" component={ProjectsPage} />
          <Route component={HomePage} />
        </Switch>
      )}
    </>
  );
}
