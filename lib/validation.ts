import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(120),
  phone: z.string().min(7, "Please enter a valid phone number").max(20),
  email: z.string().email("Please enter a valid email address"),
  address: z.string().min(4, "Please enter the project address").max(240),
  service: z.string().min(2, "Please choose a service"),
  details: z.string().max(4000).optional().default(""),
  consent: z.literal("on", {
    errorMap: () => ({ message: "Consent is required so we can respond to your enquiry" }),
  }),
  // Honeypot — must remain empty. Bots fill it; humans never see it.
  company: z.string().max(0).optional().default(""),
  source: z.string().optional().default("quote-form"),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
