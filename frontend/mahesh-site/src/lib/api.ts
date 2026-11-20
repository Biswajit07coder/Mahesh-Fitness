// ---------------------------------------------------------------------------
// API client — all calls to the Next.js backend go through this file.
// In development the Vite proxy forwards /api/* → http://localhost:3000.
// In production set VITE_API_BASE_URL to the deployed backend origin.
// ---------------------------------------------------------------------------

const BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message =
      (body as { error?: string }).error ??
      `Request failed: ${res.status} ${res.statusText}`;
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Types (mirror the backend schema)
// ---------------------------------------------------------------------------

export type TrainingGoal =
  | "weight-management"
  | "distance-running"
  | "yoga"
  | "strength-training"
  | "bodyweight-training"
  | "defence-prep"
  | "meditation-wellness"
  | "other";

export type TrainingMode = "ONLINE" | "OFFLINE";

export interface Profile {
  name: string;
  tagline: string;
  location: string;
  modes: string[];
  experienceYears: number;
  images: { logo: string; banner: string; portrait: string };
  bio: string[];
  expertise: string[];
  certifications: string[];
  achievements: string[];
  socials: { instagram: string; youtube: string; facebook: string };
  whatsapp: string | null;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  goal: string | null;
}

export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  goal: TrainingGoal;
  mode: TrainingMode;
  message?: string;
  website?: string; // honeypot — always leave empty
}

export interface LeadResponse {
  ok: boolean;
  id: string;
  whatsapp: string | null;
}

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------

export const api = {
  /** Public profile data (name, bio, achievements, socials, whatsApp link) */
  getProfile: () => request<Profile>("/api/profile"),

  /** Approved client testimonials */
  getTestimonials: () =>
    request<{ items: Testimonial[] }>("/api/testimonials").then((r) => r.items),

  /** Submit an enquiry / lead */
  submitLead: (payload: LeadPayload) =>
    request<LeadResponse>("/api/leads", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
