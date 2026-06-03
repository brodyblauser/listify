import Link from "next/link";
import { Sparkles, Clock, Copy, TrendingUp, CheckCircle, Star, ArrowRight, MapPin, Bed, Bath, Maximize2 } from "lucide-react";

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

function HouseSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Sky gradient area */}
      <rect width="120" height="100" rx="8" fill="#0F2040" />
      {/* Moon */}
      <circle cx="95" cy="18" r="8" fill="#E8D5B7" opacity="0.6" />
      <circle cx="99" cy="15" r="6" fill="#0F2040" />
      {/* Stars */}
      <circle cx="20" cy="15" r="1" fill="white" opacity="0.6" />
      <circle cx="35" cy="8" r="1" fill="white" opacity="0.5" />
      <circle cx="60" cy="12" r="1.5" fill="white" opacity="0.4" />
      <circle cx="75" cy="22" r="1" fill="white" opacity="0.6" />
      {/* Ground */}
      <rect x="0" y="72" width="120" height="28" rx="0" fill="#0A1A33" />
      {/* Trees */}
      <polygon points="10,72 16,50 22,72" fill="#1a3a2a" />
      <polygon points="13,65 16,45 19,65" fill="#1d4530" />
      <polygon points="95,72 101,52 107,72" fill="#1a3a2a" />
      <polygon points="98,65 101,48 104,65" fill="#1d4530" />
      {/* House body */}
      <rect x="30" y="55" width="60" height="35" rx="2" fill="#1E3A5F" />
      {/* Roof */}
      <polygon points="24,57 60,32 96,57" fill="#9E622A" />
      {/* Roof ridge highlight */}
      <line x1="60" y1="32" x2="60" y2="57" stroke="#C4803A" strokeWidth="1" opacity="0.5" />
      {/* Door */}
      <rect x="52" y="68" width="16" height="22" rx="2" fill="#0A1A33" />
      <circle cx="66" cy="80" r="1.5" fill="#9E622A" />
      {/* Windows */}
      <rect x="34" y="60" width="14" height="10" rx="1" fill="#E8D5B7" opacity="0.7" />
      <line x1="41" y1="60" x2="41" y2="70" stroke="#1E3A5F" strokeWidth="1" />
      <line x1="34" y1="65" x2="48" y2="65" stroke="#1E3A5F" strokeWidth="1" />
      <rect x="72" y="60" width="14" height="10" rx="1" fill="#E8D5B7" opacity="0.7" />
      <line x1="79" y1="60" x2="79" y2="70" stroke="#1E3A5F" strokeWidth="1" />
      <line x1="72" y1="65" x2="86" y2="65" stroke="#1E3A5F" strokeWidth="1" />
      {/* Chimney */}
      <rect x="70" y="28" width="8" height="14" rx="1" fill="#7A4B20" />
      {/* Smoke */}
      <circle cx="73" cy="24" r="3" fill="white" opacity="0.12" />
      <circle cx="75" cy="19" r="2.5" fill="white" opacity="0.08" />
      {/* Path */}
      <path d="M52 90 Q60 85 68 90" stroke="#C4803A" strokeWidth="2" fill="none" opacity="0.4" />
      <rect x="57" y="90" width="6" height="10" fill="#1a3060" />
    </svg>
  );
}

function ProductMockup() {
  return (
    <div className="relative">
      {/* Floating stat badge — top left */}
      <div className="absolute -top-4 -left-4 z-20 bg-white rounded-xl shadow-xl border border-cream-200 px-4 py-2.5 flex items-center gap-2.5">
        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Clock className="w-4 h-4 text-green-600" />
        </div>
        <div>
          <div className="text-xs font-bold text-navy-900">Saved 47 min</div>
          <div className="text-xs text-navy-400">vs. writing manually</div>
        </div>
      </div>

      {/* Floating property pin — top right */}
      <div className="absolute -top-3 -right-3 z-20 bg-brown-500 text-white rounded-xl shadow-lg px-3 py-1.5 flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5" />
        <span className="text-xs font-bold">Austin, TX</span>
      </div>

      {/* Main mockup window */}
      <div className="relative bg-white rounded-2xl shadow-2xl shadow-navy-950/40 border border-cream-200 overflow-hidden">
        {/* Window chrome */}
        <div className="bg-navy-900 px-4 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-green-400 opacity-80" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-navy-400 text-xs font-medium">listify.app / generate</span>
          </div>
        </div>

        {/* Property header */}
        <div className="bg-cream-50 border-b border-cream-200 px-5 py-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-cream-200">
              <HouseSVG className="w-full h-full" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-navy-900 text-sm leading-tight">2847 Willow Creek Dr</div>
              <div className="text-navy-400 text-xs mt-0.5 mb-2">Austin, TX 78704</div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 bg-navy-100 text-navy-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  <Bed className="w-3 h-3" /> 4 bd
                </span>
                <span className="inline-flex items-center gap-1 bg-navy-100 text-navy-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  <Bath className="w-3 h-3" /> 3 ba
                </span>
                <span className="inline-flex items-center gap-1 bg-navy-100 text-navy-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  <Maximize2 className="w-3 h-3" /> 2,840 sqft
                </span>
                <span className="inline-flex items-center gap-1 bg-brown-100 text-brown-700 text-xs px-2 py-0.5 rounded-full font-medium capitalize">
                  ✦ Luxury
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Generated content */}
        <div className="px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-brown-500 rounded-md flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-bold text-navy-900 uppercase tracking-wide">Generated Listing</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`text-xs px-2 py-0.5 rounded font-medium ${n === 1 ? "bg-navy-900 text-white" : "text-navy-400 hover:text-navy-700"}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <p className="text-navy-700 text-xs leading-relaxed line-clamp-5">
            Welcome to this stunning craftsman retreat tucked into one of South Austin&apos;s most coveted neighborhoods.
            Soaring 10-foot ceilings and wide-plank white oak floors set the tone from the moment you enter. The
            chef&apos;s kitchen features quartz countertops, a 36&quot; gas range, and a breakfast bar that opens
            to the sunlit living area — perfect for entertaining. The primary suite offers a spa-inspired bath with
            a freestanding soaking tub and a walk-in closet with custom built-ins. Step outside to a covered back
            porch overlooking mature oaks. Minutes from South Congress, top-rated schools, and everything that
            makes Austin irresistible.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-navy-400">Variation 1 of 3 · Luxury tone</span>
            <button className="flex items-center gap-1.5 bg-navy-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-navy-800 transition-colors">
              <Copy className="w-3 h-3" />
              Copy
            </button>
          </div>
        </div>

        {/* Animated typing indicator at bottom */}
        <div className="border-t border-cream-100 bg-cream-50 px-5 py-2.5 flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-brown-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 bg-brown-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 bg-brown-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <span className="text-xs text-navy-400">Generating variation 2...</span>
        </div>
      </div>

      {/* Floating bottom badge — MLS ready */}
      <div className="absolute -bottom-4 -right-2 z-20 bg-navy-900 text-white rounded-xl shadow-xl px-4 py-2.5 flex items-center gap-2.5 border border-navy-700">
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
    <div className="bg-cream-50">

      {/* ── Hero ── */}
      <section className="relative bg-navy-900 overflow-hidden">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brown-600 opacity-[0.07] rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-navy-600 opacity-15 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        {/* Decorative city skyline strip at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-20 opacity-[0.06]">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-full" fill="white">
            <rect x="0" y="40" width="40" height="40" />
            <rect x="10" y="20" width="20" height="60" />
            <rect x="50" y="50" width="30" height="30" />
            <rect x="90" y="30" width="25" height="50" />
            <rect x="100" y="10" width="10" height="70" />
            <rect x="125" y="45" width="35" height="35" />
            <rect x="170" y="25" width="20" height="55" />
            <rect x="200" y="35" width="50" height="45" />
            <rect x="210" y="5" width="15" height="75" />
            <rect x="260" y="50" width="25" height="30" />
            <rect x="295" y="20" width="30" height="60" />
            <rect x="335" y="40" width="20" height="40" />
            <rect x="365" y="15" width="40" height="65" />
            <rect x="375" y="0" width="10" height="80" />
            <rect x="415" y="35" width="35" height="45" />
            <rect x="460" y="25" width="20" height="55" />
            <rect x="490" y="45" width="45" height="35" />
            <rect x="545" y="10" width="25" height="70" />
            <rect x="580" y="30" width="30" height="50" />
            <rect x="620" y="20" width="20" height="60" />
            <rect x="650" y="40" width="50" height="40" />
            <rect x="660" y="5" width="12" height="75" />
            <rect x="710" y="35" width="25" height="45" />
            <rect x="745" y="15" width="20" height="65" />
            <rect x="775" y="50" width="40" height="30" />
            <rect x="825" y="25" width="30" height="55" />
            <rect x="865" y="40" width="20" height="40" />
            <rect x="895" y="10" width="45" height="70" />
            <rect x="905" y="0" width="10" height="80" />
            <rect x="950" y="35" width="30" height="45" />
            <rect x="990" y="20" width="25" height="60" />
            <rect x="1025" y="45" width="35" height="35" />
            <rect x="1070" y="15" width="20" height="65" />
            <rect x="1100" y="30" width="50" height="50" />
            <rect x="1110" y="5" width="15" height="75" />
            <rect x="1160" y="40" width="40" height="40" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-navy-800 border border-navy-700 text-brown-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Powered by Claude AI
              </div>

              <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.05] tracking-tight">
                Write MLS Listings in{" "}
                <span className="text-brown-400">30 Seconds</span>
              </h1>

              <p className="mt-6 text-lg text-navy-200 leading-relaxed max-w-lg">
                Stop spending hours on listing copy. Listify generates compelling,
                professional real estate descriptions instantly — so you can focus
                on closing deals.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/generate"
                  className="group bg-brown-500 hover:bg-brown-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-brown-900/30 text-center flex items-center justify-center gap-2"
                >
                  Try It Free — No Card Needed
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/pricing"
                  className="text-navy-200 hover:text-white border border-navy-700 hover:border-navy-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all text-center"
                >
                  See Pricing
                </Link>
              </div>

              <p className="mt-4 text-sm text-navy-400">
                3 free listings per month · No credit card required
              </p>

              {/* Mini trust row */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {["500+ agents", "4.9 ★ rating", "All MLS formats"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5 text-sm text-navy-300">
                    <CheckCircle className="w-4 h-4 text-brown-400 flex-shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Product mockup */}
            <div className="hidden lg:flex justify-center items-center pt-8 pb-6">
              <div className="w-full max-w-md">
                <ProductMockup />
              </div>
            </div>
          </div>
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
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brown-600 opacity-[0.08] rounded-full blur-3xl" />
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
