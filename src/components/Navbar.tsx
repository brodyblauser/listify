"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/70 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-brown-500 flex items-center justify-center shadow-sm">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14 6V14H10V10H6V14H2V6L8 1Z" fill="white" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              List<span className="text-brown-400">ify</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/generate"
              className="text-navy-200 hover:text-white hover:bg-navy-800 px-3 py-2 rounded-lg text-sm font-medium transition-all"
            >
              Generate
            </Link>
            <Link
              href="/pricing"
              className="text-navy-200 hover:text-white hover:bg-navy-800 px-3 py-2 rounded-lg text-sm font-medium transition-all"
            >
              Pricing
            </Link>
            {session ? (
              <>
                <Link
                  href="/listings"
                  className="text-navy-200 hover:text-white hover:bg-navy-800 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  My Listings
                </Link>
                <Link
                  href="/dashboard"
                  className="text-navy-200 hover:text-white hover:bg-navy-800 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-navy-300 hover:text-white hover:bg-navy-800 px-3 py-2 rounded-lg text-sm font-medium transition-all ml-1"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-navy-200 hover:text-white hover:bg-navy-800 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="ml-2 bg-brown-500 hover:bg-brown-400 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-navy-200 hover:text-white p-1"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-900 border-t border-navy-800 px-4 py-4 flex flex-col gap-1">
          <Link
            href="/generate"
            className="text-navy-200 hover:text-white hover:bg-navy-800 px-3 py-2.5 rounded-lg text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Generate
          </Link>
          <Link
            href="/pricing"
            className="text-navy-200 hover:text-white hover:bg-navy-800 px-3 py-2.5 rounded-lg text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Pricing
          </Link>
          {session ? (
            <>
              <Link
                href="/listings"
                className="text-navy-200 hover:text-white hover:bg-navy-800 px-3 py-2.5 rounded-lg text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                My Listings
              </Link>
              <Link
                href="/dashboard"
                className="text-navy-200 hover:text-white hover:bg-navy-800 px-3 py-2.5 rounded-lg text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }}
                className="text-left text-navy-300 hover:text-white px-3 py-2.5 rounded-lg text-sm font-medium"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-navy-200 hover:text-white hover:bg-navy-800 px-3 py-2.5 rounded-lg text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="mt-1 bg-brown-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold text-center"
                onClick={() => setOpen(false)}
              >
                Get Started Free
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
