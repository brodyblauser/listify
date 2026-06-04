"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, ShieldCheck, ShieldAlert, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";
import type { ComplianceResult } from "@/lib/fairHousing";

type Props = {
  output: string;
  compliance?: ComplianceResult;
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
          : "bg-navy-100 text-navy-200 hover:bg-navy-200"
      )}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function CompliancePanel({ compliance }: { compliance: ComplianceResult }) {
  const [expanded, setExpanded] = useState(!compliance.passed);
  const hasErrors = compliance.violations.some((v) => v.severity === "error");

  if (compliance.passed) {
    return (
      <div className="flex items-center gap-2.5 bg-green-950/60 border border-green-800/50 rounded-xl px-4 py-3">
        <ShieldCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
        <span className="text-sm font-semibold text-green-300">Fair Housing Compliant</span>
        <span className="text-xs text-green-500 ml-auto">No violations detected</span>
      </div>
    );
  }

  return (
    <div className={clsx(
      "border rounded-xl overflow-hidden",
      hasErrors ? "border-red-800/50 bg-red-950/40" : "border-amber-800/50 bg-amber-950/30"
    )}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2.5 px-4 py-3 text-left"
      >
        {hasErrors
          ? <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
          : <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
        }
        <span className={clsx("text-sm font-semibold", hasErrors ? "text-red-300" : "text-amber-300")}>
          Fair Housing {hasErrors ? "Violation" : "Warning"} Detected
        </span>
        <span className={clsx("text-xs ml-1", hasErrors ? "text-red-500" : "text-amber-500")}>
          {compliance.violations.length} issue{compliance.violations.length !== 1 ? "s" : ""}
        </span>
        <span className="ml-auto text-navy-400">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {expanded && (
        <div className="border-t border-white/5 px-4 py-3 space-y-3">
          {compliance.violations.map((v, i) => (
            <div key={i} className="flex gap-3">
              <div className={clsx(
                "mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0",
                v.severity === "error" ? "bg-red-400" : "bg-amber-400"
              )} style={{ marginTop: "6px" }} />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={clsx(
                    "text-xs font-bold uppercase tracking-wide",
                    v.severity === "error" ? "text-red-400" : "text-amber-400"
                  )}>
                    {v.category}
                  </span>
                  <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded text-white/70">
                    &quot;{v.phrase}&quot;
                  </code>
                </div>
                <p className="text-xs text-navy-300 mt-1">{v.suggestion}</p>
              </div>
            </div>
          ))}
          <p className="text-xs text-navy-400 border-t border-white/5 pt-3 mt-2">
            Review and edit the text before using in an MLS listing.
          </p>
        </div>
      )}
    </div>
  );
}

const VARIANTS = [
  { label: "Option A", bg: "bg-navy-900", border: "border-navy-800", text: "text-navy-200", badge: "text-brown-400 bg-navy-800" },
  { label: "Option B", bg: "bg-navy-800", border: "border-navy-700", text: "text-navy-100", badge: "text-brown-600 bg-brown-50" },
  { label: "Option C", bg: "bg-navy-800", border: "border-navy-700", text: "text-navy-100", badge: "text-brown-600 bg-brown-50" },
];

export default function OutputDisplay({ output, compliance, onReset }: Props) {
  const descriptions = parseDescriptions(output);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Your Listing Descriptions</h2>
          <p className="text-sm text-navy-400 mt-0.5">Pick your favorite or mix and match</p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-sm text-navy-300 hover:text-navy-800 border border-navy-200 hover:border-navy-400 px-3 py-2 rounded-lg transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          New Listing
        </button>
      </div>

      {compliance && <CompliancePanel compliance={compliance} />}

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

      <div className="border border-navy-700 rounded-xl p-4 bg-navy-800 flex items-center justify-between">
        <span className="text-sm font-medium text-navy-200">Copy all 3 descriptions</span>
        <CopyButton
          text={descriptions
            .map((d, i) => `${VARIANTS[i % VARIANTS.length].label}:\n${d}`)
            .join("\n\n")}
        />
      </div>
    </div>
  );
}
