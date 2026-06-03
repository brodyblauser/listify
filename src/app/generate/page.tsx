"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ListingForm from "@/components/ListingForm";
import OutputDisplay from "@/components/OutputDisplay";
import { Lock } from "lucide-react";

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

export default function GeneratePage() {
  const { data: session } = useSession();
  const [output, setOutput] = useState<string | null>(null);
  const [savedForm, setSavedForm] = useState<FormData | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleResult = (result: string, formData: FormData) => {
    setOutput(result);
    setSavedForm(formData);
  };

  const handleReset = () => {
    setOutput(null);
    setSavedForm(null);
  };

  if (showUpgrade) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Free Limit Reached
          </h2>
          <p className="text-gray-500 mb-8">
            You&apos;ve used your 3 free listings. Upgrade to Pro for unlimited
            generations, all property types, and saved history.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/pricing"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Upgrade to Pro — $29/mo
            </Link>
            <button
              onClick={() => setShowUpgrade(false)}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Generate Listing Descriptions
          </h1>
          <p className="text-gray-500 mt-2">
            Fill in the property details and let AI do the writing
          </p>
          {!session && (
            <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mt-4 inline-block">
              You have <strong>3 free generations</strong>.{" "}
              <Link href="/auth/signup" className="underline font-semibold">
                Sign up free
              </Link>{" "}
              to save your history.
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {output ? (
            <OutputDisplay output={output} onReset={handleReset} />
          ) : (
            <ListingForm
              onResult={handleResult}
              onLimitReached={() => setShowUpgrade(true)}
            />
          )}
        </div>

        {output && savedForm && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Not happy with these?{" "}
              <button
                onClick={handleReset}
                className="text-blue-600 hover:underline"
              >
                Regenerate with different details
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
