import { Quote } from "lucide-react";
import { useTestimonials } from "@/hooks/useApi";
import { Reveal } from "@/components/site/motion";

export function Testimonials() {
  const { data: testimonials, isLoading, isError } = useTestimonials();

  if (isLoading) {
    return (
      <section className="bg-sand-light py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-3xl border bg-card p-8">
                <div className="mb-4 h-4 w-3/4 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted" />
                <div className="mt-2 h-3 w-5/6 rounded bg-muted" />
                <div className="mt-6 h-3 w-1/3 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Don't render the section at all if there are no testimonials or on error
  if (isError || !testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="bg-sand-light py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm font-extrabold uppercase tracking-[0.3em] text-sage">What clients say</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 text-5xl leading-[0.95] md:text-7xl">
            Real <span className="text-gradient">results</span>.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <div className="group relative flex flex-col rounded-3xl border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-sage hover:shadow-[var(--shadow-lift)]">
                <Quote className="size-8 text-sage/50" strokeWidth={1.5} />
                <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">
                  {t.quote}
                </p>
                <div className="mt-6 border-t pt-4">
                  <p className="font-bold text-forest-deep">{t.name}</p>
                  {t.goal && (
                    <p className="mt-0.5 text-xs font-bold uppercase tracking-widest text-sage">
                      {t.goal}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
