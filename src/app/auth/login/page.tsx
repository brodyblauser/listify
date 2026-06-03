"use client";

import { Suspense } from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Home } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push(redirect);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-navy-700 mb-1">
          Email
        </label>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-navy-200 rounded-lg px-4 py-2.5 text-navy-900 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-navy-700">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-brown-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-navy-200 rounded-lg px-4 py-2.5 text-navy-900 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent"
          placeholder="••••••••"
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
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-brown-500 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L14 6V14H10V10H6V14H2V6L8 1Z" fill="white" /></svg>
            </div>
            <span className="text-xl font-bold text-navy-900">List<span className="text-brown-500">ify</span></span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-navy-900 mb-1">
            Welcome back
          </h1>
          <p className="text-navy-500 text-sm mb-6">Sign in to your account</p>

          <Suspense fallback={<div className="h-40 animate-pulse bg-gray-100 rounded-lg" />}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-sm text-navy-500 mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-brown-500 font-semibold hover:underline"
          >
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
