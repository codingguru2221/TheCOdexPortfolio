import { Router, type IRouter } from "express";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const router: IRouter = Router();

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getTrimmed(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

async function sendViaResend(payload: Required<ContactPayload>) {
  const apiKey = process.env["RESEND_API_KEY"];
  const to = process.env["CONTACT_TO_EMAIL"];
  const from = process.env["CONTACT_FROM_EMAIL"];
  const subjectPrefix = process.env["CONTACT_SUBJECT_PREFIX"] || "Portfolio";

  if (!apiKey || !to || !from) {
    throw new Error(
      "Server contact delivery is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL.",
    );
  }

  const subject = `${subjectPrefix} enquiry from ${payload.name}`;
  const text = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2>New portfolio contact enquiry</h2>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Message:</strong></p>
      <p>${payload.message.replace(/\n/g, "<br />")}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Email delivery failed: ${body || response.statusText}`);
  }
}

router.post("/contact", async (req, res) => {
  try {
    const body = (req.body ?? {}) as ContactPayload;
    const name = getTrimmed(body.name);
    const email = getTrimmed(body.email);
    const message = getTrimmed(body.message);

    if (name.length < 2) {
      res.status(400).json({ success: false, message: "Name must be at least 2 characters." });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({ success: false, message: "Enter a valid email address." });
      return;
    }

    if (message.length < 10) {
      res.status(400).json({ success: false, message: "Message must be at least 10 characters." });
      return;
    }

    await sendViaResend({ name, email, message });
    res.status(200).json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to send message.";
    res.status(500).json({ success: false, message });
  }
});

export default router;
