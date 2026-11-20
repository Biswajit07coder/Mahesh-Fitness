import { NextResponse } from "next/server";
import { profile } from "@/data/content";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  return NextResponse.json({ ...profile, whatsapp: buildWhatsAppLink() });
}
