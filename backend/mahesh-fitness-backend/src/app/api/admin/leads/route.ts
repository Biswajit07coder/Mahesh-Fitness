import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const cursor = url.searchParams.get("cursor");
  const take = Math.min(Number(url.searchParams.get("take") ?? 50) || 50, 100);

  const valid = ["NEW", "CONTACTED", "CONVERTED", "CLOSED"];
  const items = await prisma.lead.findMany({
    where: status && valid.includes(status) ? { status: status as never } : undefined,
    orderBy: { createdAt: "desc" },
    take: take + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  });

  const hasMore = items.length > take;
  if (hasMore) items.pop();

  return NextResponse.json({
    items,
    nextCursor: hasMore ? items[items.length - 1].id : null,
  });
}
