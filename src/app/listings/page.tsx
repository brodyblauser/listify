"use client";

import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search, Sparkles, Trash2, Copy, Check, FileText,
  ChevronDown, ChevronUp, SlidersHorizontal, X, Download
} from "lucide-react";
import clsx from "clsx";

type Listing = {
  id: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number | null;
  price: number | null;
  propertyType: string;
  highlights: string;
  neighborhood: string | null;
  tone: string;
  output: string;
  createdAt: string;
};

const TONES = ["professional", "luxury", "friendly"];
const PROPERTY_TYPES = [
  "Single Family Home",
  "Condo / Townhouse",
  "Multi-Family",
  "Land / Lot",
  "Commercial",
  "Luxury Estate",
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={clsx(
        "flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-all font-medium",
        copied ? "bg-green-900/40 text-green-400" : "bg-navy-700 text-navy-200 hover:bg-navy-600"
      )}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function ListingCard({ listing, onDelete }: { listing: Listing; onDelete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);

  const templateUrl = `/generate?${new URLSearchParams({
    address: listing.address,
    beds: String(listing.beds),
    baths: String(listing.baths),
    sqft: listing.sqft ? String(listing.sqft) : "",
    price: listing.price ? String(listing.price) : "",
    propertyType: listing.propertyType,
    highlights: listing.highlights,
    neighborhood: listing.neighborhood ?? "",
    tone: listing.tone,
  }).toString()}`;

  const preview = listing.output.replace(/^\d+\.\s*/m, "").slice(0, 160) + "…";
  const date = new Date(listing.createdAt);
  const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="bg-navy-800 border border-navy-700 rounded-2xl overflow-hidden transition-all hover:border-navy-600">
      {/* Card header */}
      <div
        className="px-5 py-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-white text-sm truncate">{listing.address}</span>
              <span className={clsx(
                "text-xs px-2 py-0.5 rounded-full font-medium capitalize flex-shrink-0",
                listing.tone === "luxury" ? "bg-amber-900/40 text-amber-300" :
                listing.tone === "friendly" ? "bg-blue-900/40 text-blue-300" :
                "bg-navy-700 text-navy-300"
              )}>
                {listing.tone}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <span className="text-xs text-navy-400">{listing.propertyType}</span>
              <span className="text-navy-600 text-xs">·</span>
              <span className="text-xs text-navy-400">{listing.beds}bd / {listing.baths}ba{listing.sqft ? ` · ${listing.sqft.toLocaleString()} sqft` : ""}</span>
              {listing.price && (
                <>
                  <span className="text-navy-600 text-xs">·</span>
                  <span className="text-xs text-navy-400">${listing.price.toLocaleString()}</span>
                </>
              )}
              <span className="text-navy-600 text-xs">·</span>
              <span className="text-xs text-navy-500">{dateStr}</span>
            </div>
            {!expanded && (
              <p className="text-xs text-navy-500 mt-2 line-clamp-2 leading-relaxed">{preview}</p>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-navy-500 ml-1">
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </div>
        </div>
      </div>

      {/* Expanded output */}
      {expanded && (
        <div className="border-t border-navy-700">
          <div className="px-5 py-4 bg-navy-900/60">
            <pre className="whitespace-pre-wrap text-sm text-navy-200 font-sans leading-relaxed">
              {listing.output}
            </pre>
          </div>
          <div className="px-5 py-3 border-t border-navy-700/50 flex items-center justify-between gap-3 bg-navy-900/30">
            <div className="flex items-center gap-2">
              <CopyButton text={listing.output} />
              <Link
                href={templateUrl}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-navy-700 text-navy-200 hover:bg-navy-600 transition-all font-medium"
              >
                <FileText className="w-3 h-3" />
                Reuse as Template
              </Link>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(listing.id); }}
              className="flex items-center gap-1.5 text-xs text-navy-500 hover:text-red-400 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-900/20"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ListingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterTone, setFilterTone] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login?redirect=/listings");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/listings")
        .then((r) => r.json())
        .then((d) => setListings(d.listings ?? []))
        .finally(() => setLoading(false));
    }
  }, [status]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/listings?id=${id}`, { method: "DELETE" });
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  const filtered = useMemo(() => {
    let result = [...listings];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) => l.address.toLowerCase().includes(q) ||
               l.neighborhood?.toLowerCase().includes(q) ||
               l.highlights.toLowerCase().includes(q)
      );
    }
    if (filterType) result = result.filter((l) => l.propertyType === filterType);
    if (filterTone) result = result.filter((l) => l.tone === filterTone);
    if (sortOrder === "oldest") result = result.reverse();
    return result;
  }, [listings, search, filterType, filterTone, sortOrder]);

  const hasFilters = search || filterType || filterTone || sortOrder !== "newest";

  const exportCSV = () => {
    const headers = ["Date", "Address", "Neighborhood", "Type", "Beds", "Baths", "Sqft", "Price", "Tone", "Option A", "Option B", "Option C"];
    const rows = filtered.map((l) => {
      const parts = l.output.split(/\n\n(?=\d+\.)/).filter(Boolean).map((p) => p.replace(/^\d+\.\s*/, "").trim());
      return [
        new Date(l.createdAt).toLocaleDateString(),
        l.address,
        l.neighborhood ?? "",
        l.propertyType,
        l.beds,
        l.baths,
        l.sqft ?? "",
        l.price ?? "",
        l.tone,
        parts[0] ?? "",
        parts[1] ?? "",
        parts[2] ?? "",
      ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
    });
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `listify-listings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearch("");
    setFilterType("");
    setFilterTone("");
    setSortOrder("newest");
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brown-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">My Listings</h1>
            <p className="text-navy-400 text-sm mt-1">
              {listings.length} saved listing{listings.length !== 1 ? "s" : ""}
              {filtered.length !== listings.length && ` · ${filtered.length} shown`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {filtered.length > 0 && (
              <button
                onClick={exportCSV}
                className="flex items-center gap-1.5 text-sm font-medium text-navy-300 hover:text-white px-3 py-2 rounded-xl border border-navy-700 hover:border-navy-600 bg-navy-800 transition-all"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            )}
            <Link
              href="/generate"
              className="flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-xl transition-all"
              style={{ background: "linear-gradient(135deg, #C4A05A, #8C6828)" }}
            >
              <Sparkles className="w-4 h-4" />
              New Listing
            </Link>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="space-y-3 mb-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-500" />
              <input
                type="text"
                placeholder="Search by address, neighborhood, or features…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-navy-800 border border-navy-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-brown-500/40 focus:border-brown-500/60 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={clsx(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all",
                showFilters || filterType || filterTone
                  ? "bg-brown-500/10 border-brown-500/40 text-brown-300"
                  : "bg-navy-800 border-navy-700 text-navy-300 hover:border-navy-600"
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {(filterType || filterTone) && (
                <span className="w-1.5 h-1.5 rounded-full bg-brown-400" />
              )}
            </button>
          </div>

          {showFilters && (
            <div className="bg-navy-800 border border-navy-700 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-navy-400 mb-1.5 uppercase tracking-wide">Property Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brown-500/40"
                >
                  <option value="">All Types</option>
                  {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy-400 mb-1.5 uppercase tracking-wide">Tone</label>
                <select
                  value={filterTone}
                  onChange={(e) => setFilterTone(e.target.value)}
                  className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-sm text-white capitalize focus:outline-none focus:ring-2 focus:ring-brown-500/40"
                >
                  <option value="">All Tones</option>
                  {TONES.map((t) => <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy-400 mb-1.5 uppercase tracking-wide">Sort</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                  className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brown-500/40"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          )}

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs text-navy-400 hover:text-navy-200 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Clear all filters
            </button>
          )}
        </div>

        {/* Listings */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-navy-800 rounded-2xl border border-navy-700">
            <Sparkles className="w-10 h-10 text-navy-600 mx-auto mb-4" />
            {listings.length === 0 ? (
              <>
                <p className="text-navy-300 mb-2 font-medium">No listings yet</p>
                <p className="text-navy-500 text-sm mb-6">Generate your first listing to see it here</p>
                <Link
                  href="/generate"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all"
                  style={{ background: "linear-gradient(135deg, #C4A05A, #8C6828)" }}
                >
                  Generate Your First Listing
                </Link>
              </>
            ) : (
              <>
                <p className="text-navy-300 mb-2 font-medium">No listings match your filters</p>
                <button onClick={clearFilters} className="text-brown-400 hover:underline text-sm">Clear filters</button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
