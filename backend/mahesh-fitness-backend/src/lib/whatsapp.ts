export function buildWhatsAppLink(name?: string) {
  const number = (process.env.WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
  if (!number) return null;
  const text = name
    ? `Hi Mahesh, I'm ${name}. I just sent an enquiry from your website.`
    : "Hi Mahesh, I'd like to know more about your training.";
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
