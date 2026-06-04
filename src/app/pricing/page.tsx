"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Loader2, Zap, ShieldCheck, X } from "lucide-react";

const COMPARISON = [
  { feature: "Listings per month", free: "3", pro: "Unlimited" },
  { feature: "AI-generated descriptions", free: true, pro: true },
  { feature: "3 tone variations (Pro, Luxury, Friendly)", free: true, pro: true },
  { feature: "All property types", free: true, pro: true },
  { feature: "Fair Housing compliance scan", free: true, pro: true },
  { feature: "Saved listing history", free: false, pro: true },
  { feature: "Search & filter past listings", free: false, pro: true },
  { feature: "Reuse listings as templates", free: false, pro: true },
  { feature: "Export listings to CSV", free: false, pro: true },
  { feature: "Priority generation speed", free: false, pro: true },
];

const FAQ = [
  { q: "Can I cancel anytime?", a: "Yes. Cancel from your account settings at any time. You keep Pro access until the end of your billing period — no partial refunds, no surprises." },
  { q: "What happens to my saved listings if I cancel?", a: "Your listing history is always accessible. If you downgrade to free, you can still view and copy your past listings." },
  { q: "Is there a long-term contract?", a: "No contracts, ever. Month-to-month only." },
  { q: "What counts as a 'generation'?", a: "Each time you hit Generate, that's one generation — you get 3 description variations every time." },
];

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleUpgrade = async () => {
    if (!session) { router.push("/auth/signup?redirect=/pricing"); return; }
    setLoading(true);
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) { window.location.href = data.url; }
    else { setLoading(false); alert("Something went wrong. Please try again."); }
  };

  const userPlan = (session?.user as { plan?: string })?.plan ?? "free";

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brown-400 text-xs font-bold uppercase tracking-widest mb-4">Pricing</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Simple, Honest Pricing</h1>
          <p className="text-navy-400 text-lg max-w-md mx-auto">Start free. Upgrade when listings start piling up.</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">

          {/* Free */}
          <div className="bg-navy-800 rounded-2xl border border-navy-700 p-8">
            <h2 className="text-lg font-bold text-white mb-1">Free</h2>
            <div className="mb-1">
              <span className="text-4xl font-extrabold text-white">$0</span>
              <span className="text-navy-500 ml-1 text-sm">/month</span>
            </div>
            <p className="text-navy-500 text-sm mb-6">Try it out, no card required</p>
            <Link
              href="/generate"
              className="block w-full text-center bg-navy-700 hover:bg-navy-600 text-navy-200 py-3 rounded-xl font-semibold transition-all text-sm mb-6"
            >
              {userPlan === "free" ? "Current Plan" : "Get Started Free"}
            </Link>
            <ul className="space-y-2.5">
              {["3 listings per month", "3 AI variations per listing", "All tones & property types", "Fair Housing compliance scan"].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-navy-300">
                  <Check className="w-4 h-4 text-navy-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border border-brown-600/40 p-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(14,28,46,1) 0%, rgba(10,20,34,1) 100%)" }}>
            <div className="absolute top-0 right-0 left-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(196,160,90,0.4), transparent)" }} />
            <div className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: "linear-gradient(135deg, #C4A05A, #8C6828)" }}>
              MOST POPULAR
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-brown-400" />
              <h2 className="text-lg font-bold text-white">Pro</h2>
            </div>
            <div className="mb-1">
              <span className="text-4xl font-extrabold text-white">$29</span>
              <span className="text-navy-400 ml-1 text-sm">/month</span>
            </div>
            <p className="text-navy-400 text-sm mb-6">For active agents closing deals</p>
            {userPlan === "pro" ? (
              <div className="w-full text-center bg-navy-800 text-navy-400 py-3 rounded-xl font-semibold text-sm mb-6">
                Current Plan
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full text-white py-3 rounded-xl font-bold transition-all disabled:opacity-70 flex items-center justify-center gap-2 text-sm mb-6"
                style={{ background: "linear-gradient(135deg, #C4A05A, #8C6828)" }}
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Loading…</> : "Upgrade to Pro"}
              </button>
            )}
            <ul className="space-y-2.5">
              {["Unlimited listings", "Everything in Free", "Saved listing history", "Search, filter & export", "Reuse listings as templates", "Priority generation", "Cancel anytime"].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-navy-200">
                  <Check className="w-4 h-4 text-brown-400 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Comparison table */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-white text-center mb-6">Full Comparison</h2>
          <div className="bg-navy-800 border border-navy-700 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 px-5 py-3 border-b border-navy-700 bg-navy-900/50">
              <div className="text-xs font-bold text-navy-400 uppercase tracking-wider">Feature</div>
              <div className="text-xs font-bold text-navy-400 uppercase tracking-wider text-center">Free</div>
              <div className="text-xs font-bold text-brown-400 uppercase tracking-wider text-center">Pro</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 px-5 py-3.5 ${i < COMPARISON.length - 1 ? "border-b border-navy-700/50" : ""}`}>
                <div className="text-sm text-navy-300 pr-4">{row.feature}</div>
                <div className="text-center flex items-center justify-center">
                  {typeof row.free === "boolean" ? (
                    row.free
                      ? <Check className="w-4 h-4 text-navy-400" />
                      : <X className="w-4 h-4 text-navy-700" />
                  ) : (
                    <span className="text-sm text-navy-400">{row.free}</span>
                  )}
                </div>
                <div className="text-center flex items-center justify-center">
                  {typeof row.pro === "boolean" ? (
                    row.pro
                      ? <Check className="w-4 h-4 text-brown-400" />
                      : <X className="w-4 h-4 text-navy-700" />
                  ) : (
                    <span className="text-sm font-semibold text-brown-300">{row.pro}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fair Housing callout */}
        <div className="mb-16 bg-green-950/40 border border-green-800/30 rounded-2xl p-6 flex gap-4 items-start">
          <ShieldCheck className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-green-300 mb-1">Fair Housing Compliance — Included on Every Plan</div>
            <p className="text-green-700 text-sm leading-relaxed">
              Every description is automatically scanned for Fair Housing Act violations before you see it. Flagged phrases come with plain-English fix suggestions. Available on both Free and Pro — because protecting your license shouldn&apos;t cost extra.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-navy-800 border border-navy-700 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-white text-sm">{item.q}</span>
                  <span className="text-navy-500 ml-4 flex-shrink-0 text-lg leading-none">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-navy-400 leading-relaxed border-t border-navy-700/50 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-navy-500 space-y-1">
          <p>No contracts · Cancel anytime from your account settings</p>
          <p>Questions? Reach out anytime.</p>
        </div>

      </div>
    </div>
  );
}
