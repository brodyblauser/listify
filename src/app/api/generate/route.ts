import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PLANS } from "@/lib/stripe";

const client = new Anthropic();

const FREE_LIMIT = PLANS.free.limit;

function isNewMonth(resetAt: Date): boolean {
  const now = new Date();
  return (
    now.getFullYear() !== resetAt.getFullYear() ||
    now.getMonth() !== resetAt.getMonth()
  );
}

export async function POST(req: NextRequest) {
  const session = await auth();

  let userId: string | null = null;
  let userPlan = "free";
  let usageCount = 0;

  if (session?.user?.id) {
    let user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true, usageCount: true, usageResetAt: true },
    });

    if (user && isNewMonth(user.usageResetAt)) {
      user = await prisma.user.update({
        where: { id: session.user.id },
        data: { usageCount: 0, usageResetAt: new Date() },
        select: { plan: true, usageCount: true, usageResetAt: true },
      });
    }

    userId = session.user.id;
    userPlan = user?.plan ?? "free";
    usageCount = user?.usageCount ?? 0;
  }

  if (userPlan === "free" && usageCount >= FREE_LIMIT) {
    return NextResponse.json(
      {
        error: "free_limit_reached",
        message: `You've used all ${FREE_LIMIT} free generations this month. Upgrade to Pro for unlimited listings.`,
      },
      { status: 403 }
    );
  }

  const body = await req.json();
  const {
    address,
    beds,
    baths,
    sqft,
    price,
    propertyType,
    highlights,
    neighborhood,
    tone,
  } = body;

  if (!address || !beds || !baths || !propertyType || !highlights || !tone) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const toneMap: Record<string, string> = {
    professional:
      "Use clean, professional real estate language. Be factual, clear, and polished. Appeal to serious buyers.",
    luxury:
      "Use aspirational, upscale language. Emphasize exclusivity, prestige, and premium features. Use words like 'stunning', 'exquisite', 'sophisticated'.",
    friendly:
      "Use warm, approachable, conversational language. Make the buyer feel at home. Emphasize comfort, lifestyle, and community.",
  };
  const toneInstructions =
    toneMap[tone] ?? "Use professional real estate language.";

  const priceText = price ? `Listed at $${Number(price).toLocaleString()}.` : "";
  const sqftText = sqft ? `${Number(sqft).toLocaleString()} square feet.` : "";
  const neighborhoodText = neighborhood ? `Located in ${neighborhood}.` : "";

  const prompt = `You are an expert real estate copywriter. Write 3 different MLS listing descriptions for the following property. Each description should be distinct in phrasing but all should accurately represent the property. Number them 1, 2, and 3.

PROPERTY DETAILS:
- Address: ${address}
- Property Type: ${propertyType}
- Bedrooms: ${beds}
- Bathrooms: ${baths}
${sqftText ? `- Square Footage: ${sqftText}` : ""}
${priceText ? `- Price: ${priceText}` : ""}
${neighborhoodText ? `- Location: ${neighborhoodText}` : ""}
- Key Features & Highlights: ${highlights}

TONE INSTRUCTION: ${toneInstructions}

REQUIREMENTS:
- Each description should be 3-5 sentences (100-175 words)
- Lead with the most compelling feature
- End with a call to action
- Do NOT include the address in the description
- Do NOT include the price in the description
- Format as: "1. [description]\\n\\n2. [description]\\n\\n3. [description]"`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const output =
    message.content[0].type === "text" ? message.content[0].text : "";

  if (userId) {
    await prisma.$transaction([
      prisma.listing.create({
        data: {
          userId,
          address,
          beds: Number(beds),
          baths: Number(baths),
          sqft: sqft ? Number(sqft) : null,
          price: price ? Number(price) : null,
          propertyType,
          highlights,
          neighborhood: neighborhood || null,
          tone,
          output,
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { usageCount: { increment: 1 } },
      }),
    ]);
  }

  return NextResponse.json({ output });
}
