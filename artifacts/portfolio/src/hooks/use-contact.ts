import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;

type ContactResponse = {
  success: boolean;
  message: string;
};

const DEFAULT_API_BASE = "/api";

function getApiBaseUrl() {
  return (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE).replace(/\/$/, "");
}

export async function submitContactForm(data: ContactInput): Promise<ContactResponse> {
  const parsed = contactSchema.parse(data);
  let response: Response;

  try {
    response = await fetch(`${getApiBaseUrl()}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(parsed),
    });
  } catch {
    throw new Error("Contact backend is offline. Start the API server and try again.");
  }

  const contentType = response.headers.get("content-type") || "";
  const result =
    contentType.includes("application/json")
      ? ((await response.json().catch(() => null)) as ContactResponse | null)
      : null;

  if (!response.ok) {
    throw new Error(
      result?.message ||
        (response.status >= 500
          ? "Contact service is not configured yet on the server."
          : "Unable to send your message right now."),
    );
  }

  return result || { success: true, message: "Message sent successfully." };
}
