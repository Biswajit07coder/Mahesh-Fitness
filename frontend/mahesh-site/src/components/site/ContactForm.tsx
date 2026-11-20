import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSubmitLead } from "@/hooks/useApi";
import type { TrainingGoal, TrainingMode } from "@/lib/api";

// ---------------------------------------------------------------------------
// Local Zod schema (mirrors backend validation.ts leadSchema)
// ---------------------------------------------------------------------------
const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .regex(/^\+?\d[\d\s-]{6,14}$/, "Enter a valid phone number"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  goal: z.enum([
    "weight-management",
    "distance-running",
    "yoga",
    "strength-training",
    "bodyweight-training",
    "defence-prep",
    "meditation-wellness",
    "other",
  ] as [TrainingGoal, ...TrainingGoal[]]),
  mode: z.enum(["ONLINE", "OFFLINE"] as [TrainingMode, TrainingMode]),
  message: z.string().trim().max(1000).optional(),
  website: z.string().optional(), // honeypot
});

type FormValues = z.infer<typeof formSchema>;

const GOAL_LABELS: Record<TrainingGoal, string> = {
  "weight-management": "Weight Management",
  "distance-running": "Distance Running",
  yoga: "Yoga",
  "strength-training": "Strength Training",
  "bodyweight-training": "Bodyweight Training",
  "defence-prep": "Defence / Army Prep",
  "meditation-wellness": "Meditation & Wellness",
  other: "Other",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function ContactForm({ whatsappLink }: { whatsappLink?: string | null }) {
  const [submitted, setSubmitted] = useState(false);
  const [whatsapp, setWhatsapp] = useState<string | null>(whatsappLink ?? null);

  const submitLead = useSubmitLead();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { mode: "ONLINE", goal: "weight-management" },
  });

  async function onSubmit(values: FormValues) {
    try {
      const res = await submitLead.mutateAsync(values);
      if (res.whatsapp) setWhatsapp(res.whatsapp);
      setSubmitted(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  // ── Success state ──
  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-6 py-4">
        <CheckCircle className="size-14 text-sage" strokeWidth={1.6} />
        <div>
          <h3 className="text-3xl font-black text-sand-light">Enquiry sent!</h3>
          <p className="mt-2 text-sand-light/70">
            I'll get back to you soon. Talk to you on WhatsApp for a quicker reply.
          </p>
        </div>
        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-extrabold text-forest-deep transition-all duration-300 hover:scale-105"
          >
            Message on WhatsApp <ArrowRight className="size-4" />
          </a>
        )}
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-sand-light/20 bg-sand-light/5 px-4 py-3 text-sm text-sand-light placeholder:text-sand-light/40 outline-none transition focus:border-sage focus:ring-1 focus:ring-sage";
  const errorCls = "mt-1 text-xs text-red-400";
  const labelCls = "block text-xs font-bold uppercase tracking-widest text-sand-light/60 mb-1.5";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      {/* Honeypot — hidden from real users */}
      <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Name */}
      <div>
        <label className={labelCls}>Name *</label>
        <input {...register("name")} placeholder="Your full name" className={inputCls} />
        {errors.name && <p className={errorCls}>{errors.name.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className={labelCls}>Phone *</label>
        <input {...register("phone")} type="tel" placeholder="+91 98765 43210" className={inputCls} />
        {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className={labelCls}>Email (optional)</label>
        <input {...register("email")} type="email" placeholder="you@example.com" className={inputCls} />
        {errors.email && <p className={errorCls}>{errors.email.message}</p>}
      </div>

      {/* Goal + Mode row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Goal *</label>
          <select {...register("goal")} className={`${inputCls} cursor-pointer`}>
            {(Object.entries(GOAL_LABELS) as [TrainingGoal, string][]).map(([v, l]) => (
              <option key={v} value={v} className="bg-forest text-sand-light">
                {l}
              </option>
            ))}
          </select>
          {errors.goal && <p className={errorCls}>{errors.goal.message}</p>}
        </div>
        <div>
          <label className={labelCls}>Mode *</label>
          <select {...register("mode")} className={`${inputCls} cursor-pointer`}>
            <option value="ONLINE" className="bg-forest text-sand-light">Online</option>
            <option value="OFFLINE" className="bg-forest text-sand-light">Offline (Kolkata)</option>
          </select>
          {errors.mode && <p className={errorCls}>{errors.mode.message}</p>}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className={labelCls}>Message (optional)</label>
        <textarea
          {...register("message")}
          rows={3}
          placeholder="Tell me a bit about your fitness goals…"
          className={`${inputCls} resize-none`}
        />
        {errors.message && <p className={errorCls}>{errors.message.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-sage px-8 py-4 text-sm font-extrabold text-forest-deep transition-all duration-300 hover:scale-105 hover:bg-sand disabled:pointer-events-none disabled:opacity-60"
      >
        {isSubmitting ? (
          <><Loader2 className="size-4 animate-spin" /> Sending…</>
        ) : (
          <>Send Enquiry <ArrowRight className="size-4" /></>
        )}
      </button>
    </form>
  );
}
