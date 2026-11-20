import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { leadSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rateLimit";
import { notifyNewLead } from "@/lib/notify";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rl = rateLimit(`lead:${ip}`, 5, 10 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { website, ...data } = parsed.data;
  // Honeypot filled in: pretend success, store nothing.
  if (website) return NextResponse.json({ ok: true }, { status: 201 });

  const lead = await prisma.lead.create({ data });

  try {
    await notifyNewLead(lead);
  } catch (err) {
    console.error("Lead notification failed", err); // never fail the request over email
  }

  return NextResponse.json(
    { ok: true, id: lead.id, whatsapp: buildWhatsAppLink(lead) },
    { status: 201 },
  );
}
