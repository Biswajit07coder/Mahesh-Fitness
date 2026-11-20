export interface LeadDetails {
  name: string;
  phone?: string;
  email?: string | null;
  goal?: string;
  mode?: string;
  message?: string | null;
}

export function buildWhatsAppLink(details?: string | LeadDetails) {
  const number = (process.env.WHATSAPP_NUMBER ?? "916290718879").replace(/\D/g, "");
  if (!number) return null;

  if (typeof details === "string") {
    const text = `Hi Mahesh, I'm ${details}. I just sent an enquiry from your website.`;
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  }

  if (details && typeof details === "object") {
    const lines = [
      `*New Training Enquiry via Website*`,
      `👤 *Name:* ${details.name}`,
      details.phone ? `📞 *Phone:* ${details.phone}` : null,
      details.email ? `✉️ *Email:* ${details.email}` : null,
      details.goal ? `🎯 *Goal:* ${details.goal}` : null,
      details.mode ? `📍 *Mode:* ${details.mode}` : null,
      details.message ? `💬 *Message:* ${details.message}` : null,
    ].filter(Boolean);

    return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent("Hi Mahesh, I'd like to know more about your training.")}`;
}
