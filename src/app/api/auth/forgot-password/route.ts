import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  // 3 attempts per 15 minutes per IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed } = checkRateLimit(`forgot:${ip}`, 3, 15 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in 15 minutes." },
      { status: 429 }
    );
  }

  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Always return success to prevent email enumeration
  if (!user || !user.password) {
    return NextResponse.json({ success: true });
  }

  // Invalidate any existing unused tokens for this email
  await prisma.passwordResetToken.updateMany({
    where: { email, used: false },
    data: { used: true },
  });

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.passwordResetToken.create({
    data: { email, token, expiresAt },
  });

  const base = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const resetUrl = `${base}/reset-password/${token}`;

  await sendPasswordResetEmail(email, resetUrl);

  return NextResponse.json({ success: true });
}
