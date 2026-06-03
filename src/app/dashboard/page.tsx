"use client";

import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Trash2, Copy, Check, Sparkles, Crown, AlertCircle } from "lucide-react";
import clsx from "clsx";

type Listing = {
  id: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number | null;
  propertyType: string;
  tone: string;
  output: string;
  createdAt: string;
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={clsx(
        "flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-all",
        copied
          ? "bg-green-100 text-green-700"
          : "bg-navy-700 text-navy-200 hover:bg-navy-600"
      )}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const upgraded = searchParams.get("upgraded") === "true";

  const userPlan = (session?.user as { plan?: string })?.plan ?? "free";
  const usageCount = (session?.user as { usageCount?: number })?.usageCount ?? 0;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?redirect=/dashboard");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/listings")
        .then((r) => r.json())
        .then((data) => setListings(data.listings ?? []))
        .finally(() => setLoading(false));
    }
  }, [status]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/listings?id=${id}`, { method: "DELETE" });
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  const handleCancel = async () => {
    if (!cancelConfirm) {
      setCancelConfirm(true);
      return;
    }
    setCancelLoading(true);
    await fetch("/api/stripe/cancel", { method: "POST" });
    setCancelLoading(false);
    setCancelConfirm(false);
    window.location.reload();
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {upgraded && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-4 mb-8 flex items-center gap-3">
            <Crown className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <strong>Welcome to Pro!</strong> You now have unlimited listing
              generations.
            </div>
          </div>
        )}

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-navy-300 text-sm mt-1">
              {session?.user?.name ?? session?.user?.email}
            </p>
          </div>
          <Link
            href="/generate"
            className="bg-navy-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
          >
            <Sparkles className="w-4 h-4" />
            New Listing
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-navy-800 rounded-xl border border-navy-700 p-5 shadow-sm">
            <div className="text-2xl font-bold text-white">
              {listings.length}
            </div>
            <div className="text-sm text-navy-300 mt-0.5">Total Listings</div>
          </div>
          <div className="bg-navy-800 rounded-xl border border-navy-700 p-5 shadow-sm">
            <div className="text-2xl font-bold text-white">{usageCount}</div>
            <div className="text-sm text-navy-300 mt-0.5">Generations Used</div>
          </div>
          <div
            className={clsx(
              "rounded-xl border p-5 shadow-sm col-span-2 sm:col-span-1",
              userPlan === "pro"
                ? "bg-navy-900 border-navy-800"
                : "bg-navy-800 border-navy-700"
            )}
          >
            <div
              className={clsx(
                "text-2xl font-bold capitalize",
                userPlan === "pro" ? "text-white" : "text-white"
              )}
            >
              {userPlan}
            </div>
            <div
              className={clsx(
                "text-sm mt-0.5",
                userPlan === "pro" ? "text-navy-300" : "text-navy-300"
              )}
            >
              {userPlan === "pro" ? (
                "Unlimited generations"
              ) : (
                <Link
                  href="/pricing"
                  className="text-brown-500 hover:underline font-medium"
                >
                  Upgrade to Pro →
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Cancel subscription */}
        {(userPlan === "pro" || userPlan === "canceling") && (
          <div className="mb-8">
            {userPlan === "canceling" ? (
              <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                Your subscription is cancelled and will end at the end of your current billing period.
              </div>
            ) : cancelConfirm ? (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-4">
                <p className="text-sm text-red-700 font-medium mb-3">
                  Are you sure? You&apos;ll keep Pro access until the end of your current billing period.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    disabled={cancelLoading}
                    className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-60 flex items-center gap-2"
                  >
                    {cancelLoading && <Sparkles className="w-3.5 h-3.5 animate-spin" />}
                    Yes, cancel my subscription
                  </button>
                  <button
                    onClick={() => setCancelConfirm(false)}
                    className="text-sm text-navy-200 hover:text-gray-800 px-4 py-2 rounded-lg border border-navy-700 hover:bg-navy-900"
                  >
                    Never mind
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleCancel}
                className="text-sm text-navy-400 hover:text-red-500 transition-colors"
              >
                Cancel subscription
              </button>
            )}
          </div>
        )}

        {/* Listings */}
        <h2 className="text-lg font-semibold text-white mb-4">
          Saved Listings
        </h2>

        {listings.length === 0 ? (
          <div className="text-center py-16 bg-navy-800 rounded-2xl border border-navy-700">
            <Sparkles className="w-10 h-10 text-navy-300 mx-auto mb-3" />
            <p className="text-navy-300 mb-4">No listings yet.</p>
            <Link
              href="/generate"
              className="bg-navy-900 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
            >
              Generate Your First Listing
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-navy-800 rounded-xl border border-navy-700 shadow-sm overflow-hidden"
              >
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-navy-900 transition-colors"
                  onClick={() =>
                    setExpanded(expanded === listing.id ? null : listing.id)
                  }
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-white text-sm truncate">
                      {listing.address}
                    </div>
                    <div className="text-xs text-navy-400 mt-0.5">
                      {listing.propertyType} · {listing.beds}bd /{" "}
                      {listing.baths}ba
                      {listing.sqft ? ` · ${listing.sqft.toLocaleString()} sqft` : ""}
                      {" · "}
                      <span className="capitalize">{listing.tone}</span>
                      {" · "}
                      {new Date(listing.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    <CopyButton text={listing.output} />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(listing.id);
                      }}
                      className="text-navy-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {expanded === listing.id && (
                  <div className="border-t border-navy-700 px-5 py-4 bg-navy-900">
                    <pre className="whitespace-pre-wrap text-sm text-navy-100 font-sans leading-relaxed">
                      {listing.output}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
