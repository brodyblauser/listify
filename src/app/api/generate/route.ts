import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PLANS } from "@/lib/stripe";
import { checkRateLimit } from "@/lib/rateLimit";
import { checkFairHousingCompliance } from "@/lib/fairHousing";

const isDev = !process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === "your_anthropic_api_key_here";
const client = isDev ? null : new Anthropic();

const FREE_LIMIT = PLANS.free.limit;

function mockListing(address: string, beds: string, baths: string, sqft: string, propertyType: string, highlights: string, tone: string): string {
  const sqftText = sqft ? ` spanning ${Number(sqft).toLocaleString()} square feet` : "";
  const toneLabel = tone === "luxury" ? "stunning" : tone === "friendly" ? "charming" : "impressive";
  return `1. This ${toneLabel} ${propertyType.toLowerCase()}${sqftText} offers ${beds} bedrooms and ${baths} bathrooms designed for modern living. ${highlights}. Thoughtfully appointed throughout, this home delivers the perfect balance of comfort and style. Schedule your private showing today — opportunities like this don't last.

2. Welcome to a beautifully appointed ${beds}-bedroom, ${baths}-bathroom ${propertyType.toLowerCase()} where every detail has been considered. ${highlights}. Natural light pours through generous windows, creating an inviting atmosphere from the moment you walk in. Don't miss your chance to make this exceptional property home.

3. Discover the lifestyle you've been searching for in this exceptional ${beds}bd/${baths}ba ${propertyType.toLowerCase()}${sqftText}. ${highlights}. Whether you're entertaining guests or enjoying a quiet evening in, this home rises to every occasion. Contact us today to arrange your exclusive tour.

⚠️ DEV MODE — Add your ANTHROPIC_API_KEY to .env to generate real AI listings.`;
}

function isNewMonth(resetAt: Date): boolean {
  const now = new Date();
  return (
    now.getFullYear() !== resetAt.getFullYear() ||
    now.getMonth() !== resetAt.getMonth()
  );
}

export async function POST(req: NextRequest) {
  const session = await auth();

  // Rate limit: 5 req/min unauthenticated, 20 req/min authenticated
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rateLimitKey = session?.user?.id
    ? `user:${session.user.id}`
    : `ip:${ip}`;
  const limit = session?.user?.id ? 20 : 5;
  const { allowed, remaining, resetAt } = checkRateLimit(
    rateLimitKey,
    limit,
    60 * 1000
  );

  if (!allowed) {
    const retryAfter = Math.ceil((resetAt - Date.now()) / 1000);
    return NextResponse.json(
      { error: "rate_limited", message: "Too many requests. Please wait a moment and try again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  const rateLimitHeaders = {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(remaining),
  };

  let userId: string | null = null;
  let userPlan = "free";
  let usageCount = 0;
  let agentVoice: string | null = null;

  if (session?.user?.id) {
    let user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true, usageCount: true, usageResetAt: true, agentVoice: true },
    });

    if (user && isNewMonth(user.usageResetAt)) {
      user = await prisma.user.update({
        where: { id: session.user.id },
        data: { usageCount: 0, usageResetAt: new Date() },
        select: { plan: true, usageCount: true, usageResetAt: true, agentVoice: true },
      });
    }

    userId = session.user.id;
    userPlan = user?.plan ?? "free";
    usageCount = user?.usageCount ?? 0;
    agentVoice = user?.agentVoice ?? null;
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
- Format as: "1. [description]\\n\\n2. [description]\\n\\n3. [description]"

${agentVoice ? `AGENT VOICE & STYLE (IMPORTANT):
This agent has provided examples of their personal writing style. Study the vocabulary, sentence rhythm, personality, and tone in these examples carefully. Your output must feel like it was written by the same person — not generic AI copy.

Agent's style examples:
---
${agentVoice}
---

Match their voice closely while still following all other requirements below.

` : ""}FAIR HOUSING COMPLIANCE (REQUIRED):
You must comply with the Fair Housing Act. Never use language that indicates preference, limitation, or discrimination based on race, color, religion, sex, national origin, disability, or familial status. Specifically avoid:
- References to religious institutions ("near church/mosque/synagogue/temple")
- Language targeting household composition ("adults only", "perfect for couples", "bachelor pad", "empty nesters")
- Age-based targeting ("young professionals", "retirees") unless property is HOPA-certified
- Any language suggesting racial, ethnic, or national origin identity for the neighborhood
- Descriptions implying physical ability requirements`;

  let output: string;
  if (isDev || !client) {
    output = mockListing(address, beds, baths, sqft, propertyType, highlights, tone);
  } else {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });
    output = message.content[0].type === "text" ? message.content[0].text : "";
  }

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

  const compliance = checkFairHousingCompliance(output);

  return NextResponse.json({ output, compliance, voiceApplied: !!agentVoice }, { headers: rateLimitHeaders });
}
