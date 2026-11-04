"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutGrid,
  User as UserIcon,
  LogOut,
  Plus,
  Pencil,
  CreditCard,
  Monitor,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/hooks/use-language";

export type InvitationStatus = "Draft" | "Published" | "Archived";

export interface Invitation {
  id: string;
  couple1: string;
  couple2: string;
  status: InvitationStatus;
  template: string;
  plan: string;
  date: string;
  photo?: string;
}

interface DashboardViewProps {
  displayName: string;
  initial: string;
  invitations: Invitation[];
  signOutAction: () => Promise<void>;
}

export function DashboardView({
  displayName,
  initial,
  invitations,
  signOutAction,
}: DashboardViewProps) {
  const { t, isAmharic } = useLanguage();
  const [allInvitations, setAllInvitations] = useState<Invitation[]>(invitations);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("habesha_invitations");
      if (stored) {
        const parsed: Invitation[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAllInvitations((prev) => {
            const map = new Map<string, Invitation>();
            // custom created first, then server
            [...parsed, ...prev].forEach((item) => map.set(item.id, item));
            return Array.from(map.values());
          });
        }
      }
    } catch {
      // localStorage not available or parse error
    }
  }, []);

  const getStatusText = (status: InvitationStatus) => {
    switch (status) {
      case "Draft":
        return t.dashboard.status.draft;
      case "Published":
        return t.dashboard.status.published;
      case "Archived":
        return t.dashboard.status.archived;
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f5] text-[#1a1714] dark:bg-[#111318] dark:text-[#f5f6f8]">
      <header className="sticky top-0 z-30 border-b border-[#262320]/10 bg-[#f8f7f5]/95 backdrop-blur-md dark:border-white/[0.06] dark:bg-[#111318]/95">
        <div className="mx-auto flex h-[72px] max-w-[1360px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="flex items-center gap-3 no-underline transition-opacity hover:opacity-90"
            aria-label={`${t.common.brand} - ${t.dashboard.title}`}
          >
            <span
              className="relative inline-flex h-[20px] w-[29px] shrink-0 items-center"
              aria-hidden="true"
            >
              <span className="absolute left-0 size-[18px] rounded-full border-[1.5px] border-[#262320]/70 dark:border-white/80" />
              <span className="absolute right-0 size-[18px] rounded-full border-[1.5px] border-[#262320]/70 dark:border-white/80" />
            </span>

            <span className="font-serif text-[19px] font-normal tracking-[-0.02em] text-[#1a1714] dark:text-[#f5f6f8]">
              {t.common.brand}
            </span>

            <span
              className="mx-1.5 h-4 w-px bg-[#262320]/20 dark:bg-white/20"
              aria-hidden="true"
            />

            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#59534d] dark:text-[#717684]">
              {t.dashboard.title}
            </span>
          </Link>

          <nav
            className="hidden items-center gap-7 sm:flex"
            aria-label="Dashboard navigation"
          >
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-[13px] font-medium text-[#1a1714] no-underline transition-colors dark:text-[#f5f6f8]"
            >
              <LayoutGrid
                size={15}
                className="text-[#1a1714] dark:text-[#f5f6f8]"
              />
              <span>{t.dashboard.title}</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-2 text-[13px] font-medium text-[#6c6660] no-underline transition-colors hover:text-[#1a1714] dark:text-[#7e8492] dark:hover:text-[#f5f6f8]"
            >
              <UserIcon size={15} />
              <span>{t.dashboard.nav.profile}</span>
            </Link>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <LanguageToggle />

            <button
              type="button"
              className="text-[#6c6660] transition-colors hover:text-[#1a1714] dark:text-[#7e8492] dark:hover:text-[#f5f6f8]"
              title={t.dashboard.actions.preview}
              aria-label={t.dashboard.actions.preview}
            >
              <Monitor size={16} />
            </button>

            <span
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f5e5e3] text-[11px] font-medium text-[#9f382f] border border-[#9f382f]/20 dark:bg-[#351e20] dark:text-[#e08279] dark:border-[#e08279]/20"
              aria-label={`Signed in as ${displayName}`}
            >
              {initial}
            </span>

            <form action={signOutAction}>
              <button
                type="submit"
                className="flex items-center gap-1.5 text-[12px] font-normal text-[#6c6660] transition-colors hover:text-[#1a1714] dark:text-[#7e8492] dark:hover:text-[#f5f6f8]"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">{t.dashboard.nav.logout}</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1360px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e15c51]">
              {t.dashboard.yourDashboard}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-normal tracking-[-0.03em] text-[#1a1714] dark:text-[#f5f6f8] sm:text-4xl">
              {t.dashboard.welcomeBack}, {displayName}.
            </h1>
            <p className="mt-2 text-[14px] text-[#59534d] dark:text-[#787f8f] sm:text-[15px]">
              {t.dashboard.manageSubtitle}
            </p>
          </div>

          <Link
            href="/dashboard/new"
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#e15c51] px-4 py-2.5 text-[13px] font-medium text-white no-underline shadow-sm transition-all hover:bg-[#d44c41]"
          >
            <Plus size={15} />
            <span>{t.dashboard.newInvitation}</span>
          </Link>
        </div>

        <section className="mt-10" aria-label="Invitations">
          {allInvitations.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-[#262320]/10 bg-[#f0ece6]/70 px-6 py-20 text-center dark:border-white/[0.08] dark:bg-[#161820]/70">
              <span className="flex size-14 items-center justify-center rounded-full bg-[#e15c51]/10 text-[#e15c51]">
                <Plus size={24} />
              </span>
              <h2 className="mt-5 font-serif text-2xl tracking-[-0.03em] text-[#1a1714] dark:text-[#f5f6f8]">
                {t.dashboard.emptyTitle}
              </h2>
              <p className="mt-2 max-w-[360px] text-[14px] leading-relaxed text-[#59534d] dark:text-[#787f8f]">
                {t.dashboard.emptySubtitle}
              </p>
              <Link
                href="/dashboard/new"
                className="mt-6 flex items-center gap-1.5 rounded-lg bg-[#e15c51] px-4 py-2.5 text-[13px] font-medium text-white no-underline transition-all hover:bg-[#d44c41]"
              >
                <Plus size={15} />
                <span>{t.dashboard.createFirstInvitation}</span>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              {allInvitations.map((inv) => (
                <article
                  key={inv.id}
                  className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-[#262320]/15 bg-white/80 p-5 dark:border-[#23262e] dark:bg-[#161820]/80 sm:flex-row sm:items-center sm:px-6 sm:py-5"
                >
                  <div className="flex items-center gap-4">
                    {inv.photo && (
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-[#262320]/15 shadow-xs dark:border-white/10">
                        <Image
                          src={inv.photo}
                          alt={inv.couple1}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-xl tracking-[-0.02em] text-[#262320] dark:text-[#f5f6f8] sm:text-2xl">
                          {inv.couple1}
                          <span className={`mx-2 text-[#9b7e68] ${isAmharic ? "font-geez font-normal not-italic text-sm" : "font-serif font-light italic"}`}>
                            {isAmharic ? "እና" : "&"}
                          </span>
                          {inv.couple2}
                        </span>
                        <span className="rounded-full border border-[#262320]/15 bg-[#262320]/[0.04] px-2.5 py-0.5 text-[11px] font-normal text-[#59534d] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#8f96a3]">
                          {getStatusText(inv.status)}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-[#59534d] dark:text-[#787f8f] sm:text-[13px]">
                        <div>
                          <span>{t.dashboard.fields.template}</span>{" "}
                          <span className="font-medium text-[#262320] dark:text-[#d3d7e0]">
                            {inv.template}
                          </span>
                        </div>
                        <div>
                          <span>{t.dashboard.fields.plan}</span>{" "}
                          <span className="font-medium text-[#262320] dark:text-[#d3d7e0]">
                            {inv.plan}
                          </span>
                        </div>
                        <div>
                          <span>{t.dashboard.fields.date}</span>{" "}
                          <span className="font-medium text-[#262320] dark:text-[#d3d7e0]">
                            {inv.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2.5">
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-lg border border-[#262320]/15 bg-[#262320]/[0.02] px-3.5 py-2 text-xs font-medium text-[#59534d] transition-colors hover:border-[#262320]/30 hover:bg-[#262320]/[0.05] hover:text-[#1a1714] dark:border-white/10 dark:bg-white/[0.02] dark:text-[#c5cad3] dark:hover:border-white/20 dark:hover:bg-white/[0.05] dark:hover:text-[#f5f6f8]"
                    >
                      <Pencil size={13} />
                      <span>{t.dashboard.actions.edit}</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-lg border border-[#262320]/15 bg-[#262320]/[0.02] px-3.5 py-2 text-xs font-medium text-[#59534d] transition-colors hover:border-[#262320]/30 hover:bg-[#262320]/[0.05] hover:text-[#1a1714] dark:border-white/10 dark:bg-white/[0.02] dark:text-[#c5cad3] dark:hover:border-white/20 dark:hover:bg-white/[0.05] dark:hover:text-[#f5f6f8]"
                    >
                      <CreditCard size={13} />
                      <span>{t.dashboard.actions.payment}</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

