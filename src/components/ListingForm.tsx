"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import clsx from "clsx";

type FormData = {
  address: string;
  beds: string;
  baths: string;
  sqft: string;
  price: string;
  propertyType: string;
  highlights: string;
  neighborhood: string;
  tone: string;
};

type Props = {
  onResult: (output: string, formData: FormData) => void;
  onLimitReached: () => void;
};

const PROPERTY_TYPES = [
  "Single Family Home",
  "Condo / Townhouse",
  "Multi-Family",
  "Land / Lot",
  "Commercial",
  "Luxury Estate",
];

const TONES = [
  { value: "professional", label: "Professional", desc: "Clean & factual" },
  { value: "luxury", label: "Luxury", desc: "Upscale & aspirational" },
  { value: "friendly", label: "Friendly", desc: "Warm & conversational" },
];

const INITIAL: FormData = {
  address: "",
  beds: "",
  baths: "",
  sqft: "",
  price: "",
  propertyType: "Single Family Home",
  highlights: "",
  neighborhood: "",
  tone: "professional",
};

export default function ListingForm({ onResult, onLimitReached }: Props) {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "free_limit_reached") {
          onLimitReached();
          return;
        }
        setError(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      onResult(data.output, form);
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            placeholder="123 Oak Street, Austin, TX 78701"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Type <span className="text-red-500">*</span>
          </label>
          <select
            value={form.propertyType}
            onChange={(e) => set("propertyType", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Neighborhood / Area
          </label>
          <input
            type="text"
            value={form.neighborhood}
            onChange={(e) => set("neighborhood", e.target.value)}
            placeholder="South Congress, Downtown, etc."
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bedrooms <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            required
            min="0"
            max="20"
            value={form.beds}
            onChange={(e) => set("beds", e.target.value)}
            placeholder="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bathrooms <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            required
            min="0"
            max="20"
            step="0.5"
            value={form.baths}
            onChange={(e) => set("baths", e.target.value)}
            placeholder="2.5"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Square Footage
          </label>
          <input
            type="number"
            min="0"
            value={form.sqft}
            onChange={(e) => set("sqft", e.target.value)}
            placeholder="2400"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            List Price ($)
          </label>
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder="450000"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Key Features & Highlights <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={form.highlights}
            onChange={(e) => set("highlights", e.target.value)}
            placeholder="Renovated kitchen with quartz countertops, hardwood floors throughout, large backyard with deck, 2-car garage, new HVAC system, walking distance to top-rated schools..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">
            The more detail you provide, the better the output. List all
            notable features.
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tone <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {TONES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => set("tone", t.value)}
                className={clsx(
                  "border rounded-lg p-3 text-left transition-all",
                  form.tone === t.value
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                )}
              >
                <div className="font-medium text-sm text-gray-900">
                  {t.label}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating your listings...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Listing Descriptions
          </>
        )}
      </button>
    </form>
  );
}
