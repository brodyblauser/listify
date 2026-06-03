"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import clsx from "clsx";

type Props = {
  output: string;
  onReset: () => void;
};

function parseDescriptions(raw: string): string[] {
  const parts = raw.split(/\n\n(?=\d+\.)/).filter(Boolean);
  return parts.map((p) => p.replace(/^\d+\.\s*/, "").trim());
}

function CopyButton({ text, light = false }: { text: string; light?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={clsx(
        "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all font-medium",
        copied
          ? "bg-green-100 text-green-700"
          : light
          ? "bg-navy-800 text-navy-200 hover:bg-navy-700"
          : "bg-navy-100 text-navy-600 hover:bg-navy-200"
      )}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

const VARIANTS = [
  { label: "Option A", bg: "bg-navy-900", border: "border-navy-800", text: "text-navy-200", badge: "text-brown-400 bg-navy-800" },
  { label: "Option B", bg: "bg-white", border: "border-cream-200", text: "text-navy-700", badge: "text-brown-600 bg-brown-50" },
  { label: "Option C", bg: "bg-white", border: "border-cream-200", text: "text-navy-700", badge: "text-brown-600 bg-brown-50" },
];

export default function OutputDisplay({ output, onReset }: Props) {
  const descriptions = parseDescriptions(output);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy-900">Your Listing Descriptions</h2>
          <p className="text-sm text-navy-400 mt-0.5">Pick your favorite or mix and match</p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-sm text-navy-500 hover:text-navy-800 border border-navy-200 hover:border-navy-400 px-3 py-2 rounded-lg transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          New Listing
        </button>
      </div>

      <div className="space-y-4">
        {descriptions.map((desc, i) => {
          const v = VARIANTS[i % VARIANTS.length];
          const isNavy = i === 0;
          return (
            <div
              key={i}
              className={clsx("border rounded-2xl p-5 transition-all", v.bg, v.border)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={clsx("text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full", v.badge)}>
                  {v.label}
                </span>
                <CopyButton text={desc} light={isNavy} />
              </div>
              <p className={clsx("leading-relaxed text-sm", v.text)}>{desc}</p>
            </div>
          );
        })}
      </div>

      <div className="border border-cream-200 rounded-xl p-4 bg-white flex items-center justify-between">
        <span className="text-sm font-medium text-navy-600">Copy all 3 descriptions</span>
        <CopyButton
          text={descriptions
            .map((d, i) => `${VARIANTS[i % VARIANTS.length].label}:\n${d}`)
            .join("\n\n")}
        />
      </div>
    </div>
  );
}
