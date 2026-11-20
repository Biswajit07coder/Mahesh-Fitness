import type { Lead } from "@prisma/client";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Emails Mahesh when a new enquiry arrives. Silently skipped if not configured. */
export async function notifyNewLead(lead: Lead) {
  const { RESEND_API_KEY, NOTIFY_EMAIL_TO, NOTIFY_EMAIL_FROM } = process.env;
  if (!RESEND_API_KEY || !NOTIFY_EMAIL_TO || !NOTIFY_EMAIL_FROM) return;

  const html = `
    <h2>New enquiry from ${esc(lead.name)}</h2>
    <p><b>Phone:</b> ${esc(lead.phone)}</p>
    ${lead.email ? `<p><b>Email:</b> ${esc(lead.email)}</p>` : ""}
    <p><b>Goal:</b> ${esc(lead.goal)}</p>
    <p><b>Mode:</b> ${lead.mode}</p>
    ${lead.message ? `<p><b>Message:</b><br>${esc(lead.message)}</p>` : ""}
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: NOTIFY_EMAIL_FROM,
      to: [NOTIFY_EMAIL_TO],
      subject: `New fitness enquiry: ${lead.name}`,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend failed: ${res.status}`);
}
