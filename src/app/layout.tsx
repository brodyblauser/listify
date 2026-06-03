import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Listify — AI MLS Listing Description Generator",
    template: "%s | Listify",
  },
  description:
    "Generate professional MLS listing descriptions in 30 seconds using AI. Built for real estate agents. Free to try — no credit card required.",
  keywords: [
    "MLS listing description generator",
    "real estate AI tool",
    "listing copywriter",
    "real estate agent tools",
    "automated listing descriptions",
    "AI real estate",
  ],
  authors: [{ name: "Listify" }],
  openGraph: {
    title: "Listify — AI MLS Listing Description Generator",
    description:
      "Generate professional MLS listing descriptions in 30 seconds. Free to try.",
    type: "website",
    siteName: "Listify",
  },
  twitter: {
    card: "summary_large_image",
    title: "Listify — AI MLS Listing Description Generator",
    description:
      "Generate professional MLS listing descriptions in 30 seconds. Free to try.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream-50 text-navy-900">
        <SessionProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <footer className="bg-navy-950 py-10 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-brown-500 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1L14 6V14H10V10H6V14H2V6L8 1Z" fill="white" />
                  </svg>
                </div>
                <span className="text-sm text-navy-300">
                  © {new Date().getFullYear()} Listify — Built for real estate professionals.
                </span>
              </div>
              <div className="flex gap-6 text-sm text-navy-400">
                <a href="/pricing" className="hover:text-navy-200 transition-colors">Pricing</a>
                <a href="/generate" className="hover:text-navy-200 transition-colors">Try for Free</a>
                <a href="/auth/signup" className="hover:text-navy-200 transition-colors">Sign Up</a>
              </div>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
