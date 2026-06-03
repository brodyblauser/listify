import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const obj = event.data.object as unknown as Record<string, unknown>;

  switch (event.type) {
    case "checkout.session.completed": {
      const userId =
        (obj.metadata as Record<string, string> | null)?.userId ?? null;
      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            plan: "pro",
            stripeSubscriptionId:
              typeof obj.subscription === "string" ? obj.subscription : null,
          },
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subId = typeof obj.id === "string" ? obj.id : null;
      if (subId) {
        await prisma.user.updateMany({
          where: { stripeSubscriptionId: subId },
          data: { plan: "free", stripeSubscriptionId: null },
        });
      }
      break;
    }

    case "invoice.payment_failed": {
      const subId =
        typeof obj.subscription === "string" ? obj.subscription : null;
      if (subId) {
        await prisma.user.updateMany({
          where: { stripeSubscriptionId: subId },
          data: { plan: "free" },
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
