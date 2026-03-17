import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiSend, FiUser, FiMessageSquare } from "react-icons/fi";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #00f5ff, transparent)" }}
      />
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
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
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#00f5ff" }}>
            Let's Connect
          </p>
          <h2
            className="text-4xl md:text-5xl font-black section-title"
            style={{ color: "white", fontFamily: "'Orbitron', sans-serif" }}
          >
            Contact Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Get in Touch</h3>
              <p className="text-sm leading-7" style={{ color: "rgba(255,255,255,0.6)" }}>
                Have a project in mind, an exciting opportunity, or just want to say hi?
                My inbox is always open. Let's build something amazing together!
              </p>
            </div>

            {/* Email card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-default"
              style={{
                background: "rgba(0,245,255,0.06)",
                border: "1px solid rgba(0,245,255,0.25)",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(0,245,255,0.15)",
                  border: "1px solid rgba(0,245,255,0.3)",
                }}
              >
                <FiMail className="w-5 h-5" style={{ color: "#00f5ff" }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Email</p>
                <a
                  href="mailto:codexveer@gmail.com"
                  className="text-sm font-medium transition-colors hover:text-current"
                  style={{ color: "#00f5ff" }}
                >
                  codexveer@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs"
              style={{
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.3)",
                color: "#22c55e",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              Available for Internships & Projects
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="relative">
                <FiUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "rgba(0,245,255,0.5)" }}
                />
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="neon-input w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                  }}
                />
              </div>

              {/* Email */}
              <div className="relative">
                <FiMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "rgba(0,245,255,0.5)" }}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="neon-input w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                  }}
                />
              </div>

              {/* Message */}
              <div className="relative">
                <FiMessageSquare
                  className="absolute left-4 top-4 w-4 h-4 pointer-events-none"
                  style={{ color: "rgba(0,245,255,0.5)" }}
                />
                <textarea
                  placeholder="Your Message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="neon-input w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                  }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={sending || sent}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl font-semibold text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  background: sent
                    ? "linear-gradient(135deg, #22c55e, #16a34a)"
                    : "linear-gradient(135deg, #00f5ff, #a855f7)",
                  color: "#000",
                  boxShadow: sent
                    ? "0 0 20px rgba(34,197,94,0.4)"
                    : "0 0 20px rgba(0,245,255,0.3)",
                  opacity: sending ? 0.8 : 1,
                }}
              >
                {sending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Sending...
                  </>
                ) : sent ? (
                  <>✓ Message Sent!</>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
