import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, plan: true, createdAt: true, usageCount: true },
  });

  return NextResponse.json({ user });
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, email, currentPassword, newPassword } = body;

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const updates: Record<string, string> = {};

  if (name !== undefined) {
    if (!name.trim()) return NextResponse.json({ error: "Name cannot be empty" }, { status: 400 });
    updates.name = name.trim();
  }

  if (email !== undefined && email !== user.email) {
    if (!email.trim()) return NextResponse.json({ error: "Email cannot be empty" }, { status: 400 });
    const existing = await prisma.user.findUnique({ where: { email: email.trim() } });
    if (existing) return NextResponse.json({ error: "That email is already in use" }, { status: 409 });
    updates.email = email.trim();
  }

  if (newPassword) {
    if (!currentPassword) return NextResponse.json({ error: "Current password is required" }, { status: 400 });
    if (!user.password) return NextResponse.json({ error: "No password set on this account" }, { status: 400 });
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    if (newPassword.length < 8) return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 });
    updates.password = await bcrypt.hash(newPassword, 12);
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ message: "No changes made" });
  }

  await prisma.user.update({ where: { id: session.user.id }, data: updates });
  return NextResponse.json({ success: true });
}
