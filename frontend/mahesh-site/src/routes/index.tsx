import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Award, Dumbbell, Flame, Footprints, HeartPulse, Medal, Sparkles, Wind } from "lucide-react";
import heroImg from "@/assets/hero-banner.jpg";
import logoImg from "@/assets/logo.jpg";
import portrait from "@/assets/coach-portrait.jpg"; // Updated with outdoor pull-up portrait
import { Reveal, SmoothScroll, Tilt } from "@/components/site/motion";
import { SOCIALS, SocialRow } from "@/components/site/social";
import { ContactForm } from "@/components/site/ContactForm";
import { Testimonials } from "@/components/site/Testimonials";
import { useProfile } from "@/hooks/useApi";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mahesh Shukla — Fitness Coach & Yoga Trainer, Kolkata" },
      { name: "description", content: "ACE certified personal trainer, yoga & meditation coach. Online and offline training in Kolkata." },
      { property: "og:title", content: "Mahesh Shukla — Fitness Coach & Yoga Trainer" },
      { property: "og:description", content: "Strength, endurance, yoga and meditation — personal training online and offline." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const expertise = [
  { t: "Weight management", Icon: Flame },
  { t: "Distance running", Icon: Footprints },
  { t: "Yoga", Icon: Wind },
  { t: "Bodyweight training", Icon: HeartPulse },
  { t: "Strength training", Icon: Dumbbell },
  { t: "Meditation", Icon: Sparkles },
];
const achievements = [
  "Gold Medalist from Maharashtra — 5 km & 10 km track, 5 km cross country",
  "Trained 650+ students for Army, Police and defence services",
  "Built fitness communities in Mumbai and Gujarat",
  "Guiding students to overcome addiction-related habits",
];

function Nav() {
  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[min(1100px,92%)] items-center justify-between rounded-full glass px-6 py-3">
      <a href="#" className="flex items-center gap-2.5 font-display text-lg font-black tracking-tight text-forest-deep">
        <img src={logoImg} alt="MAHESHBUILT logo" className="size-8 rounded-full object-cover ring-1 ring-forest/20 shadow-sm" />
        <span>MAHESHBUILT<span className="text-sage">.</span></span>
      </a>
      <nav className="hidden gap-8 text-sm font-bold text-forest md:flex">
        {["About", "Expertise", "Achievements", "Contact"].map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-forest after:transition-all after:duration-500 hover:after:w-full">{l}</a>
        ))}
      </nav>
      <a href="#contact" className="rounded-full bg-forest px-5 py-2 text-sm font-extrabold text-sand-light transition-all duration-500 hover:scale-105 hover:bg-forest-deep">Train with me</a>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.3]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const words = ["Strength.", "Endurance.", "Balance."];
  return (
    <section ref={ref} className="relative h-[110vh] overflow-hidden">
      <motion.img src={heroImg} alt="Mahesh running on a forest trail" width={1920} height={1088}
        style={{ scale, y }} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 flex h-screen flex-col justify-end px-[6vw] pb-[14vh]">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}
          className="mb-5 w-fit rounded-full btn-ghost-sand !px-4 !py-1.5 text-xs uppercase tracking-[0.25em]">Kolkata · Online & Offline</motion.p>
        <h1 className="font-display text-[clamp(3.2rem,10vw,9rem)] leading-[0.88] text-sand-light drop-shadow-2xl">
          {words.map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.4 + i * 0.15, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
                {i === 2 ? <span className="text-sand">{w}</span> : w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 1 }}
          className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#contact" className="btn-hero">Start training <ArrowRight className="size-5" /></a>
          <a href="#about" className="btn-ghost-sand">Meet Mahesh</a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = ["ACE Certified", "100+ Clients", "650+ Defence Students", "State Gold Medalist", "Yoga & Meditation", "Massage Specialist"];
  return (
    <div className="relative -mt-[10vh] z-20 -rotate-2 bg-forest py-5 shadow-[var(--shadow-lift)]">
      <div className="flex w-max marquee gap-12 font-display text-2xl font-black uppercase text-sand-light">
        {[...items, ...items].map((t, i) => (<span key={i} className="flex items-center gap-12">{t}<span className="text-sage">✦</span></span>))}
      </div>
    </div>
  );
}

function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const { data: profile } = useProfile();
  const stats: [string, string][] = [
    ["100+", "Clients"],
    ["650+", "Defence students"],
    ["9", "Age I started"],
  ];
  return (
    <section id="about" ref={ref} className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-36 md:grid-cols-2">
      <motion.div style={{ y: imgY }} className="relative">
        <div className="absolute -left-6 -top-6 size-40 rounded-full bg-sage/50 blur-2xl float-slow" />
        <Tilt className="overflow-hidden rounded-[2rem] card-3d">
          <img src={portrait} alt="Portrait of Mahesh Shukla" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
        </Tilt>
        <div className="absolute -bottom-8 -right-4 rounded-2xl glass px-6 py-4 shadow-[var(--shadow-soft)] float-slow" style={{ animationDelay: "1.5s" }}>
          <p className="font-display text-4xl font-black text-forest">{profile?.experienceYears ?? 4}+</p>
          <p className="text-sm font-bold text-muted-foreground">years coaching</p>
        </div>
      </motion.div>
      <div>
        <Reveal><p className="text-sm font-extrabold uppercase tracking-[0.3em] text-sage">About</p></Reveal>
        <Reveal delay={0.1}><h2 className="mt-4 text-5xl leading-[0.95] md:text-6xl">Training built around <span className="text-gradient">you</span>.</h2></Reveal>
        {profile ? (
          <>
            <Reveal delay={0.2}><p className="mt-6 text-lg leading-relaxed text-muted-foreground">{profile.bio[0]}</p></Reveal>
            <Reveal delay={0.3}><p className="mt-4 text-lg leading-relaxed text-muted-foreground">{profile.bio[1]}</p></Reveal>
          </>
        ) : (
          <>
            <Reveal delay={0.2}><p className="mt-6 text-lg leading-relaxed text-muted-foreground">I'm Mahesh Shukla — a full-time Fitness Coach, Personal Trainer, Yoga Instructor and Meditation Trainer. My journey began at nine years old; today I'm an ACE Certified Personal Trainer and Certified Massage Specialist.</p></Reveal>
            <Reveal delay={0.3}><p className="mt-4 text-lg leading-relaxed text-muted-foreground">With 100+ clients trained, I believe in consistency and proper technique over short-term results.</p></Reveal>
          </>
        )}
        <Reveal delay={0.4}>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {stats.map(([n, l]) => (
              <div key={l} className="rounded-2xl border bg-card p-4 transition-all duration-500 hover:-translate-y-1 hover:border-sage">
                <p className="font-display text-3xl font-black text-forest">{n}</p>
                <p className="text-xs font-bold text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section id="expertise" className="bg-sand-light py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal><h2 className="max-w-3xl text-5xl leading-[0.95] md:text-7xl">Six ways to get <span className="text-gradient">stronger</span>.</h2></Reveal>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map(({ t, Icon }, i) => (
            <Reveal key={t} delay={i * 0.08}>
              <Tilt className="group rounded-3xl card-3d p-8">
                <div style={{ transform: "translateZ(50px)" }}>
                  <div className="grid size-16 place-items-center rounded-2xl bg-forest text-sand-light transition-all duration-700 group-hover:rotate-[360deg] group-hover:bg-sage group-hover:text-forest-deep">
                    <Icon className="size-7" strokeWidth={2.4} />
                  </div>
                  <h3 className="mt-8 text-2xl">{t}</h3>
                  <p className="mt-2 text-sm font-bold text-muted-foreground">0{i + 1} — Personalised programme</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  const { data: profile } = useProfile();
  const items = profile?.achievements ?? achievements;
  return (
    <section id="achievements" className="relative overflow-hidden bg-forest-deep py-36 text-sand-light">
      <img src={heroImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-15" loading="lazy" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal><p className="text-sm font-extrabold uppercase tracking-[0.3em] text-sage">Achievements</p></Reveal>
        <Reveal delay={0.1}><h2 className="mt-4 text-5xl md:text-7xl">Proven on the <span className="text-sand">track</span>.</h2></Reveal>
        <div className="mt-16 divide-y divide-sand-light/15 border-y border-sand-light/15">
          {items.map((a, i) => (
            <Reveal key={a} delay={i * 0.08}>
              <div className="group flex items-center gap-6 py-8 transition-all duration-700 hover:pl-6">
                <span className="font-display text-5xl font-black text-sage/40 transition-colors duration-500 group-hover:text-sand">0{i + 1}</span>
                <p className="flex-1 text-xl font-bold md:text-2xl">{a}</p>
                {i === 0 ? <Medal className="size-8 text-sand opacity-0 transition-all duration-500 group-hover:opacity-100" /> : <Award className="size-8 text-sand opacity-0 transition-all duration-500 group-hover:opacity-100" />}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { data: profile } = useProfile();
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-36">
      <Reveal>
        <Tilt max={5} className="overflow-hidden rounded-[2.5rem] bg-forest p-10 text-sand-light md:p-16">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Left — heading + social links */}
            <div className="flex flex-col">
              <h2 className="text-5xl leading-[0.95] md:text-6xl">Ready to <span className="text-sand">begin</span>?</h2>
              <p className="mt-6 text-lg text-sand-light/80">Online or in Kolkata — fill in the form or reach me directly on any of the links below.</p>

              {/* Labelled social cards */}
              <div className="mt-10 flex flex-col gap-3">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-sand-light/20 px-5 py-4 font-extrabold transition-all duration-500 hover:translate-x-2 hover:bg-sand hover:text-forest-deep"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand-light/10 transition-colors duration-500 group-hover:bg-forest/10">
                        <Icon className="size-4" strokeWidth={2.4} />
                      </span>
                      {label}
                    </span>
                    <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-rotate-45" />
                  </a>
                ))}
              </div>

              {/* Icon row for quick access */}
              <div className="mt-8"><SocialRow variant="dark" /></div>
            </div>

            {/* Right — enquiry form */}
            <div>
              <ContactForm whatsappLink={profile?.whatsapp} />
            </div>
          </div>
        </Tilt>
      </Reveal>
    </section>
  );
}

function Index() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="grain">
      <SmoothScroll />
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-forest" />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Expertise />
      <Achievements />
      <Testimonials />
      <Contact />
      <footer className="flex flex-col items-center gap-6 border-t px-6 py-12">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="MAHESHBUILT logo" className="size-10 rounded-full object-cover ring-2 ring-forest/20 shadow-sm" />
          <span className="font-display text-xl font-black tracking-tight text-forest-deep">MAHESHBUILT<span className="text-sage">.</span></span>
        </div>
        {/* Labelled footer links */}
        <div className="flex flex-wrap justify-center gap-3">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold text-muted-foreground transition-all duration-300 hover:border-forest hover:text-forest"
            >
              <Icon className="size-4" strokeWidth={2.4} />
              {label}
            </a>
          ))}
        </div>
        <p className="text-sm font-bold text-muted-foreground">© {new Date().getFullYear()} Mahesh Shukla · Fitness Coach, Kolkata</p>
      </footer>
    </div>
  );
}
