"use client";

import { Suspense } from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Home } from "lucide-react";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Registration failed. Please try again.");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Account created but sign-in failed. Try logging in.");
    } else {
      router.push(redirect);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-navy-100 mb-1">
          Name
        </label>
        <input
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-navy-200 rounded-lg px-4 py-2.5 text-white placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent"
          placeholder="Jane Smith"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-100 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-navy-200 rounded-lg px-4 py-2.5 text-white placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-100 mb-1">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          required
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-navy-200 rounded-lg px-4 py-2.5 text-white placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent"
          placeholder="Min 8 characters"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-navy-900 text-white py-3 rounded-lg font-semibold hover:bg-navy-800 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create Free Account"
        )}
      </button>
    </form>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-brown-500 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L14 6V14H10V10H6V14H2V6L8 1Z" fill="white" /></svg>
            </div>
            <span className="text-xl font-bold text-white">List<span className="text-brown-500">ify</span></span>
          </Link>
        </div>

        <div className="bg-navy-800 rounded-2xl border border-navy-700 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-white mb-1">
            Create your account
          </h1>
          <p className="text-navy-300 text-sm mb-6">
            3 free listings, no credit card required
          </p>

          <Suspense fallback={<div className="h-52 animate-pulse bg-navy-700 rounded-lg" />}>
            <SignupForm />
          </Suspense>
        </div>

        <p className="text-center text-sm text-navy-300 mt-4">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-brown-500 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
