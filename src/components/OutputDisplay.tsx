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

function CopyButton({ text }: { text: string }) {
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
        "flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all",
        copied
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      )}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          Copy
        </>
      )}
    </button>
  );
}

export default function OutputDisplay({ output, onReset }: Props) {
  const descriptions = parseDescriptions(output);

  const labels = ["Option A", "Option B", "Option C"];
  const colors = [
    "border-blue-200 bg-blue-50",
    "border-purple-200 bg-purple-50",
    "border-green-200 bg-green-50",
  ];
  const labelColors = ["text-blue-700", "text-purple-700", "text-green-700"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Your Listing Descriptions
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Pick your favorite or mix and match
          </p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-300 px-3 py-2 rounded-lg transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          New Listing
        </button>
      </div>

      <div className="space-y-4">
        {descriptions.map((desc, i) => (
          <div
            key={i}
            className={clsx(
              "border rounded-xl p-5 transition-all",
              colors[i % colors.length]
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className={clsx(
                  "text-xs font-bold uppercase tracking-wider",
                  labelColors[i % labelColors.length]
                )}
              >
                {labels[i] ?? `Option ${i + 1}`}
              </span>
              <CopyButton text={desc} />
            </div>
            <p className="text-gray-800 leading-relaxed text-sm">{desc}</p>
          </div>
        ))}
      </div>

      <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Copy all 3 descriptions
          </span>
          <CopyButton
            text={descriptions
              .map((d, i) => `${labels[i] ?? `Option ${i + 1}`}:\n${d}`)
              .join("\n\n")}
          />
        </div>
      </div>
    </div>
  );
}
