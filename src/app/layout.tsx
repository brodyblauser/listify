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
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <SessionProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <footer className="border-t border-gray-200 bg-white py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Listify. Built for real estate
                professionals.
              </p>
              <div className="flex gap-6 text-sm text-gray-500">
                <a href="/pricing" className="hover:text-gray-700">
                  Pricing
                </a>
                <a href="/generate" className="hover:text-gray-700">
                  Try for Free
                </a>
              </div>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
