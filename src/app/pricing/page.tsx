"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Loader2, Zap } from "lucide-react";

const FREE_FEATURES = [
  "3 listings per month",
  "All 3 tone variations",
  "All property types",
  "Copy to clipboard",
];

const PRO_FEATURES = [
  "Unlimited listings",
  "All 3 tone variations",
  "All property types",
  "Saved listing history",
  "Export all variations",
  "Priority generation",
  "Cancel anytime",
];

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
        <div className="text-center mb-16">
          <p className="text-brown-500 text-sm font-bold uppercase tracking-widest mb-3">Pricing</p>
          <h1 className="text-4xl font-bold text-white">Simple, Honest Pricing</h1>
          <p className="text-navy-400 mt-3 text-lg">Start free. Upgrade when you&apos;re ready.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">

          {/* Free */}
          <div className="bg-navy-800 rounded-2xl border border-navy-700 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-white">Free</h2>
            <div className="mt-3 mb-1">
              <span className="text-4xl font-extrabold text-white">$0</span>
              <span className="text-navy-400 ml-1">/month</span>
            </div>
            <p className="text-navy-400 text-sm mb-7">Perfect for trying it out</p>
            <ul className="space-y-3 mb-8">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-brown-500 flex-shrink-0" />
                  <span className="text-navy-200">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/generate"
              className="block w-full text-center bg-navy-600 text-navy-100 hover:bg-navy-500 py-3 rounded-xl font-semibold transition-all"
            >
              {userPlan === "free" ? "Current Plan" : "Get Started"}
            </Link>
          </div>

          {/* Pro */}
          <div className="bg-navy-900 rounded-2xl border border-navy-800 p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-brown-500 text-white text-xs font-bold px-2.5 py-1 rounded-full tracking-wide">
              POPULAR
            </div>
            {/* subtle glow */}
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-brown-600 opacity-10 rounded-full blur-2xl translate-x-1/3 translate-y-1/3" />

            <h2 className="text-xl font-bold text-white flex items-center gap-2 relative">
              <Zap className="w-5 h-5 text-brown-400" />
              Pro
            </h2>
            <div className="mt-3 mb-1 relative">
              <span className="text-4xl font-extrabold text-white">$29</span>
              <span className="text-navy-300 ml-1">/month</span>
            </div>
            <p className="text-navy-400 text-sm mb-7 relative">For active agents &amp; teams</p>
            <ul className="space-y-3 mb-8 relative">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-brown-400 flex-shrink-0" />
                  <span className="text-navy-200">{f}</span>
                </li>
              ))}
            </ul>
            {userPlan === "pro" ? (
              <div className="relative w-full text-center bg-navy-800 text-navy-300 py-3 rounded-xl font-semibold">
                Current Plan
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="relative w-full bg-brown-500 hover:bg-brown-400 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Loading…</>
                ) : (
                  "Upgrade to Pro"
                )}
              </button>
            )}
          </div>
        </div>

        <div className="text-center mt-12 text-sm text-navy-400 space-y-1">
          <p>No contracts. Cancel anytime from your account.</p>
          <p>Questions? Email us anytime.</p>
        </div>
      </div>
    </div>
  );
}
