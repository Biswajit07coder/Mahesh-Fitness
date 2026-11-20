import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

const sha = (s: string) => createHash("sha256").update(s).digest();

/** Returns a 401/500 response if the request is not authorised, else null. */
export function requireAdmin(req: Request): NextResponse | null {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) {
    return NextResponse.json({ error: "Admin access not configured" }, { status: 500 });
  }
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token || !timingSafeEqual(sha(token), sha(expected))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
