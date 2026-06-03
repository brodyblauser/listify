"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ListingForm from "@/components/ListingForm";
import OutputDisplay from "@/components/OutputDisplay";
import { Lock, Sparkles } from "lucide-react";

type FormData = {
  address: string; beds: string; baths: string; sqft: string; price: string;
  propertyType: string; highlights: string; neighborhood: string; tone: string;
};

export default function GeneratePage() {
  const { data: session } = useSession();
  const [output, setOutput] = useState<string | null>(null);
  const [savedForm, setSavedForm] = useState<FormData | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleResult = (result: string, formData: FormData) => {
    setOutput(result);
    setSavedForm(formData);
  };

  const handleReset = () => { setOutput(null); setSavedForm(null); };

  if (showUpgrade) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-brown-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-brown-600" />
          </div>
          <h2 className="text-2xl font-bold text-navy-900 mb-3">Free Limit Reached</h2>
          <p className="text-navy-500 mb-8 leading-relaxed">
            You&apos;ve used your 3 free listings this month. Upgrade to Pro for unlimited
            generations, saved history, and all tone variations.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/pricing"
              className="bg-navy-900 hover:bg-navy-800 text-white px-6 py-3.5 rounded-xl font-bold transition-all"
            >
              Upgrade to Pro — $29/mo
            </Link>
            <button onClick={() => setShowUpgrade(false)} className="text-navy-400 hover:text-navy-600 text-sm">
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-navy-100 text-navy-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brown-500" />
            AI Listing Generator
          </div>
          <h1 className="text-3xl font-bold text-navy-900">Generate Listing Descriptions</h1>
          <p className="text-navy-400 mt-2">Fill in the property details and let AI do the writing</p>
          {!session && (
            <p className="text-sm text-brown-700 bg-brown-50 border border-brown-200 rounded-lg px-4 py-2 mt-4 inline-block">
              You have <strong>3 free generations</strong> per month.{" "}
              <Link href="/auth/signup" className="underline font-semibold">Sign up free</Link> to save your history.
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-cream-200 p-6 sm:p-8">
          {output ? (
            <OutputDisplay output={output} onReset={handleReset} />
          ) : (
            <ListingForm onResult={handleResult} onLimitReached={() => setShowUpgrade(true)} />
          )}
        </div>

        {output && savedForm && (
          <p className="text-center text-sm text-navy-400 mt-5">
            Not happy with these?{" "}
            <button onClick={handleReset} className="text-brown-500 hover:underline">
              Regenerate with different details
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
