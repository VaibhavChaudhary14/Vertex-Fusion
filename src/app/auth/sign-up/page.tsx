"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to register");
        return;
      }

      // after sign up, go to sign-in
      router.push("/sign-in");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90 text-white">
      <div className="w-full max-w-md border border-white/10 rounded-2xl p-8 bg-white/5 backdrop-blur">
        <h1 className="text-2xl font-semibold mb-2">Create your account</h1>
        <p className="text-sm text-white/60 mb-6">
          Access Vertex Fusion dashboard and manage simulations.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-400 border border-red-500/40 rounded-md px-3 py-2 bg-red-500/10">
              {error}
            </p>
          )}

          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-cyan-400"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Grid operator name"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-cyan-400"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-cyan-400"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-lg py-2 text-sm font-medium bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 transition"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-4 text-xs text-white/60 text-center">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-cyan-400 hover:text-cyan-300 underline-offset-2 underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
