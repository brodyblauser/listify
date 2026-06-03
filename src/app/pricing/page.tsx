"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Loader2, Zap } from "lucide-react";

const FREE_FEATURES = [
  "3 listings per month",
  "2 tone variations",
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
    if (!session) {
      router.push("/auth/signup?redirect=/pricing");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  const userPlan = (session?.user as { plan?: string })?.plan ?? "free";

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900">
            Simple, Honest Pricing
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Start free. Upgrade when you&apos;re ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Free</h2>
              <div className="mt-3">
                <span className="text-4xl font-extrabold text-gray-900">
                  $0
                </span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Perfect for trying it out
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/generate"
              className="block w-full text-center bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              {userPlan === "free" ? "Current Plan" : "Get Started"}
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-blue-600 rounded-2xl border border-blue-700 p-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full">
              POPULAR
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Pro
              </h2>
              <div className="mt-3">
                <span className="text-4xl font-extrabold text-white">$29</span>
                <span className="text-blue-200 ml-1">/month</span>
              </div>
              <p className="text-blue-200 text-sm mt-2">
                For active agents & teams
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-blue-200 flex-shrink-0" />
                  <span className="text-white">{f}</span>
                </li>
              ))}
            </ul>

            {userPlan === "pro" ? (
              <div className="w-full text-center bg-blue-500 text-white py-3 rounded-xl font-semibold">
                Current Plan
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Upgrade to Pro"
                )}
              </button>
            )}
          </div>
        </div>

        <div className="text-center mt-12 text-sm text-gray-400 space-y-1">
          <p>No contracts. Cancel anytime from your account.</p>
          <p>Questions? Email us anytime.</p>
        </div>
      </div>
    </div>
  );
}
