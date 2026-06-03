import Link from "next/link";
import { Sparkles, Clock, Copy, TrendingUp, CheckCircle, Star, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI-Powered Copy",
    desc: "Claude AI writes professional, compelling descriptions tailored to your property's unique features and your target buyer.",
  },
  {
    icon: Clock,
    title: "Save Hours Every Week",
    desc: "What takes 30–60 minutes now takes 30 seconds. Run more listings, show more properties, close more deals.",
  },
  {
    icon: Copy,
    title: "3 Variations Instantly",
    desc: "Get three distinct descriptions in different styles. Mix, match, or pick your favorite — ready to paste into MLS.",
  },
  {
    icon: TrendingUp,
    title: "More Qualified Showings",
    desc: "Better copy attracts more of the right buyers. Professional descriptions stand out and convert on the MLS.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    title: "Realtor · Austin, TX",
    quote: "I used to spend Sunday nights writing listing copy. Now I do it in 30 seconds before the photos are even back.",
    rating: 5,
  },
  {
    name: "James K.",
    title: "Broker · Dallas, TX",
    quote: "My listings get way more clicks since I started using Listify. The luxury tone is unbelievably good.",
    rating: 5,
  },
  {
    name: "Priya D.",
    title: "Property Manager · Houston, TX",
    quote: "Managing 40+ units, this saves me probably 5–6 hours a month minimum. Worth every penny.",
    rating: 5,
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Enter Property Details",
    desc: "Fill in beds, baths, square footage, key features, and choose your target tone.",
  },
  {
    step: "02",
    title: "AI Writes the Copy",
    desc: "Our AI generates 3 professional listing descriptions in under 10 seconds.",
  },
  {
    step: "03",
    title: "Copy and Paste",
    desc: "Pick your favorite variation and paste it directly into your MLS. Done.",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-cream-50">

      {/* ── Hero ── */}
      <section className="relative bg-navy-900 overflow-hidden">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Brown glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brown-600 opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-navy-600 opacity-20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-navy-800 border border-navy-700 text-brown-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Powered by Claude AI
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
            Write MLS Listings in{" "}
            <span className="text-brown-400">30 Seconds</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-navy-200 max-w-2xl mx-auto leading-relaxed">
            Stop spending hours on listing copy. Listify generates compelling,
            professional real estate descriptions instantly — so you can focus
            on closing deals.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/generate"
              className="group bg-brown-500 hover:bg-brown-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-brown-900/30 w-full sm:w-auto text-center flex items-center justify-center gap-2"
            >
              Try It Free — No Card Needed
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/pricing"
              className="text-navy-200 hover:text-white border border-navy-700 hover:border-navy-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all w-full sm:w-auto text-center"
            >
              See Pricing
            </Link>
          </div>
          <p className="mt-4 text-sm text-navy-400">
            3 free listings per month · No credit card required
          </p>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="border-y border-cream-200 bg-white py-5">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 text-sm text-navy-600 font-medium">
          {[
            "No credit card required",
            "All property types supported",
            "3 tone variations",
            "Results in under 10 seconds",
          ].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-brown-500" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brown-500 text-sm font-bold uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
            Three steps from details to done
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item, i) => (
            <div key={item.step} className="relative">
              {i < HOW_IT_WORKS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-cream-200 -translate-x-4 z-0" />
              )}
              <div className="relative text-center z-10">
                <div className="w-16 h-16 bg-navy-900 text-brown-400 rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-5 shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-navy-900 text-lg mb-2">{item.title}</h3>
                <p className="text-navy-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-navy-900 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brown-400 text-sm font-bold uppercase tracking-widest mb-3">
              Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Built for Busy Agents
            </h2>
            <p className="text-navy-300 mt-2">
              Everything you need. Nothing you don&apos;t.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-navy-800 border border-navy-700 rounded-2xl p-6 hover:border-brown-600 transition-colors group"
              >
                <div className="w-11 h-11 bg-brown-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brown-500/30 transition-colors">
                  <f.icon className="w-5 h-5 text-brown-400" />
                </div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-navy-300 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brown-500 text-sm font-bold uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
            Agents Love It
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brown-400 fill-brown-400" />
                ))}
              </div>
              <p className="text-navy-700 text-sm leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-cream-200 pt-4">
                <div className="font-semibold text-navy-900 text-sm">{t.name}</div>
                <div className="text-navy-400 text-xs mt-0.5">{t.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-navy-900 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Save Hours Every Week?
          </h2>
          <p className="text-navy-300 mb-8 text-lg">
            Start free. No credit card. First 3 listings on us — every month.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 bg-brown-500 hover:bg-brown-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-brown-900/30"
          >
            Generate Your First Listing Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
