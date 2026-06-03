import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { stripeSubscriptionId: true, plan: true },
  });

  if (!user?.stripeSubscriptionId) {
    return NextResponse.json(
      { error: "No active subscription found." },
      { status: 400 }
    );
  }

  // Cancel at period end — user keeps access until billing cycle ends
  await stripe.subscriptions.update(user.stripeSubscriptionId, {
    cancel_at_period_end: true,
  });

  await prisma.user.update({
    where: { id: session.user.id },
    data: { plan: "canceling" },
  });

  return NextResponse.json({ success: true });
}
