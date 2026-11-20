import { Mail, MessageCircle, type LucideProps } from "lucide-react";

function Instagram(props: LucideProps) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className={props.className}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg>);
}

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/maheshbuilt", Icon: Instagram },
  { label: "WhatsApp", href: "https://wa.me/916290718879?text=Hi%20Mahesh%2C%20I%27d%20like%20to%20know%20more%20about%20your%20training.", Icon: MessageCircle },
  {
    label: "Gmail",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=mashukla090@gmail.com&su=Fitness%20Training%20Enquiry",
    Icon: Mail,
  },
];

export function SocialRow({ variant = "light" }: { variant?: "light" | "dark" }) {
  const base = variant === "light"
    ? "glass text-forest-deep hover:bg-forest hover:text-sand-light"
    : "bg-sand-light/10 text-sand-light border border-sand-light/25 hover:bg-sand hover:text-forest-deep";
  return (
    <div className="flex gap-3">
      {SOCIALS.map(({ label, href, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
          className={`group grid size-12 place-items-center rounded-full transition-all duration-500 hover:-translate-y-1.5 hover:rotate-[8deg] hover:scale-110 ${base}`}>
          <Icon className="size-5 transition-transform duration-500 group-hover:scale-110" strokeWidth={2.4} />
        </a>
      ))}
    </div>
  );
}
