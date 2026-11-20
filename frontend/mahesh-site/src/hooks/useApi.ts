import { useQuery, useMutation } from "@tanstack/react-query";
import { api, type LeadPayload } from "@/lib/api";

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------
export const QUERY_KEYS = {
  profile: ["profile"] as const,
  testimonials: ["testimonials"] as const,
};

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/** Fetches the coach's public profile from GET /api/profile */
export function useProfile() {
  return useQuery({
    queryKey: QUERY_KEYS.profile,
    queryFn: api.getProfile,
    staleTime: 60 * 60 * 1000, // 1 h — matches backend revalidate: 3600
  });
}

/** Fetches approved testimonials from GET /api/testimonials */
export function useTestimonials() {
  return useQuery({
    queryKey: QUERY_KEYS.testimonials,
    queryFn: api.getTestimonials,
    staleTime: 5 * 60 * 1000, // 5 min — matches backend revalidate: 300
  });
}

/** Submits an enquiry to POST /api/leads */
export function useSubmitLead() {
  return useMutation({
    mutationFn: (payload: LeadPayload) => api.submitLead(payload),
  });
}
