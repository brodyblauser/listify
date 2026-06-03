import Link from "next/link";
import {
  Sparkles,
  Clock,
  Copy,
  TrendingUp,
  CheckCircle,
  Star,
} from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI-Powered Copy",
    desc: "Claude AI writes professional, compelling descriptions tailored to your property's unique features.",
  },
  {
    icon: Clock,
    title: "Save Hours Every Week",
    desc: "What takes 30-60 minutes now takes 30 seconds. Run more listings, close more deals.",
  },
  {
    icon: Copy,
    title: "3 Variations Instantly",
    desc: "Get three distinct descriptions in different styles. Mix, match, or pick your favorite.",
  },
  {
    icon: TrendingUp,
    title: "More Showings",
    desc: "Better copy attracts more qualified buyers. Professional descriptions stand out on the MLS.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    title: "Realtor, Austin TX",
    quote:
      "I used to spend Sunday nights writing listing copy. Now I do it in 30 seconds before the photos are even back.",
    rating: 5,
  },
  {
    name: "James K.",
    title: "Broker, Dallas TX",
    quote:
      "My listings get way more clicks since I started using Listify. The luxury tone is unbelievably good.",
    rating: 5,
  },
  {
    name: "Priya D.",
    title: "Property Manager, Houston TX",
    quote:
      "Managing 40+ units, this saves me probably 5-6 hours a month minimum. Worth every penny.",
    rating: 5,
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Enter Property Details",
    desc: "Fill in beds, baths, square footage, key features, and your target tone.",
  },
  {
    step: "2",
    title: "AI Writes the Copy",
    desc: "Our AI generates 3 professional listing descriptions in under 10 seconds.",
  },
  {
    step: "3",
    title: "Copy and Paste",
    desc: "Pick your favorite variation and paste it directly into your MLS. Done.",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            Powered by Claude AI
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Write MLS Listings in{" "}
            <span className="text-blue-600">30 Seconds</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Stop spending hours on listing copy. Listify generates compelling,
            professional real estate descriptions instantly — so you can focus
            on closing deals.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/generate"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 w-full sm:w-auto text-center"
            >
              Try It Free — No Card Needed
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors w-full sm:w-auto text-center border border-gray-200"
            >
              See Pricing
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            3 free listings. No credit card required.
          </p>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-gray-100 bg-gray-50 py-5">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-green-500" />
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Works for all property types
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-green-500" />
            3 tone options
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Results in under 10 seconds
          </span>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="text-gray-500 mt-2">Three steps from details to done</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">
              Built for Busy Agents
            </h2>
            <p className="text-gray-500 mt-2">
              Everything you need, nothing you don&apos;t
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">
            Agents Love It
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-gray-900 text-sm">
                  {t.name}
                </div>
                <div className="text-gray-400 text-xs">{t.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Save Hours Every Week?
        </h2>
        <p className="text-blue-100 mb-8 text-lg">
          Start free. No credit card. First 3 listings on us.
        </p>
        <Link
          href="/generate"
          className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors inline-block"
        >
          Generate Your First Listing Free
        </Link>
      </section>
    </div>
  );
}
