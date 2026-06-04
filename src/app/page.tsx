"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Sparkles, Clock, Copy, TrendingUp, ArrowRight, MapPin, Bed, Bath, Maximize2, Star, ShieldCheck } from "lucide-react";

const serif = { fontFamily: "var(--font-playfair, 'Playfair Display', Georgia, serif)" };

const sandGradient = {
  background: "linear-gradient(135deg, #E8D098 0%, #B89858 50%, #D4BC82 100%)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

const ease = [0.21, 0.47, 0.32, 0.98] as const;

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

const STATS = [
  { number: "500+", label: "Active Agents" },
  { number: "30s", label: "Generation Time" },
  { number: "3×", label: "Listing Variations" },
  { number: "4.9", label: "★ Agent Rating" },
];

const FEATURES = [
  { icon: Sparkles, title: "AI-Powered Copy", desc: "Claude AI writes professional, compelling descriptions tailored to your property's unique features and your target buyer." },
  { icon: ShieldCheck, title: "Fair Housing Compliant", desc: "Every description is automatically scanned for Fair Housing Act violations before you see it. Flagged phrases come with plain-English fixes — so you never accidentally put your license at risk." },
  { icon: Clock, title: "Save Hours Every Week", desc: "What takes 30–60 minutes now takes 30 seconds. Run more listings, show more properties, close more deals." },
  { icon: Copy, title: "3 Variations Instantly", desc: "Get three distinct descriptions in different styles. Mix, match, or pick your favorite — ready to paste into MLS." },
  { icon: TrendingUp, title: "More Qualified Showings", desc: "Better copy attracts more of the right buyers. Professional descriptions stand out and convert on the MLS." },
];

const TESTIMONIALS = [
  { name: "Sarah M.", title: "Realtor · Austin, TX", quote: "I used to spend Sunday nights writing listing copy. Now I do it in 30 seconds before the photos are even back.", rating: 5 },
  { name: "James K.", title: "Broker · Dallas, TX", quote: "My listings get way more clicks since I started using Listify. The luxury tone is unbelievably good.", rating: 5 },
  { name: "Priya D.", title: "Property Manager · Houston, TX", quote: "Managing 40+ units, this saves me 5–6 hours a month minimum. Worth every penny.", rating: 5 },
];

const STEPS = [
  { num: "01", title: "Enter Property Details", desc: "Fill in beds, baths, square footage, key features, and choose your tone — professional, luxury, or friendly." },
  { num: "02", title: "AI Writes the Copy", desc: "Claude AI generates 3 complete, professional listing descriptions in under 10 seconds." },
  { num: "03", title: "Copy and Paste", desc: "Pick your favorite variation and paste it directly into your MLS. Done." },
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
      <polygon points="24,57 60,32 96,57" fill="#B89858" />
      <line x1="60" y1="32" x2="60" y2="57" stroke="#D4BC82" strokeWidth="1" opacity="0.4" />
      <rect x="52" y="68" width="16" height="22" rx="2" fill="#070E1C" />
      <circle cx="66" cy="80" r="1.5" fill="#B89858" />
      <rect x="34" y="60" width="14" height="10" rx="1" fill="#E8D5B7" opacity="0.7" />
      <line x1="41" y1="60" x2="41" y2="70" stroke="#152440" strokeWidth="1" />
      <line x1="34" y1="65" x2="48" y2="65" stroke="#152440" strokeWidth="1" />
      <rect x="72" y="60" width="14" height="10" rx="1" fill="#E8D5B7" opacity="0.7" />
      <line x1="79" y1="60" x2="79" y2="70" stroke="#152440" strokeWidth="1" />
      <line x1="72" y1="65" x2="86" y2="65" stroke="#152440" strokeWidth="1" />
      <rect x="70" y="28" width="8" height="14" rx="1" fill="#5C3010" />
      <circle cx="73" cy="24" r="3" fill="white" opacity="0.1" />
    </svg>
  );
}

function ProductMockup() {
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(184,152,88,0.22) 0%, transparent 65%)", transform: "scale(1.15) translateY(8%)", filter: "blur(24px)" }} />

      {/* Floating badges */}
      <motion.div
        className="absolute -top-5 -left-6 z-20 bg-navy-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 px-4 py-3 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="w-8 h-8 bg-green-500/20 rounded-xl flex items-center justify-center">
          <Clock className="w-4 h-4 text-green-400" />
        </div>
        <div>
          <div className="text-xs font-bold text-white">Saved 47 min</div>
          <div className="text-xs text-navy-400">vs. writing manually</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -top-3 -right-5 z-20 backdrop-blur-md text-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-1.5 border border-white/10"
        style={{ background: "rgba(184,152,88,0.85)" }}
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0, duration: 0.6 }}
      >
        <MapPin className="w-3.5 h-3.5" />
        <span className="text-xs font-bold">Austin, TX</span>
      </motion.div>

      {/* Main window */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/[0.08]" style={{ background: "rgba(10, 18, 34, 0.9)", backdropFilter: "blur(20px)" }}>
        <div className="px-4 py-3 flex items-center gap-2 border-b border-white/[0.06]" style={{ background: "rgba(4, 8, 18, 0.6)" }}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <div className="w-3 h-3 rounded-full bg-green-400/60" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-navy-500 text-xs tracking-wide">listify.app / generate</span>
          </div>
        </div>

        <div className="px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
              <HouseSVG className="w-full h-full" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-white text-sm">2847 Willow Creek Dr</div>
              <div className="text-navy-400 text-xs mt-0.5 mb-2">Austin, TX 78704</div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[{ icon: Bed, label: "4 bd" }, { icon: Bath, label: "3 ba" }, { icon: Maximize2, label: "2,840 sqft" }].map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-1 text-navy-300 text-xs px-2 py-0.5 rounded-lg font-medium border border-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <Icon className="w-3 h-3" /> {label}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg font-medium border border-white/10" style={{ background: "rgba(184,152,88,0.12)", color: "#D4BC82" }}>
                  ✦ Luxury
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" style={{ color: "#B89858" }} />
              <span className="text-xs font-semibold text-white uppercase tracking-widest">Generated</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map((n) => (
                <button key={n} className={`text-xs w-6 h-6 rounded-lg font-medium ${n === 1 ? "text-white border border-white/20" : "text-navy-500"}`} style={n === 1 ? { background: "rgba(255,255,255,0.08)" } : {}}>
                  {n}
                </button>
              ))}
            </div>
          </div>
          <p className="text-navy-200 text-xs leading-relaxed line-clamp-5">
            Welcome to this stunning craftsman retreat in one of South Austin&apos;s most coveted neighborhoods.
            Soaring 10-foot ceilings and wide-plank white oak floors set the tone from the moment you enter.
            The chef&apos;s kitchen opens to a sunlit living area perfect for entertaining. The primary suite
            offers a spa bath with freestanding soaking tub and custom built-ins.
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-navy-500">Variation 1 of 3 · Luxury</span>
            <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10" style={{ background: "rgba(184,152,88,0.12)", color: "#D4BC82" }}>
              <Copy className="w-3 h-3" /> Copy
            </button>
          </div>
        </div>

        <div className="px-5 py-2.5 flex items-center gap-2 border-t border-white/[0.04]" style={{ background: "rgba(4,8,18,0.4)" }}>
          <div className="flex gap-1">
            {[0, 150, 300].map((d) => (
              <span key={d} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#B89858", animationDelay: `${d}ms` }} />
            ))}
          </div>
          <span className="text-xs text-navy-500">Generating variation 2...</span>
        </div>
      </div>

      <motion.div
        className="absolute -bottom-4 -right-4 z-20 bg-navy-800/95 backdrop-blur-md text-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2.5 border border-white/10"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <div>
          <div className="text-xs font-bold">MLS Ready</div>
          <div className="text-xs text-navy-400">Paste directly in</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-28 pb-44">
        {/* Animated depth blobs */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(184,152,88,0.10) 0%, transparent 65%)", animation: "blob 12s ease-in-out infinite", filter: "blur(60px)" }} />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(30,52,80,0.35) 0%, transparent 65%)", animation: "blob2 15s ease-in-out infinite", filter: "blur(60px)" }} />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(184,152,88,0.05) 0%, transparent 65%)", animation: "blob 18s ease-in-out infinite reverse", filter: "blur(80px)" }} />
        <div className="absolute bottom-0 inset-x-0 h-48 pointer-events-none" style={{ background: "linear-gradient(to top, #060D18, transparent)" }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
                <div className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full mb-10 tracking-widest uppercase border border-white/10" style={{ background: "rgba(184,152,88,0.08)", color: "#C4A05A" }}>
                  <Sparkles className="w-3 h-3" />
                  Powered by Claude AI
                </div>
              </motion.div>

              <motion.h1
                style={serif}
                className="text-6xl sm:text-7xl lg:text-[80px] font-bold text-white leading-[1.0] tracking-tight"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.1 }}
              >
                Write MLS<br />
                Listings in<br />
                <span style={sandGradient}>30 Seconds.</span>
              </motion.h1>

              <motion.p
                className="mt-7 text-lg text-navy-300 leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.25 }}
              >
                Stop spending hours on listing copy. Listify generates compelling,
                professional descriptions instantly — so you can focus on closing deals.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.38 }}
              >
                <Link
                  href="/generate"
                  className="group flex items-center justify-center gap-2 text-white px-7 py-3.5 rounded-xl font-semibold text-base transition-all text-center"
                  style={{ background: "linear-gradient(135deg, #C4A05A, #8C6828)", boxShadow: "0 8px 32px rgba(184,152,88,0.22)" }}
                >
                  Try Free — No Card Needed
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/pricing"
                  className="flex items-center justify-center text-navy-300 hover:text-white px-7 py-3.5 rounded-xl font-semibold text-base transition-all border border-white/10 hover:border-white/20"
                >
                  See Pricing
                </Link>
              </motion.div>

              <motion.div
                className="mt-8 flex flex-wrap gap-3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-700/40 text-green-300" style={{ background: "rgba(34,197,94,0.08)" }}>
                  <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                  Fair Housing Compliant
                </span>
                {["500+ agents", "4.9 ★ rating", "All MLS formats"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-white/[0.08] text-navy-400" style={{ background: "rgba(255,255,255,0.03)" }}>
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="hidden lg:flex justify-center items-center pt-12 pb-10"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease, delay: 0.3 }}
            >
              <div className="w-full max-w-md">
                <ProductMockup />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 relative">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className={`text-center py-6 ${i > 0 ? "border-l border-white/[0.06]" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="text-4xl sm:text-5xl font-extrabold" style={{ ...serif, ...sandGradient }}>{s.number}</div>
                  <div className="mt-2 text-xs text-navy-400 tracking-wider uppercase">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── How It Works ── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[700px] h-[350px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(184,152,88,0.05) 0%, transparent 70%)", filter: "blur(80px)", animation: "blob2 20s ease-in-out infinite" }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-5" style={{ color: "#B89858" }}>How It Works</p>
            <h2 style={serif} className="text-5xl sm:text-6xl font-bold text-white leading-tight">
              From details<br />to done.
            </h2>
          </FadeUp>

          <div className="space-y-16">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="flex items-start gap-8 md:gap-14"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              >
                <div className="text-[80px] md:text-[100px] font-black leading-none select-none flex-shrink-0 w-20 md:w-28 text-right" style={{ ...serif, color: "rgba(184,152,88,0.09)" }}>
                  {step.num}
                </div>
                <div className="pt-2 flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-navy-300 text-base leading-relaxed max-w-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(184,152,88,0.06) 0%, transparent 60%)", filter: "blur(80px)", animation: "blob 16s ease-in-out infinite" }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <FadeUp className="lg:sticky lg:top-32">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-5" style={{ color: "#B89858" }}>Features</p>
              <h2 style={serif} className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
                Built for<br />Busy Agents
              </h2>
              <p className="text-navy-300 text-lg leading-relaxed mb-10">
                Everything you need to write listing copy faster. Nothing that gets in the way.
              </p>
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                style={{ background: "linear-gradient(135deg, #C4A05A, #8C6828)" }}
              >
                Try It Free <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeUp>

            <div className="space-y-10">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="flex gap-5 group"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-40px" }}
                  transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/10 transition-all group-hover:border-white/25" style={{ background: "rgba(184,152,88,0.08)" }}>
                    <f.icon className="w-5 h-5" style={{ color: "#C4A05A" }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1.5">{f.title}</h3>
                    <p className="text-navy-300 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[900px] h-[400px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(14,28,46,0.5) 0%, transparent 70%)", filter: "blur(100px)" }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-5" style={{ color: "#B89858" }}>Testimonials</p>
            <h2 style={serif} className="text-5xl sm:text-6xl font-bold text-white">Agents Love It</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                className={`rounded-3xl p-8 border border-white/[0.06] ${i === 1 ? "md:mt-8" : ""}`}
                style={{ background: "rgba(10,18,34,0.7)", backdropFilter: "blur(12px)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.12 }}
              >
                <div style={{ ...serif, fontSize: 72, lineHeight: 0.8, marginBottom: 24, color: "#B89858", opacity: 0.45 }}>&ldquo;</div>
                <blockquote className="text-navy-100 leading-relaxed mb-7 text-sm">{t.quote}</blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border border-white/10" style={{ background: "rgba(184,152,88,0.12)", color: "#C4A05A" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-current" style={{ color: "#B89858" }} />
                      ))}
                    </div>
                  </div>
                  <div className="ml-auto text-xs text-navy-500">{t.title.split("·")[1]?.trim()}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[700px] h-[400px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(184,152,88,0.08) 0%, transparent 70%)", filter: "blur(100px)", animation: "blob 14s ease-in-out infinite" }} />
        </div>
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(184,152,88,0.2), transparent)" }} />

        <FadeUp>
          <div className="relative max-w-2xl mx-auto text-center px-4">
            <h2 style={serif} className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
              Ready to reclaim<br />your Sunday nights?
            </h2>
            <p className="text-navy-300 mb-10 text-xl leading-relaxed">
              Start free. No credit card. First 3 listings on us — every month.
            </p>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all"
              style={{ background: "linear-gradient(135deg, #C4A05A, #8C6828)", boxShadow: "0 8px 40px rgba(184,152,88,0.28)" }}
            >
              Generate Your First Listing Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-5 text-sm text-navy-500">No credit card · Cancel anytime</p>
          </div>
        </FadeUp>
      </section>

    </div>
  );
}
