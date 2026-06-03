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

const inputClass =
  "w-full border border-navy-200 bg-navy-800 rounded-lg px-4 py-2.5 text-white placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent transition-all text-sm";

const labelClass = "block text-sm font-semibold text-navy-100 mb-1";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="md:col-span-2">
          <label className={labelClass}>
            Property Address <span className="text-brown-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            placeholder="123 Oak Street, Austin, TX 78701"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Property Type <span className="text-brown-500">*</span>
          </label>
          <select
            value={form.propertyType}
            onChange={(e) => set("propertyType", e.target.value)}
            className={inputClass}
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Neighborhood / Area</label>
          <input
            type="text"
            value={form.neighborhood}
            onChange={(e) => set("neighborhood", e.target.value)}
            placeholder="South Congress, Downtown…"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Bedrooms <span className="text-brown-500">*</span>
          </label>
          <input
            type="number"
            required
            min="0"
            max="20"
            value={form.beds}
            onChange={(e) => set("beds", e.target.value)}
            placeholder="4"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Bathrooms <span className="text-brown-500">*</span>
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
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Square Footage</label>
          <input
            type="number"
            min="0"
            value={form.sqft}
            onChange={(e) => set("sqft", e.target.value)}
            placeholder="2,400"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>List Price ($)</label>
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder="450,000"
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>
            Key Features & Highlights <span className="text-brown-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={form.highlights}
            onChange={(e) => set("highlights", e.target.value)}
            placeholder="Renovated kitchen with quartz countertops, hardwood floors throughout, large backyard with deck, 2-car garage, new HVAC system, walking distance to top-rated schools…"
            className={clsx(inputClass, "resize-none")}
          />
          <p className="text-xs text-navy-400 mt-1.5">
            More detail = better output. List every notable feature.
          </p>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>
            Tone <span className="text-brown-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {TONES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => set("tone", t.value)}
                className={clsx(
                  "border rounded-xl p-3 text-left transition-all",
                  form.tone === t.value
                    ? "border-brown-500 bg-brown-50 ring-2 ring-brown-200"
                    : "border-navy-200 hover:border-navy-300 bg-navy-800"
                )}
              >
                <div className={clsx(
                  "font-semibold text-sm",
                  form.tone === t.value ? "text-brown-700" : "text-navy-800"
                )}>
                  {t.label}
                </div>
                <div className={clsx(
                  "text-xs mt-0.5",
                  form.tone === t.value ? "text-brown-500" : "text-navy-400"
                )}>
                  {t.desc}
                </div>
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
        className="w-full bg-navy-900 hover:bg-navy-800 text-white py-3.5 rounded-xl font-bold hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating your listings…
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 text-brown-400" />
            Generate Listing Descriptions
          </>
        )}
      </button>
    </form>
  );
}
