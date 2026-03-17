import { useRef, Suspense, useMemo, Component, type ReactNode, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import * as THREE from "three";

/* Detect WebGL support */
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/* Error boundary to catch Three.js failures */
class CanvasErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.warn("Three.js canvas error caught:", error.message);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/* Animated orb particle */
function AnimatedOrb({
  color, size, x, y, delay, duration,
}: {
  color: string; size: number; x: string; y: string; delay: number; duration: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: `radial-gradient(circle, ${color}30, transparent 70%)`,
        filter: "blur(50px)",
      }}
      animate={{ y: [0, -40, 0], scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

/* CSS fallback background */
function CSSBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatedOrb color="#00f5ff" size={400} x="5%" y="10%" delay={0} duration={8} />
      <AnimatedOrb color="#a855f7" size={300} x="65%" y="50%" delay={2} duration={10} />
      <AnimatedOrb color="#3b82f6" size={250} x="40%" y="-10%" delay={1} duration={7} />
      <AnimatedOrb color="#00f5ff" size={150} x="80%" y="15%" delay={3} duration={9} />
      <AnimatedOrb color="#a855f7" size={200} x="15%" y="65%" delay={1.5} duration={11} />

      {/* Moving particles */}
      {Array.from({ length: 80 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "#00f5ff" : i % 3 === 1 ? "#a855f7" : "#3b82f6",
            opacity: 0.2 + Math.random() * 0.5,
          }}
          animate={{
            y: [0, -(Math.random() * 60 + 20), 0],
            x: [0, (Math.random() - 0.5) * 30, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Orbital rings (CSS) */}
      <div
        className="absolute"
        style={{
          width: 600,
          height: 600,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(0,245,255,0.15)",
          borderRadius: "50%",
          animation: "spin 20s linear infinite",
        }}
      />
      <div
        className="absolute"
        style={{
          width: 450,
          height: 450,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(168,85,247,0.15)",
          borderRadius: "50%",
          animation: "spin 15s linear infinite reverse",
        }}
      />

      <style>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* 3D Particles */
function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 20;
    return pos;
  }, []);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.03;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00f5ff" size={0.03} sizeAttenuation depthWrite={false} opacity={0.6} />
    </Points>
  );
}

function OrbitalRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * speed;
      ref.current.rotation.z = state.clock.getElapsedTime() * speed * 0.6;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

function ThreeScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} color="#00f5ff" intensity={1} />
      <pointLight position={[-5, -5, -5]} color="#a855f7" intensity={0.5} />
      <ParticleField />
      <OrbitalRing radius={3.5} speed={0.15} color="#00f5ff" />
      <OrbitalRing radius={2.5} speed={-0.2} color="#a855f7" />
      <OrbitalRing radius={4.5} speed={0.08} color="#3b82f6" />
    </>
  );
}

export default function HeroSection() {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
  }, []);

  const handleViewProjects = () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  const handleContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(222,47%,3%) 0%, hsl(222,47%,6%) 100%)" }}
    >
      {/* Background: 3D canvas or CSS fallback */}
      <div className="absolute inset-0">
        {webglSupported === null ? null : webglSupported ? (
          <CanvasErrorBoundary fallback={<CSSBackground />}>
            <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
              <Suspense fallback={null}>
                <ThreeScene />
              </Suspense>
            </Canvas>
          </CanvasErrorBoundary>
        ) : (
          <CSSBackground />
        )}
        {webglSupported === null && <CSSBackground />}
      </div>

      {/* Radial overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 20%, hsl(222,47%,3%) 80%)" }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase"
          style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.3)", color: "#00f5ff" }}
        >
          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
          Available for Opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-7xl font-black mb-2 leading-tight"
          style={{
            background: "linear-gradient(135deg, #ffffff 30%, #00f5ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          Veerendra
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl font-black mb-1 leading-tight"
          style={{
            background: "linear-gradient(135deg, #00f5ff 0%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          Vishwakarma
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl mb-2 font-light tracking-widest"
          style={{ color: "rgba(168,85,247,0.9)", textShadow: "0 0 10px rgba(168,85,247,0.5)" }}
        >
          ( The Codex )
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-sm md:text-base mb-6 tracking-wide"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Engineering Enthusiast &nbsp;|&nbsp; Innovator in the Making &nbsp;|&nbsp; Future Tech Trailblazer
        </motion.p>

        {/* Typing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-xl md:text-2xl font-mono mb-10 h-8 flex items-center justify-center gap-2"
          style={{ color: "#00f5ff" }}
        >
          <span style={{ color: "rgba(255,255,255,0.4)" }}>{">"}</span>
          <TypeAnimation
            sequence={["AI Developer", 2000, "Cybersecurity Enthusiast", 2000, "Full Stack Developer", 2000]}
            speed={50}
            repeat={Infinity}
            style={{ textShadow: "0 0 10px rgba(0,245,255,0.6)" }}
          />
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ color: "#00f5ff" }}>
            |
          </motion.span>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={handleViewProjects}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-full font-semibold text-sm tracking-wider"
            style={{
              background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(168,85,247,0.15))",
              border: "1px solid rgba(0,245,255,0.5)",
              color: "#00f5ff",
              boxShadow: "0 0 20px rgba(0,245,255,0.2)",
            }}
          >
            View Projects
          </motion.button>
          <motion.button
            onClick={handleContact}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-full font-semibold text-sm tracking-wider"
            style={{
              background: "linear-gradient(135deg, #00f5ff 0%, #a855f7 100%)",
              color: "#000",
              boxShadow: "0 0 20px rgba(0,245,255,0.3)",
            }}
          >
            Contact Me
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Scroll Down</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: "rgba(0,245,255,0.3)" }}
        >
          <div className="w-1.5 h-3 rounded-full" style={{ background: "rgba(0,245,255,0.6)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
