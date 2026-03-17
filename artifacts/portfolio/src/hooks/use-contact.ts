import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;

// Simulated hook since we don't have a real backend for this
export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: ContactInput) => {
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate success
      return { success: true, message: "Message sent successfully!" };
    },
  });
}
