import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ background: "hsl(222, 47%, 3%)" }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Scan line */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden opacity-10"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.05) 2px, rgba(0,245,255,0.05) 4px)",
          }}
        />

        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-8 relative"
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold"
            style={{
              background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(168,85,247,0.15))",
              border: "2px solid rgba(0,245,255,0.5)",
              boxShadow: "0 0 30px rgba(0,245,255,0.4), 0 0 60px rgba(0,245,255,0.1)",
              color: "#00f5ff",
            }}
          >
            VV
          </div>
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              border: "1px solid rgba(0,245,255,0.3)",
            }}
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold mb-2 tracking-[0.3em] uppercase"
          style={{ color: "#00f5ff", textShadow: "0 0 20px rgba(0,245,255,0.5)" }}
        >
          The Codex
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm tracking-widest mb-10"
          style={{ color: "rgba(0,245,255,0.6)" }}
        >
          INITIALIZING SYSTEMS...
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "260px", opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="h-[2px] rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-100 ease-out"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #00f5ff, #a855f7)",
              boxShadow: "0 0 10px #00f5ff",
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-3 text-xs font-mono"
          style={{ color: "rgba(0,245,255,0.5)" }}
        >
          {progress}%
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
