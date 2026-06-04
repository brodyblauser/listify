import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [listingCount, userCount] = await Promise.all([
    prisma.listing.count(),
    prisma.user.count(),
  ]);
  return NextResponse.json({ listingCount, userCount });
}
