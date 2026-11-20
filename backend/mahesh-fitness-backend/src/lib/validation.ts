import { z } from "zod";

export const GOALS = [
  "weight-management",
  "distance-running",
  "yoga",
  "strength-training",
  "bodyweight-training",
  "defence-prep",
  "meditation-wellness",
  "other",
] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .refine((v) => /^\+?\d{7,15}$/.test(v), "Enter a valid phone number"),
  email: z
    .string()
    .trim()
    .email()
    .max(120)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  goal: z.enum(GOALS),
  mode: z.enum(["ONLINE", "OFFLINE"]),
  message: z.string().trim().max(1000).optional(),
  // Honeypot: hidden field in the form. Real users leave it empty.
  website: z.string().optional(),
});

export const leadStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "CONVERTED", "CLOSED"]),
});

export const testimonialSchema = z.object({
  name: z.string().trim().min(2).max(80),
  quote: z.string().trim().min(10).max(600),
  goal: z.string().trim().max(60).optional(),
  approved: z.boolean().default(false),
});

export const testimonialPatchSchema = z.object({
  approved: z.boolean(),
});
