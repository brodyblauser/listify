"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Users, FileText, TrendingUp, Crown, Loader2 } from "lucide-react";
import clsx from "clsx";

type Stats = {
  totalUsers: number;
  proUsers: number;
  freeUsers: number;
  totalListings: number;
  mrr: number;
};

type User = {
  id: string;
  name: string | null;
  email: string;
  plan: string;
  usageCount: number;
  createdAt: string;
  _count: { listings: number };
};

type TopUser = {
  id: string;
  name: string | null;
  email: string;
  plan: string;
  usageCount: number;
};

type AdminData = {
  stats: Stats;
  recentUsers: User[];
  topUsers: TopUser[];
};

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  accent?: boolean;
}) {
  return (
    <div
      className={clsx(
        "rounded-xl border p-6 shadow-sm",
        accent ? "bg-navy-900 border-navy-800" : "bg-navy-800 border-navy-700"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={clsx(
            "text-sm font-medium",
            accent ? "text-navy-300" : "text-navy-300"
          )}
        >
          {label}
        </span>
        <Icon
          className={clsx("w-5 h-5", accent ? "text-blue-300" : "text-navy-400")}
        />
      </div>
      <div
        className={clsx(
          "text-3xl font-bold",
          accent ? "text-white" : "text-white"
        )}
      >
        {value}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }
    if (status === "authenticated") {
      fetch("/api/admin/stats")
        .then((r) => {
          if (r.status === 403) throw new Error("forbidden");
          return r.json();
        })
        .then(setData)
        .catch((e) => {
          if (e.message === "forbidden") {
            setError("You don't have admin access.");
          } else {
            setError("Failed to load admin data.");
          }
        })
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brown-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-navy-300 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { stats, recentUsers, topUsers } = data;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-navy-300 text-sm mt-1">
            Business overview — {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <div className="col-span-2 lg:col-span-1">
            <StatCard
              label="Monthly Revenue"
              value={`$${stats.mrr.toLocaleString()}`}
              icon={TrendingUp}
              accent
            />
          </div>
          <StatCard label="Total Users" value={stats.totalUsers} icon={Users} />
          <StatCard
            label="Pro Users"
            value={stats.proUsers}
            icon={Crown}
          />
          <StatCard
            label="Free Users"
            value={stats.freeUsers}
            icon={Users}
          />
          <StatCard
            label="Total Listings"
            value={stats.totalListings.toLocaleString()}
            icon={FileText}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Users */}
          <div className="lg:col-span-2">
            <h2 className="text-base font-semibold text-white mb-4">
              Recent Signups
            </h2>
            <div className="bg-navy-800 rounded-xl border border-navy-700 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-700 bg-navy-900">
                    <th className="text-left px-4 py-3 text-navy-300 font-medium">
                      User
                    </th>
                    <th className="text-left px-4 py-3 text-navy-300 font-medium">
                      Plan
                    </th>
                    <th className="text-right px-4 py-3 text-navy-300 font-medium">
                      Listings
                    </th>
                    <th className="text-right px-4 py-3 text-navy-300 font-medium">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-700">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-navy-900 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-white truncate max-w-[160px]">
                          {user.name ?? "—"}
                        </div>
                        <div className="text-navy-400 text-xs truncate max-w-[160px]">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={clsx(
                            "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                            user.plan === "pro"
                              ? "bg-navy-100 text-brown-600"
                              : "bg-navy-700 text-navy-200"
                          )}
                        >
                          {user.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-navy-200">
                        {user._count.listings}
                      </td>
                      <td className="px-4 py-3 text-right text-navy-400 text-xs">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {recentUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-navy-400"
                      >
                        No users yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Power Users */}
          <div>
            <h2 className="text-base font-semibold text-white mb-4">
              Most Active Users
            </h2>
            <div className="bg-navy-800 rounded-xl border border-navy-700 shadow-sm divide-y divide-navy-700">
              {topUsers.map((user, i) => (
                <div key={user.id} className="px-4 py-3 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-navy-100 text-brown-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-white text-sm truncate">
                      {user.name ?? user.email}
                    </div>
                    <div className="text-xs text-navy-400 truncate">
                      {user.usageCount} generations
                    </div>
                  </div>
                  <span
                    className={clsx(
                      "text-xs font-medium px-2 py-0.5 rounded-full capitalize flex-shrink-0",
                      user.plan === "pro"
                        ? "bg-navy-100 text-brown-600"
                        : "bg-navy-700 text-navy-300"
                    )}
                  >
                    {user.plan}
                  </span>
                </div>
              ))}
              {topUsers.length === 0 && (
                <div className="px-4 py-8 text-center text-navy-400 text-sm">
                  No activity yet
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
