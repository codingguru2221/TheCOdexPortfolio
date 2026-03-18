import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMessageSquare, FiSend, FiUser } from "react-icons/fi";
import { contactSchema, submitContactForm, type ContactInput } from "@/hooks/use-contact";

const initialForm: ContactInput = { name: "", email: "", message: "" };

export default function ContactSection() {
  const [form, setForm] = useState<ContactInput>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [status, setStatus] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (field: keyof ContactInput, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("");
    setSent(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      });
      setStatus("Please fill the form correctly before sending.");
      return;
    }

    try {
      setSending(true);
      setStatus("");
      await submitContactForm(result.data);
      setForm(initialForm);
      setErrors({});
      setSent(true);
      setStatus("Message delivered successfully. I will get it directly.");
    } catch (error) {
      setSent(false);
      setStatus(error instanceof Error ? error.message : "Unable to send your message right now.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-24">
      <div
        className="absolute bottom-0 left-0 h-96 w-96 rounded-full pointer-events-none opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #00f5ff, transparent)" }}
      />
      <div
        className="absolute top-0 right-0 h-80 w-80 rounded-full pointer-events-none opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
      />

      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm uppercase tracking-widest" style={{ color: "#00f5ff" }}>
            Let's Connect
          </p>
          <h2
            className="section-title text-4xl font-black md:text-5xl"
            style={{ color: "white", fontFamily: "'Orbitron', sans-serif" }}
          >
            Contact Me
          </h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="mb-3 text-xl font-bold text-white">Direct Message Delivery</h3>
              <p className="text-sm leading-7" style={{ color: "rgba(255,255,255,0.6)" }}>
                User ko kahin aur jane ki zarurat nahi hai. Form submit hote hi message backend ke through directly aapke inbox me bheja jayega.
              </p>
            </div>

            <div
              className="flex items-center gap-4 rounded-xl p-4"
              style={{
                background: "rgba(0,245,255,0.06)",
                border: "1px solid rgba(0,245,255,0.25)",
              }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{
                  background: "rgba(0,245,255,0.15)",
                  border: "1px solid rgba(0,245,255,0.3)",
                }}
              >
                <FiMail className="h-5 w-5" style={{ color: "#00f5ff" }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Delivery Mode
                </p>
                <p className="text-sm font-medium" style={{ color: "#00f5ff" }}>
                  Direct backend email delivery
                </p>
              </div>
            </div>

            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs"
              style={{
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.3)",
                color: "#22c55e",
              }}
            >
              <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
              Available for Internships, Freelance & Projects
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <FiUser
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
                  style={{ color: "rgba(0,245,255,0.5)" }}
                />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="neon-input w-full rounded-xl py-3 pr-4 pl-11 text-sm outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${errors.name ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
                    color: "white",
                  }}
                />
                {errors.name ? (
                  <p className="mt-2 text-xs" style={{ color: "#f87171" }}>
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="relative">
                <FiMail
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
                  style={{ color: "rgba(0,245,255,0.5)" }}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="neon-input w-full rounded-xl py-3 pr-4 pl-11 text-sm outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${errors.email ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
                    color: "white",
                  }}
                />
                {errors.email ? (
                  <p className="mt-2 text-xs" style={{ color: "#f87171" }}>
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className="relative">
                <FiMessageSquare
                  className="pointer-events-none absolute left-4 top-4 h-4 w-4"
                  style={{ color: "rgba(0,245,255,0.5)" }}
                />
                <textarea
                  placeholder="Your Message"
                  rows={6}
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="neon-input w-full resize-none rounded-xl py-3 pr-4 pl-11 text-sm outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${errors.message ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
                    color: "white",
                  }}
                />
                {errors.message ? (
                  <p className="mt-2 text-xs" style={{ color: "#f87171" }}>
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: sending ? 1 : 1.02 }}
                whileTap={{ scale: sending ? 1 : 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold tracking-wider transition-all duration-300"
                style={{
                  background: sent
                    ? "linear-gradient(135deg, #22c55e, #16a34a)"
                    : "linear-gradient(135deg, #00f5ff, #a855f7)",
                  color: "#000",
                  boxShadow: sent
                    ? "0 0 20px rgba(34,197,94,0.3)"
                    : "0 0 20px rgba(0,245,255,0.3)",
                  opacity: sending ? 0.8 : 1,
                }}
              >
                {sending ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                    Sending...
                  </>
                ) : sent ? (
                  <>Message Sent</>
                ) : (
                  <>
                    <FiSend className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </motion.button>

              <p
                className="min-h-5 text-sm"
                style={{
                  color:
                    sent && !status.toLowerCase().includes("unable")
                      ? "#22c55e"
                      : status.includes("correctly")
                        ? "#f87171"
                        : "rgba(255,255,255,0.65)",
                }}
              >
                {status}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
