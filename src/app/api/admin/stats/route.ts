import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requestingUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isAdmin: true },
  });

  if (!requestingUser?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [totalUsers, proUsers, totalListings, recentUsers, topUsers] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { plan: "pro" } }),
      prisma.listing.count(),
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 20,
        select: {
          id: true,
          name: true,
          email: true,
          plan: true,
          usageCount: true,
          createdAt: true,
          _count: { select: { listings: true } },
        },
      }),
      prisma.user.findMany({
        orderBy: { usageCount: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          plan: true,
          usageCount: true,
        },
      }),
    ]);

  return NextResponse.json({
    stats: {
      totalUsers,
      proUsers,
      freeUsers: totalUsers - proUsers,
      totalListings,
      mrr: proUsers * 29,
    },
    recentUsers,
    topUsers,
  });
}
