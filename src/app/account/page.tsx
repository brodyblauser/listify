"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Lock, Crown, Check, Loader2, ArrowRight } from "lucide-react";
import clsx from "clsx";

const inputClass = "w-full bg-navy-700 border border-navy-600 rounded-xl px-4 py-2.5 text-white placeholder-navy-500 text-sm focus:outline-none focus:ring-2 focus:ring-brown-500/40 focus:border-brown-500/60 transition-all";
const labelClass = "block text-sm font-semibold text-navy-300 mb-1.5";

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-navy-800 border border-navy-700 rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center">
          <Icon className="w-4 h-4 text-brown-400" />
        </div>
        <h2 className="text-base font-bold text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function SaveButton({ loading, saved }: { loading: boolean; saved: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={clsx(
        "flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all",
        saved ? "bg-green-900/40 text-green-300 border border-green-700/40" :
        "text-white border border-transparent",
      )}
      style={saved ? {} : { background: "linear-gradient(135deg, #C4A05A, #8C6828)" }}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : null}
      {loading ? "Saving…" : saved ? "Saved" : "Save Changes"}
    </button>
  );
}

export default function AccountPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState("");

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const userPlan = (session?.user as { plan?: string })?.plan ?? "free";

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login?redirect=/account");
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
      setEmail(session.user.email ?? "");
    }
  }, [session]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError("");
    setProfileLoading(true);
    const res = await fetch("/api/account", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const data = await res.json();
    setProfileLoading(false);
    if (!res.ok) { setProfileError(data.error ?? "Something went wrong"); return; }
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
    await update({ name, email });
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (newPassword !== confirmPassword) { setPasswordError("New passwords don't match"); return; }
    if (newPassword.length < 8) { setPasswordError("Password must be at least 8 characters"); return; }
    setPasswordLoading(true);
    const res = await fetch("/api/account", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    setPasswordLoading(false);
    if (!res.ok) { setPasswordError(data.error ?? "Something went wrong"); return; }
    setPasswordSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brown-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Account Settings</h1>
          <p className="text-navy-400 text-sm mt-1">{session?.user?.email}</p>
        </div>

        {/* Plan */}
        <Section title="Your Plan" icon={Crown}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className={clsx(
                  "text-lg font-bold capitalize",
                  userPlan === "pro" ? "text-brown-400" : "text-white"
                )}>
                  {userPlan === "pro" ? "Pro Plan" : "Free Plan"}
                </span>
                {userPlan === "pro" && (
                  <span className="text-xs bg-brown-500/20 text-brown-300 px-2 py-0.5 rounded-full font-medium">Active</span>
                )}
              </div>
              <p className="text-sm text-navy-400 mt-1">
                {userPlan === "pro" ? "Unlimited listings, full history, all features" : "3 listings/month · Upgrade for unlimited access"}
              </p>
            </div>
            {userPlan === "free" && (
              <Link
                href="/pricing"
                className="flex items-center gap-1.5 text-sm font-semibold text-white px-4 py-2 rounded-xl transition-all flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #C4A05A, #8C6828)" }}
              >
                Upgrade <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-navy-700 flex gap-4 text-sm">
            <Link href="/listings" className="text-navy-400 hover:text-navy-200 transition-colors">My Listings</Link>
            <Link href="/dashboard" className="text-navy-400 hover:text-navy-200 transition-colors">Dashboard</Link>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="text-navy-500 hover:text-red-400 transition-colors ml-auto">Sign Out</button>
          </div>
        </Section>

        {/* Profile */}
        <Section title="Profile" icon={User}>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className={labelClass}>Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
            </div>
            {profileError && (
              <p className="text-sm text-red-400 bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-2">{profileError}</p>
            )}
            <div className="flex justify-end pt-1">
              <SaveButton loading={profileLoading} saved={profileSaved} />
            </div>
          </form>
        </Section>

        {/* Password */}
        <Section title="Change Password" icon={Lock}>
          <form onSubmit={handlePasswordSave} className="space-y-4">
            <div>
              <label className={labelClass}>Current Password</label>
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Min. 8 characters" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Confirm New Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className={inputClass} required />
            </div>
            {passwordError && (
              <p className="text-sm text-red-400 bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-2">{passwordError}</p>
            )}
            <div className="flex justify-end pt-1">
              <SaveButton loading={passwordLoading} saved={passwordSaved} />
            </div>
          </form>
        </Section>

      </div>
    </div>
  );
}
