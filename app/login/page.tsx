"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#262320]">
      {/* Header */}
      <header className="border-b border-[#262320]/10 bg-[#fbfaf7]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Habesha Events home"
          >
            <span className="brand-mark">
              <span />
              <span />
            </span>
            <span className="font-serif text-[21px] tracking-[-0.03em]">
              Habesha Events
            </span>
          </Link>
          <p className="hidden text-[13px] text-[#59534d] sm:block">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-[#9f382f] underline-offset-2 hover:underline"
            >
              Get started
            </Link>
          </p>
        </div>
      </header>

      {/* Page body */}
      <main className="mx-auto flex min-h-[calc(100vh-76px)] max-w-[480px] flex-col justify-center px-5 py-16 sm:px-8">
        {/* Eyebrow */}
        <p className="font-geez text-[15px] text-[#9f382f]">እንኳን ደህና መጡ</p>

        {/* Heading */}
        <h1 className="mt-3 font-serif text-[clamp(2.4rem,6vw,3.6rem)] leading-[.92] tracking-[-0.06em] text-[#25211e]">
          Welcome <em className="text-[#9f382f]">back.</em>
        </h1>
        <p className="mt-4 text-[15px] leading-7 text-[#6c6660]">
          Sign in to continue creating beautiful digital invitations.
        </p>

        {/* Divider */}
        <div className="mt-10 h-px bg-[#262320]/10" />

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#59534d]"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-[#262320]/20 bg-white px-4 py-3 text-[15px] text-[#262320] outline-none placeholder:text-[#8a827a] focus:border-[#9f382f] focus:ring-2 focus:ring-[#9f382f]/15 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#59534d]"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[12px] text-[#9f382f] underline-offset-2 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-[#262320]/20 bg-white px-4 py-3 text-[15px] text-[#262320] outline-none placeholder:text-[#8a827a] focus:border-[#9f382f] focus:ring-2 focus:ring-[#9f382f]/15 transition-colors"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="border border-[#9f382f]/30 bg-[#9f382f]/8 px-4 py-3 text-[13px] text-[#9f382f]">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#9f382f] px-6 py-3.5 text-[14px] font-medium text-white shadow-[0_10px_30px_rgba(159,56,47,.18)] transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? (
              "Signing in…"
            ) : (
              <>
                Sign in <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer link — mobile */}
        <p className="mt-8 text-center text-[13px] text-[#6c6660] sm:hidden">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-[#9f382f] underline-offset-2 hover:underline"
          >
            Get started
          </Link>
        </p>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.14em] text-[#8a827a]">
          <span>Bilingual by design</span>
          <span>Pay via Telebirr / CBE</span>
          <span>Secure &amp; private</span>
        </div>
      </main>
    </div>
  );
}
