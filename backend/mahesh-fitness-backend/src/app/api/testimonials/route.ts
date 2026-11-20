import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const revalidate = 300;

export async function GET() {
  const items = await prisma.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: { id: true, name: true, quote: true, goal: true },
  });
  return NextResponse.json({ items });
}
