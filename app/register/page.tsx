"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/hooks/use-language";

export default function RegisterPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm?next=/dashboard`,
      },
    });

    setLoading(false);

    if (error) {
      setIsError(true);
      setMessage(error.message);
      return;
    }

    setMessage(t.auth.checkEmail);
  }

  const confirmed = !isError && message !== "";

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#262320] dark:bg-[#1a1612] dark:text-[#f0ece6]">
      {/* Header */}
      <header className="border-b border-[#262320]/10 bg-[#fbfaf7]/90 backdrop-blur-md dark:border-white/10 dark:bg-[#1a1612]/90">
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-3" aria-label={`${t.common.brand} home`}>
            <span className="brand-mark"><span /><span /></span>
            <span className="font-serif text-[21px] tracking-[-0.03em]">{t.common.brand}</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LanguageToggle />
            <p className="hidden text-[13px] text-[#59534d] dark:text-[#9b9490] sm:block">
              {t.auth.haveAccount}{" "}
              <Link href="/login" className="font-medium text-[#9f382f] underline-offset-2 hover:underline">
                {t.auth.signIn}
              </Link>
            </p>
          </div>
        </div>
      </header>

      {/* Page body */}
      <main className="mx-auto flex min-h-[calc(100vh-76px)] max-w-[480px] flex-col justify-center px-5 py-16 sm:px-8">
        {confirmed ? (
          /* ── Success state ── */
          <div className="text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#9f382f]/10 text-[#9f382f]">
              <Check className="size-7" strokeWidth={2.5} />
            </span>
            <h1 className="mt-6 font-serif text-[clamp(2rem,5vw,3rem)] leading-[.94] tracking-[-0.05em] text-[#25211e] dark:text-[#f0ece6]">
              {t.auth.almostThere}
            </h1>
            <p className="mt-4 text-[15px] leading-7 text-[#6c6660] dark:text-[#9b9490]">{message}</p>
            <p className="mt-6 text-[13px] text-[#8a827a]">
              {t.auth.checkSpam}
            </p>
          </div>
        ) : (
          /* ── Form state ── */
          <>
            {/* Eyebrow */}
            <p className="font-geez text-[15px] text-[#9f382f]">{t.auth.registerEyebrow}</p>

            {/* Heading */}
            <h1 className="mt-3 font-serif text-[clamp(2.4rem,6vw,3.6rem)] leading-[.92] tracking-[-0.06em] text-[#25211e] dark:text-[#f0ece6]">
              {t.auth.registerTitle} <em className="text-[#9f382f]">{t.auth.registerTitleAccent}</em>
            </h1>
            <p className="mt-4 text-[15px] leading-7 text-[#6c6660] dark:text-[#9b9490]">
              {t.auth.registerSubtitle}
            </p>

            {/* Divider */}
            <div className="mt-10 h-px bg-[#262320]/10 dark:bg-white/10" />

            {/* Form */}
            <form onSubmit={handleRegister} className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#59534d] dark:text-[#9b9490]">
                  {t.common.email}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-[#262320]/20 bg-white px-4 py-3 text-[15px] text-[#262320] outline-none placeholder:text-[#8a827a] focus:border-[#9f382f] focus:ring-2 focus:ring-[#9f382f]/15 transition-colors dark:border-white/15 dark:bg-[#2a2420] dark:text-[#f0ece6]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#59534d] dark:text-[#9b9490]">
                  {t.common.password}
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder={t.auth.passwordMin}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full border border-[#262320]/20 bg-white px-4 py-3 text-[15px] text-[#262320] outline-none placeholder:text-[#8a827a] focus:border-[#9f382f] focus:ring-2 focus:ring-[#9f382f]/15 transition-colors dark:border-white/15 dark:bg-[#2a2420] dark:text-[#f0ece6]"
                />
              </div>

              {/* Error */}
              {isError && message && (
                <div className="border border-[#9f382f]/30 bg-[#9f382f]/8 px-4 py-3 text-[13px] text-[#9f382f]">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#9f382f] px-6 py-3.5 text-[14px] font-medium text-white shadow-[0_10px_30px_rgba(159,56,47,.18)] transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  t.auth.creatingAccount
                ) : (
                  <>
                    {t.auth.createAccount} <ArrowRight className="size-4" />
                  </>
                )}
              </button>

              <p className="text-center text-[12px] leading-5 text-[#8a827a]">
                {t.auth.termsNotice}{" "}
                <Link href="#" className="underline underline-offset-2 hover:text-[#9f382f]">
                  {t.common.terms}
                </Link>{" "}
                {t.auth.and}{" "}
                <Link href="#" className="underline underline-offset-2 hover:text-[#9f382f]">
                  {t.common.privacy}
                </Link>
                .
              </p>
            </form>

            {/* Footer link — mobile */}
            <p className="mt-8 text-center text-[13px] text-[#6c6660] dark:text-[#9b9490] sm:hidden">
              {t.auth.haveAccount}{" "}
              <Link href="/login" className="font-medium text-[#9f382f] underline-offset-2 hover:underline">
                {t.auth.signIn}
              </Link>
            </p>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.14em] text-[#8a827a]">
              <span>{t.auth.badges.bilingual}</span>
              <span>{t.auth.badges.payment}</span>
              <span>{t.auth.badges.secure}</span>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
