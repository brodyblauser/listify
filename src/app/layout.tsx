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
  title: "Listify — AI Real Estate Listing Generator",
  description:
    "Generate compelling MLS listing descriptions in seconds using AI. Save hours every week.",
  openGraph: {
    title: "Listify — AI Real Estate Listing Generator",
    description:
      "Generate compelling MLS listing descriptions in seconds using AI.",
    type: "website",
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
