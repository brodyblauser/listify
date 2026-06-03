import Link from "next/link";
import { Sparkles, Clock, Copy, TrendingUp, CheckCircle, Star, ArrowRight, MapPin, Bed, Bath, Maximize2 } from "lucide-react";

const STATS = [
  { number: "500+", label: "Active Agents" },
  { number: "30s", label: "Avg. Generation Time" },
  { number: "3×", label: "Listing Variations" },
  { number: "4.9★", label: "Agent Rating" },
];

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

const STEPS = [
  {
    num: "01",
    title: "Enter Property Details",
    desc: "Fill in beds, baths, square footage, key features, and choose your target tone — professional, luxury, or friendly.",
  },
  {
    num: "02",
    title: "AI Writes the Copy",
    desc: "Claude AI generates 3 complete, professional listing descriptions in under 10 seconds.",
  },
  {
    num: "03",
    title: "Copy and Paste",
    desc: "Pick your favorite variation and paste it directly into your MLS. Done.",
  },
];

function HouseSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="120" height="100" rx="8" fill="#0A1528" />
      <circle cx="95" cy="18" r="8" fill="#E8D5B7" opacity="0.6" />
      <circle cx="99" cy="15" r="6" fill="#0A1528" />
      <circle cx="20" cy="15" r="1" fill="white" opacity="0.6" />
      <circle cx="35" cy="8" r="1" fill="white" opacity="0.5" />
      <circle cx="60" cy="12" r="1.5" fill="white" opacity="0.4" />
      <circle cx="75" cy="22" r="1" fill="white" opacity="0.6" />
      <rect x="0" y="72" width="120" height="28" fill="#070E1C" />
      <polygon points="10,72 16,50 22,72" fill="#162A1E" />
      <polygon points="13,65 16,45 19,65" fill="#1A3525" />
      <polygon points="95,72 101,52 107,72" fill="#162A1E" />
      <polygon points="98,65 101,48 104,65" fill="#1A3525" />
      <rect x="30" y="55" width="60" height="35" rx="2" fill="#152440" />
      <polygon points="24,57 60,32 96,57" fill="#7A4418" />
      <line x1="60" y1="32" x2="60" y2="57" stroke="#9A5C28" strokeWidth="1" opacity="0.5" />
      <rect x="52" y="68" width="16" height="22" rx="2" fill="#070E1C" />
      <circle cx="66" cy="80" r="1.5" fill="#7A4418" />
      <rect x="34" y="60" width="14" height="10" rx="1" fill="#E8D5B7" opacity="0.7" />
      <line x1="41" y1="60" x2="41" y2="70" stroke="#152440" strokeWidth="1" />
      <line x1="34" y1="65" x2="48" y2="65" stroke="#152440" strokeWidth="1" />
      <rect x="72" y="60" width="14" height="10" rx="1" fill="#E8D5B7" opacity="0.7" />
      <line x1="79" y1="60" x2="79" y2="70" stroke="#152440" strokeWidth="1" />
      <line x1="72" y1="65" x2="86" y2="65" stroke="#152440" strokeWidth="1" />
      <rect x="70" y="28" width="8" height="14" rx="1" fill="#5C3010" />
      <circle cx="73" cy="24" r="3" fill="white" opacity="0.12" />
      <circle cx="75" cy="19" r="2.5" fill="white" opacity="0.08" />
    </svg>
  );
}

function ProductMockup() {
  return (
    <div className="relative">
      <div className="absolute -top-4 -left-6 z-20 bg-navy-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-navy-700/60 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Clock className="w-4 h-4 text-green-400" />
        </div>
        <div>
          <div className="text-xs font-bold text-white">Saved 47 min</div>
          <div className="text-xs text-navy-400">vs. writing manually</div>
        </div>
      </div>

      <div className="absolute -top-3 -right-4 z-20 bg-brown-500/90 backdrop-blur-sm text-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5" />
        <span className="text-xs font-bold">Austin, TX</span>
      </div>

      <div className="relative bg-navy-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-navy-700/50 overflow-hidden">
        <div className="bg-navy-900/80 px-4 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
            <div className="w-3 h-3 rounded-full bg-green-400/70" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-navy-400 text-xs">listify.app / generate</span>
          </div>
        </div>

        <div className="bg-navy-900/60 border-b border-navy-700/50 px-5 py-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-navy-700/50">
              <HouseSVG className="w-full h-full" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-white text-sm leading-tight">2847 Willow Creek Dr</div>
              <div className="text-navy-400 text-xs mt-0.5 mb-2">Austin, TX 78704</div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { icon: Bed, label: "4 bd" },
                  { icon: Bath, label: "3 ba" },
                  { icon: Maximize2, label: "2,840 sqft" },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-1 bg-navy-700/60 text-navy-200 text-xs px-2 py-0.5 rounded-lg font-medium">
                    <Icon className="w-3 h-3" /> {label}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1 bg-brown-500/20 text-brown-300 text-xs px-2 py-0.5 rounded-lg font-medium">
                  ✦ Luxury
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-brown-500 rounded-md flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wide">Generated Listing</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map((n) => (
                <button key={n} className={`text-xs px-2 py-0.5 rounded font-medium ${n === 1 ? "bg-navy-700 text-white" : "text-navy-500"}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          <p className="text-navy-200 text-xs leading-relaxed line-clamp-5">
            Welcome to this stunning craftsman retreat tucked into one of South Austin&apos;s most coveted
            neighborhoods. Soaring 10-foot ceilings and wide-plank white oak floors set the tone from the
            moment you enter. The chef&apos;s kitchen features quartz countertops, a 36&quot; gas range,
            and a breakfast bar that opens to the sunlit living area — perfect for entertaining. The primary
            suite offers a spa-inspired bath with a freestanding soaking tub and custom built-ins.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-navy-500">Variation 1 of 3 · Luxury tone</span>
            <button className="flex items-center gap-1.5 bg-brown-500/20 text-brown-300 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-brown-500/30 transition-colors">
              <Copy className="w-3 h-3" /> Copy
            </button>
          </div>
        </div>

        <div className="border-t border-navy-700/40 bg-navy-900/40 px-5 py-2.5 flex items-center gap-2">
          <div className="flex gap-1">
            {[0, 150, 300].map((delay) => (
              <span key={delay} className="w-1.5 h-1.5 bg-brown-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
            ))}
          </div>
          <span className="text-xs text-navy-500">Generating variation 2...</span>
        </div>
      </div>

      <div className="absolute -bottom-4 -right-3 z-20 bg-navy-800/90 backdrop-blur-sm text-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2.5 border border-navy-700/60">
        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
        <div>
          <div className="text-xs font-bold">MLS Ready</div>
          <div className="text-xs text-navy-400">Paste directly in</div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-48">
        {/* Organic glows — no grid, no lines */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-brown-600 opacity-[0.06] rounded-full blur-[120px] translate-x-1/2 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-navy-500 opacity-[0.08] rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />
        {/* Gradient fade downward into next section */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#060D18] to-transparent pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brown-500/10 border border-brown-500/20 text-brown-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Powered by Claude AI
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.0] tracking-tight">
                MLS Listings<br />
                in{" "}
                <span className="text-brown-400">30 Seconds</span>
              </h1>

              <p className="mt-6 text-lg text-navy-300 leading-relaxed max-w-lg">
                Stop spending hours on listing copy. Listify generates compelling,
                professional real estate descriptions instantly — so you can focus
                on closing deals.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/generate"
                  className="group bg-brown-500 hover:bg-brown-400 text-white px-7 py-3.5 rounded-xl font-bold text-base transition-all shadow-lg shadow-brown-900/20 text-center flex items-center justify-center gap-2"
                >
                  Try Free — No Card Needed
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/pricing"
                  className="text-navy-300 hover:text-white px-7 py-3.5 rounded-xl font-semibold text-base transition-all text-center border border-navy-700 hover:border-navy-500"
                >
                  See Pricing
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
                {["500+ agents", "4.9 ★ rating", "All MLS formats"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5 text-sm text-navy-400">
                    <CheckCircle className="w-3.5 h-3.5 text-brown-500 flex-shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: mockup */}
            <div className="hidden lg:flex justify-center items-center pt-10 pb-8">
              <div className="w-full max-w-md">
                <ProductMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── floating in space, no bar */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{s.number}</div>
                <div className="mt-1.5 text-sm text-navy-400 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── large numbered, flowing */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[400px] bg-brown-600 opacity-[0.04] rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <p className="text-brown-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">How It Works</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              From details to done<br />in seconds.
            </h2>
          </div>

          <div className="space-y-20">
            {STEPS.map((step, i) => (
              <div key={step.num} className="flex items-start gap-8 md:gap-16">
                <div
                  className="text-[88px] md:text-[112px] font-black leading-none select-none flex-shrink-0 w-24 md:w-32 text-right"
                  style={{ color: "rgba(255,255,255,0.04)" }}
                >
                  {step.num}
                </div>
                <div className="pt-2 md:pt-4 flex-1">
                  <div className="w-7 h-7 bg-brown-500/20 rounded-full flex items-center justify-center mb-4">
                    <div className="w-2 h-2 bg-brown-400 rounded-full" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-navy-300 text-lg leading-relaxed max-w-md">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── 2-col, left sticky header + right list */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] bg-brown-600 opacity-[0.05] rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — sticky header */}
            <div className="lg:sticky lg:top-32">
              <p className="text-brown-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">Features</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
                Built for<br />Busy Agents
              </h2>
              <p className="text-navy-300 text-lg leading-relaxed mb-8">
                Everything you need to write listing copy faster. Nothing that gets in the way.
              </p>
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 bg-brown-500 hover:bg-brown-400 text-white px-6 py-3 rounded-xl font-bold transition-all"
              >
                Try It Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right — feature list */}
            <div className="space-y-10">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex gap-5 group">
                  <div className="w-10 h-10 bg-brown-500/15 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brown-500/25 transition-colors mt-0.5">
                    <f.icon className="w-5 h-5 text-brown-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1.5">{f.title}</h3>
                    <p className="text-navy-300 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── staggered */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[900px] h-[400px] bg-navy-500 opacity-[0.06] rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-brown-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">Testimonials</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white">Agents Love It</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className={`bg-navy-800/50 backdrop-blur-sm rounded-2xl p-7 border border-navy-700/40 ${i === 1 ? "md:mt-8" : ""}`}
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-brown-400 fill-brown-400" />
                  ))}
                </div>
                <blockquote className="text-navy-100 leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-navy-400 text-xs mt-0.5">{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── clean, gradient, no texture */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[400px] bg-brown-600 opacity-[0.08] rounded-full blur-[100px]" />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-navy-700 to-transparent" />

        <div className="relative max-w-2xl mx-auto text-center px-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            Ready to reclaim your<br />Sunday nights?
          </h2>
          <p className="text-navy-300 mb-10 text-xl leading-relaxed">
            Start free. No credit card. First 3 listings on us — every month.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 bg-brown-500 hover:bg-brown-400 text-white px-9 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-brown-900/20"
          >
            Generate Your First Listing Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-5 text-sm text-navy-500">No credit card · Cancel anytime</p>
        </div>
      </section>

    </div>
  );
}
