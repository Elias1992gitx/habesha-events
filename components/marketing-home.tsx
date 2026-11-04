"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Heart,
  Menu,
  MessageSquare,
  Palette,
  Pencil,
  QrCode,
  Send,
  Share2,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/hooks/use-language";

const templates = [
  {
    name: "Adore",
    type: "Romantic · Wedding",
    typeAm: "ፍቅር · ሠርግ",
    className: "template-adore",
    title: "Your celebration",
    titleAm: "የእርስዎ በዓል",
    date: "SEPTEMBER · 14 · 2026",
    dateAm: "መስከረም · 14 · 2019",
  },
  {
    name: "Sunlit",
    type: "Joyful · Birthday",
    typeAm: "ደስታ · ልደት",
    className: "template-sunlit",
    title: "Liya turns 30",
    titleAm: "የሊያ 30ኛ ዓመት ልደት",
    date: "SATURDAY · JUNE 22",
    dateAm: "ቅዳሜ · ሰኔ 22",
  },
  {
    name: "Chapter",
    type: "Modern · Graduation",
    typeAm: "ዘመናዊ · ምርቃት",
    className: "template-chapter",
    title: "Mimi Gebre",
    titleAm: "ሚሚ ገብሬ",
    date: "CLASS OF · 2026",
    dateAm: "የ2018 ተመራቂ",
  },
];

export function MarketingHome() {
  const { t, isAmharic } = useLanguage();
  const [activeEvent, setActiveEvent] = useState("wedding");
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [activeHop, setActiveHop] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [hopPreviewStyle, setHopPreviewStyle] = useState<"wedding" | "birthday" | "graduation">("wedding");

  const handleCopyHopLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("https://habesha.events/e/abebe-sara");
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const events = [
    {
      key: "wedding",
      label: t.home.events.wedding.label,
      am: t.home.events.wedding.am,
      eyebrow: t.home.events.wedding.eyebrow,
      color: "bg-[#9f382f]",
      image: "/wedding-ethiopian.png",
      text: t.home.events.wedding.text,
    },
    {
      key: "birthday",
      label: t.home.events.birthday.label,
      am: t.home.events.birthday.am,
      eyebrow: t.home.events.birthday.eyebrow,
      color: "bg-[#d78a44]",
      image: "/birthday-ethiopian.png",
      text: t.home.events.birthday.text,
    },
    {
      key: "graduation",
      label: t.home.events.graduation.label,
      am: t.home.events.graduation.am,
      eyebrow: t.home.events.graduation.eyebrow,
      color: "bg-[#486b62]",
      image: "/graduation-ethiopian.png",
      text: t.home.events.graduation.text,
    },
  ];

  const event = events.find((item) => item.key === activeEvent) ?? events[0];
  const heroEvent = events[heroIndex] ?? events[0];

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const rotation = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % 3);
    }, 4200);
    return () => window.clearInterval(rotation);
  }, []);

  const pricingPlans = [
    { ...t.home.plans.starter, highlighted: false },
    { ...t.home.plans.plus, highlighted: true },
    { ...t.home.plans.premium, highlighted: false },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfaf7] text-[#262320] dark:bg-[#1a1612] dark:text-[#f0ece6]">
      <header className="relative z-20 border-b border-[#262320]/10 bg-[#fbfaf7]/90 backdrop-blur-md dark:border-white/10 dark:bg-[#1a1612]/90">
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#top"
            className="flex items-center gap-3"
            aria-label={t.common.brand}
          >
            <span className="brand-mark">
              <span />
              <span />
            </span>
            <span className="font-serif text-[21px] tracking-[-0.03em]">
              {t.common.brand}
            </span>
          </a>
          <nav
            className="hidden items-center gap-9 text-[13px] text-[#59534d] dark:text-[#9b9490] lg:flex"
            aria-label="Primary navigation"
          >
            <a
              href="#occasions"
              className="transition-colors hover:text-[#9f382f]"
            >
              {t.nav.occasions}
            </a>
            <a
              href="#templates"
              className="transition-colors hover:text-[#9f382f]"
            >
              {t.nav.templates}
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-[#9f382f]"
            >
              {t.nav.howItWorks}
            </a>
            <a
              href="#pricing"
              className="transition-colors hover:text-[#9f382f]"
            >
              {t.nav.pricing}
            </a>
          </nav>
          <div className="hidden items-center gap-4 lg:flex">
            <ThemeToggle />
            <LanguageToggle />
            {user ? (
              <Link
                href="/dashboard"
                className="rounded-full bg-[#9f382f] px-5 py-3 text-[13px] font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                {t.common.dashboard} <ArrowRight className="ml-2 inline size-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[13px] text-[#59534d] transition-colors hover:text-[#9f382f] dark:text-[#9b9490]"
                >
                  {t.common.login}
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-[#9f382f] px-5 py-3 text-[13px] font-medium text-white transition-transform hover:-translate-y-0.5"
                >
                  {t.common.register} <ArrowRight className="ml-2 inline size-3.5" />
                </Link>
              </>
            )}
          </div>
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[#262320]/10 px-5 py-5 dark:border-white/10 lg:hidden">
            <nav className="flex flex-col gap-4 text-sm">
              <a href="#occasions" onClick={() => setMenuOpen(false)}>
                {t.nav.occasions}
              </a>
              <a href="#templates" onClick={() => setMenuOpen(false)}>
                {t.nav.templates}
              </a>
              <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
                {t.nav.howItWorks}
              </a>
              <a href="#pricing" onClick={() => setMenuOpen(false)}>
                {t.nav.pricing}
              </a>
              <div className="mt-2 flex flex-col gap-3 border-t border-[#262320]/10 pt-4 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <LanguageToggle />
                </div>
                {user ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full bg-[#9f382f] px-4 py-2.5 text-center text-sm font-medium text-white"
                  >
                    {t.common.dashboard}
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-[#59534d] transition-colors hover:text-[#9f382f] dark:text-[#9b9490]"
                    >
                      {t.common.login}
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-full bg-[#9f382f] px-4 py-2.5 text-center text-sm font-medium text-white"
                    >
                      {t.common.register}
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <section
        id="top"
        className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 lg:px-12 lg:pb-28 lg:pt-24"
      >
        <div className="max-w-[580px]">
          <p className="mb-5 font-geez text-[17px] text-[#9f382f]">
            {t.home.eyebrow}
          </p>
          <h1 className="font-serif text-[clamp(3.5rem,7vw,6.7rem)] leading-[.88] tracking-[-0.07em] text-[#25211e] dark:text-[#f0ece6]">
            {t.home.titleMain}
            <br />
            <em className="text-[#9f382f]">{t.home.titleAccent}</em>
          </h1>
          <p className="mt-8 max-w-[490px] text-[17px] leading-8 text-[#6c6660] dark:text-[#9b9490]">
            {t.home.description}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={user ? "/dashboard" : "/register"}
              className="rounded-full bg-[#9f382f] px-6 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(159,56,47,.18)] transition-transform hover:-translate-y-0.5"
            >
              {t.home.createInvitation}{" "}
              <ArrowRight className="ml-2 inline size-4" />
            </Link>
            <a
              href="#templates"
              className="rounded-full border border-[#262320]/15 px-6 py-3.5 text-sm font-medium text-[#403b37] hover:border-[#9f382f] dark:border-white/10 dark:text-[#c5bdb5] dark:hover:border-[#9f382f]"
            >
              {t.home.exploreTemplates}
            </a>
          </div>
          <div className="mt-11 flex flex-wrap gap-x-7 gap-y-3 text-[11px] uppercase tracking-[0.12em] text-[#8a827a] dark:text-[#6e6660]">
            <span>{t.home.badgeDesigns}</span>
            <span>{t.home.badgeBilingual}</span>
            <span>{t.home.badgePayment}</span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[620px]">
          <div className="hero-frame">
            <img
              key={heroEvent.key}
              className="hero-image-swap"
              src={heroEvent.image}
              alt={`${heroEvent.label} celebration in Ethiopia`}
            />
            <div className="hero-card">
              <p className="font-geez text-[15px] font-medium text-[#9f382f]">{t.home.heroCardEyebrow}</p>
              <p className={`mt-2.5 text-[9px] text-[#857b72] ${isAmharic ? "font-geez tracking-[0.06em]" : "uppercase tracking-[0.25em]"}`}>
                {t.home.heroCardSub}
              </p>
              <h2 className={`mt-2.5 ${isAmharic ? "font-geez text-[24px] font-semibold leading-tight tracking-normal" : "font-serif text-[34px] tracking-[-0.05em]"}`}>
                {t.home.heroCardTitle} <span className="text-[#9f382f]">{t.home.heroCardAccent}</span>
              </h2>
              <div className="mx-auto my-3.5 h-px w-10 bg-[#9f382f]/50" />
              <p className={`text-[10px] text-[#857b72] ${isAmharic ? "font-geez tracking-[0.06em]" : "uppercase tracking-[0.2em]"}`}>
                {heroEvent.am} · {heroEvent.label}
              </p>
            </div>
          </div>
          <div
            className="mt-4 flex justify-center gap-2"
            aria-label="Featured occasion images"
          >
            {events.map((item, index) => (
              <button
                key={item.key}
                onClick={() => setHeroIndex(index)}
                className={`size-2 rounded-full transition-all ${heroIndex === index ? "w-7 bg-[#9f382f]" : "bg-[#262320]/20 dark:bg-white/20"}`}
                aria-label={`Show ${item.label} image`}
              />
            ))}
          </div>
          <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-full border border-[#262320]/10 bg-[#fbfaf7] px-4 py-3 shadow-lg dark:border-white/10 dark:bg-[#2a2420] sm:-left-8">
            <span className="flex size-9 items-center justify-center rounded-full bg-[#ead9cc] text-[#9f382f] dark:bg-[#3d2d24]">
              <Heart className="size-4 fill-current" />
            </span>
            <span className="text-xs font-medium">
              {t.home.heroBadge}
            </span>
          </div>
        </div>
      </section>

      <section
        id="occasions"
        className="border-y border-[#262320]/10 bg-[#f1ece4] py-20 dark:border-white/10 dark:bg-[#1f1b17] lg:py-28"
      >
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="section-kicker">{t.home.occasionsKicker}</p>
              <h2 className="section-title">
                {t.home.occasionsTitle} <em>{t.home.occasionsTitleAccent}</em>
              </h2>
            </div>
            <p className="max-w-[360px] text-sm leading-6 text-[#6c6660] dark:text-[#9b9490]">
              {t.home.occasionsSubtitle}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {events.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveEvent(item.key)}
                className={`occasion-card group text-left ${activeEvent === item.key ? "active" : ""}`}
              >
                <div className="occasion-image">
                  <img
                    src={item.image}
                    alt={`${item.label} celebration in Ethiopia`}
                  />
                  <span className={`occasion-icon ${item.color}`}>
                    <Sparkles className="size-4" />
                  </span>
                  <span className="occasion-shine" />
                </div>
                <div className="p-6 pt-5">
                  <p className="font-geez text-sm text-[#9f382f]">{item.am}</p>
                  <h3 className="mt-2 font-serif text-3xl tracking-[-0.04em]">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#6c6660] dark:text-[#9b9490]">
                    {item.text}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.13em]">
                    {t.home.explore} {item.label}{" "}
                    <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-[#6c6660] dark:text-[#9b9490]">
            <span className="size-2 rounded-full bg-[#9f382f]" /> {t.home.exploring}{" "}
            <strong className="text-[#262320] dark:text-[#f0ece6]">{event.label}</strong>{" "}
            <span className="font-geez">· {event.am}</span>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#9f382f]/20 bg-[#9f382f]/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#9f382f] dark:border-[#e8b5a1]/20 dark:bg-[#e8b5a1]/10 dark:text-[#e8b5a1]">
            <Sparkles className="size-3.5" />
            <span className="uppercase">{t.home.howKicker}</span>
          </div>
          <h2
            className={`mt-4 ${
              isAmharic
                ? "font-geez text-3xl font-semibold leading-tight sm:text-4xl lg:text-[44px]"
                : "font-serif text-3xl tracking-[-0.035em] sm:text-4xl md:text-5xl lg:text-[54px] lg:leading-[1.08]"
            }`}
          >
            {t.home.howTitle}{" "}
            <em className="font-normal italic text-[#9f382f] dark:text-[#e8b5a1]">
              {t.home.howTitleAccent}
            </em>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#6c6660] dark:text-[#9b9490] sm:text-base">
            {t.home.howSubtitle}
          </p>
        </div>

        {/* Interactive Hop Stepper (Desktop & Tablet) */}
        <div className="mx-auto mt-12 hidden max-w-4xl grid-cols-4 gap-3 md:grid">
          {[
            {
              hop: "01",
              title: t.home.steps.step1Title,
              icon: Palette,
            },
            {
              hop: "02",
              title: t.home.steps.step2Title,
              icon: Pencil,
            },
            {
              hop: "03",
              title: t.home.steps.step3Title,
              icon: Share2,
            },
            {
              hop: "04",
              title: t.home.steps.step4Title,
              icon: CheckCircle2,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeHop === idx;
            return (
              <button
                key={item.hop}
                type="button"
                onClick={() => setActiveHop(idx)}
                className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-300 ${
                  isActive
                    ? "border-[#9f382f] bg-[#9f382f]/5 shadow-sm dark:border-[#e8b5a1] dark:bg-[#e8b5a1]/10"
                    : "border-[#262320]/10 bg-white/40 hover:border-[#9f382f]/30 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20"
                }`}
              >
                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${
                    isActive
                      ? "bg-[#9f382f] text-white dark:bg-[#e8b5a1] dark:text-[#1a1612]"
                      : "bg-[#262320]/5 text-[#6c6660] dark:bg-white/10 dark:text-[#9b9490]"
                  }`}
                >
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9f382f] dark:text-[#e8b5a1]">
                    {t.home.hopLabel} {item.hop}
                  </p>
                  <p
                    className={`truncate text-xs font-medium ${
                      isActive
                        ? "text-[#262320] dark:text-[#f0ece6]"
                        : "text-[#6c6660] dark:text-[#9b9490]"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* The 4 Hops Showcase Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
          {/* Hop 01: Pick a design */}
          <div
            onClick={() => setActiveHop(0)}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white/80 p-6 backdrop-blur-md transition-all duration-300 sm:p-8 dark:bg-[#201c18]/80 ${
              activeHop === 0
                ? "border-[#9f382f] shadow-lg ring-1 ring-[#9f382f]/30 dark:border-[#e8b5a1] dark:ring-[#e8b5a1]/30"
                : "border-[#262320]/10 hover:border-[#9f382f]/40 hover:shadow-md dark:border-white/10 dark:hover:border-white/20"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#9f382f]/10 px-2.5 py-1 text-xs font-semibold text-[#9f382f] dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]">
                    {t.home.hopLabel} 01
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-[#6c6660] dark:text-[#9b9490]">
                    {t.home.steps.step1Tag}
                  </span>
                </div>
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#9f382f]/10 text-[#9f382f] transition-transform duration-300 group-hover:scale-110 dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]">
                  <Palette className="size-5" />
                </div>
              </div>
              <h3
                className={`mt-5 ${
                  isAmharic
                    ? "font-geez text-2xl font-semibold text-[#262320] dark:text-[#f0ece6]"
                    : "font-serif text-2xl tracking-[-0.03em] text-[#262320] sm:text-3xl dark:text-[#f0ece6]"
                }`}
              >
                {t.home.steps.step1Title}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-[#6c6660] dark:text-[#9b9490]">
                {t.home.steps.step1Text}
              </p>
            </div>

            {/* Interactive Widget 01: Template Style Swatches */}
            <div className="mt-6 rounded-xl border border-[#262320]/10 bg-[#fbfaf7] p-4 dark:border-white/10 dark:bg-[#1a1612]/70">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6c6660] dark:text-[#9b9490]">
                  {t.home.steps.step1Badge}
                </span>
                <span className="rounded-full bg-[#9f382f]/10 px-2 py-0.5 text-[10px] font-medium text-[#9f382f] dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]">
                  {t.home.steps.step1PreviewNote}
                </span>
              </div>

              {/* Style selector pills */}
              <div className="mt-3 flex gap-2">
                {[
                  { key: "wedding", en: "Wedding", am: "ሠርግ" },
                  { key: "birthday", en: "Birthday", am: "ልደት" },
                  { key: "graduation", en: "Graduation", am: "ምርቃት" },
                ].map((style) => (
                  <button
                    key={style.key}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setHopPreviewStyle(
                        style.key as "wedding" | "birthday" | "graduation"
                      );
                    }}
                    className={`flex-1 rounded-lg py-1.5 text-center text-xs font-medium transition-all ${
                      hopPreviewStyle === style.key
                        ? "bg-[#9f382f] text-white shadow-xs dark:bg-[#e8b5a1] dark:text-[#1a1612]"
                        : "border border-[#262320]/10 bg-white/60 text-[#6c6660] hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-[#9b9490] dark:hover:bg-white/[0.08]"
                    }`}
                  >
                    {isAmharic ? style.am : style.en}
                  </button>
                ))}
              </div>

              {/* Dynamic mini preview card */}
              <div className="mt-3 overflow-hidden rounded-lg border border-[#262320]/10 bg-white p-3.5 shadow-xs dark:border-white/10 dark:bg-[#262320]/90">
                <div className="flex items-center justify-between text-[11px] text-[#9f382f] dark:text-[#e8b5a1]">
                  <span className="font-geez font-medium">ጥሪ · INVITATION</span>
                  <span className="text-[10px] opacity-75">
                    {hopPreviewStyle === "wedding"
                      ? isAmharic
                        ? "ፍቅር · ሠርግ"
                        : "Romantic · Wedding"
                      : hopPreviewStyle === "birthday"
                      ? isAmharic
                        ? "ደስታ · ልደት"
                        : "Joyful · Birthday"
                      : isAmharic
                      ? "ዘመናዊ · ምርቃት"
                      : "Modern · Graduation"}
                  </span>
                </div>
                <h4
                  className={`mt-2 ${
                    isAmharic
                      ? "font-geez text-base font-semibold"
                      : "font-serif text-lg tracking-tight"
                  } text-[#262320] dark:text-[#f0ece6]`}
                >
                  {hopPreviewStyle === "wedding"
                    ? isAmharic
                      ? "ሳራ እና ዳዊት"
                      : "Sara & Dawit"
                    : hopPreviewStyle === "birthday"
                    ? isAmharic
                      ? "የሊያ 30ኛ ዓመት ልደት"
                      : "Liya turns 30"
                    : isAmharic
                    ? "ሚሚ ገብሬ · የ2018 ተመራቂ"
                    : "Mimi Gebre · Class of 2026"}
                </h4>
                <p className="mt-1 text-[11px] text-[#6c6660] dark:text-[#9b9490]">
                  {hopPreviewStyle === "wedding"
                    ? isAmharic
                      ? "መስከረም 14 · ስካይላይት ሆቴል"
                      : "September 14, 2026 · Skylight Hotel"
                    : hopPreviewStyle === "birthday"
                    ? isAmharic
                      ? "ሰኔ 22 · ግራንድ ቪላ"
                      : "Saturday, June 22 · Grand Villa"
                    : isAmharic
                    ? "ሐምሌ 18 · አዲስ አበባ ዩኒቨርሲቲ"
                    : "Saturday, July 18 · Addis Ababa University"}
                </p>
              </div>
            </div>
          </div>

          {/* Hop 02: Make it yours */}
          <div
            onClick={() => setActiveHop(1)}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white/80 p-6 backdrop-blur-md transition-all duration-300 sm:p-8 dark:bg-[#201c18]/80 ${
              activeHop === 1
                ? "border-[#9f382f] shadow-lg ring-1 ring-[#9f382f]/30 dark:border-[#e8b5a1] dark:ring-[#e8b5a1]/30"
                : "border-[#262320]/10 hover:border-[#9f382f]/40 hover:shadow-md dark:border-white/10 dark:hover:border-white/20"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#9f382f]/10 px-2.5 py-1 text-xs font-semibold text-[#9f382f] dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]">
                    {t.home.hopLabel} 02
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-[#6c6660] dark:text-[#9b9490]">
                    {t.home.steps.step2Tag}
                  </span>
                </div>
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#9f382f]/10 text-[#9f382f] transition-transform duration-300 group-hover:scale-110 dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]">
                  <Pencil className="size-5" />
                </div>
              </div>
              <h3
                className={`mt-5 ${
                  isAmharic
                    ? "font-geez text-2xl font-semibold text-[#262320] dark:text-[#f0ece6]"
                    : "font-serif text-2xl tracking-[-0.03em] text-[#262320] sm:text-3xl dark:text-[#f0ece6]"
                }`}
              >
                {t.home.steps.step2Title}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-[#6c6660] dark:text-[#9b9490]">
                {t.home.steps.step2Text}
              </p>
            </div>

            {/* Interactive Widget 02: Live Editor Mockup */}
            <div className="mt-6 rounded-xl border border-[#262320]/10 bg-[#fbfaf7] p-4 dark:border-white/10 dark:bg-[#1a1612]/70">
              <div className="flex items-center justify-between pb-2 border-b border-[#262320]/10 dark:border-white/10 text-[11px] text-[#6c6660] dark:text-[#9b9490]">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#9f382f]" />
                  {t.home.steps.step2Badge}
                </span>
                <span className="font-mono text-[10px] text-[#9f382f] dark:text-[#e8b5a1]">
                  auto-saved ✓
                </span>
              </div>

              <div className="mt-3 space-y-2">
                {/* Field: Names */}
                <div className="rounded-lg border border-[#262320]/10 bg-white px-3 py-1.5 dark:border-white/10 dark:bg-[#262320]/80">
                  <p className="text-[10px] uppercase font-semibold text-[#6c6660] dark:text-[#9b9490]">
                    {isAmharic ? "የባለቤቶች ስም" : "Honorees / Names"}
                  </p>
                  <p className="text-xs font-medium text-[#262320] dark:text-[#f0ece6] flex items-center">
                    {t.home.steps.step2PreviewNames}
                    <span className="ml-1 inline-block h-3.5 w-[1.5px] animate-pulse bg-[#9f382f] dark:bg-[#e8b5a1]" />
                  </p>
                </div>

                {/* Field: Date */}
                <div className="rounded-lg border border-[#262320]/10 bg-white px-3 py-1.5 dark:border-white/10 dark:bg-[#262320]/80">
                  <p className="text-[10px] uppercase font-semibold text-[#6c6660] dark:text-[#9b9490]">
                    {isAmharic ? "ቀንና ሰዓት" : "Date & Time"}
                  </p>
                  <p className="text-xs font-medium text-[#262320] dark:text-[#f0ece6]">
                    {t.home.steps.step2PreviewDate}
                  </p>
                </div>

                {/* Field: Location */}
                <div className="rounded-lg border border-[#262320]/10 bg-white px-3 py-1.5 dark:border-white/10 dark:bg-[#262320]/80">
                  <p className="text-[10px] uppercase font-semibold text-[#6c6660] dark:text-[#9b9490]">
                    {isAmharic ? "ቦታና አድራሻ" : "Venue Location"}
                  </p>
                  <p className="text-xs font-medium text-[#262320] dark:text-[#f0ece6]">
                    {t.home.steps.step2PreviewLocation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hop 03: Send one link */}
          <div
            onClick={() => setActiveHop(2)}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white/80 p-6 backdrop-blur-md transition-all duration-300 sm:p-8 dark:bg-[#201c18]/80 ${
              activeHop === 2
                ? "border-[#9f382f] shadow-lg ring-1 ring-[#9f382f]/30 dark:border-[#e8b5a1] dark:ring-[#e8b5a1]/30"
                : "border-[#262320]/10 hover:border-[#9f382f]/40 hover:shadow-md dark:border-white/10 dark:hover:border-white/20"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#9f382f]/10 px-2.5 py-1 text-xs font-semibold text-[#9f382f] dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]">
                    {t.home.hopLabel} 03
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-[#6c6660] dark:text-[#9b9490]">
                    {t.home.steps.step3Tag}
                  </span>
                </div>
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#9f382f]/10 text-[#9f382f] transition-transform duration-300 group-hover:scale-110 dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]">
                  <Share2 className="size-5" />
                </div>
              </div>
              <h3
                className={`mt-5 ${
                  isAmharic
                    ? "font-geez text-2xl font-semibold text-[#262320] dark:text-[#f0ece6]"
                    : "font-serif text-2xl tracking-[-0.03em] text-[#262320] sm:text-3xl dark:text-[#f0ece6]"
                }`}
              >
                {t.home.steps.step3Title}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-[#6c6660] dark:text-[#9b9490]">
                {t.home.steps.step3Text}
              </p>
            </div>

            {/* Interactive Widget 03: Share Link Box & Channel Buttons */}
            <div className="mt-6 rounded-xl border border-[#262320]/10 bg-[#fbfaf7] p-4 dark:border-white/10 dark:bg-[#1a1612]/70">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6c6660] dark:text-[#9b9490]">
                  {t.home.steps.step3PreviewNote}
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  {t.home.steps.step3Badge}
                </span>
              </div>

              {/* Link Input Bar with Click-to-Copy */}
              <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-[#262320]/10 bg-white p-2 dark:border-white/10 dark:bg-[#262320]/80">
                <span className="truncate font-mono text-xs text-[#262320] dark:text-[#f0ece6] pl-1">
                  habesha.events/e/abebe-sara
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyHopLink();
                  }}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                    copiedLink
                      ? "bg-emerald-600 text-white"
                      : "bg-[#9f382f] text-white hover:bg-[#862e26] dark:bg-[#e8b5a1] dark:text-[#1a1612] dark:hover:bg-[#dfa48e]"
                  }`}
                >
                  {copiedLink ? (
                    <>
                      <Check className="size-3.5" />
                      {isAmharic ? "ተገልብጧል!" : "Copied!"}
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      {isAmharic ? "ሊንክ ገልብጥ" : "Copy"}
                    </>
                  )}
                </button>
              </div>

              {/* Channels row */}
              <div className="mt-3 grid grid-cols-4 gap-2">
                {[
                  { label: "Telegram", icon: Send },
                  { label: "WhatsApp", icon: MessageSquare },
                  { label: "SMS", icon: Users },
                  { label: "QR Pass", icon: QrCode },
                ].map((channel) => {
                  const ChannelIcon = channel.icon;
                  return (
                    <div
                      key={channel.label}
                      className="flex flex-col items-center justify-center rounded-lg border border-[#262320]/10 bg-white/70 py-2 text-center dark:border-white/10 dark:bg-white/[0.03]"
                    >
                      <ChannelIcon className="size-4 text-[#9f382f] dark:text-[#e8b5a1]" />
                      <span className="mt-1 text-[10px] font-medium text-[#6c6660] dark:text-[#9b9490]">
                        {channel.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Hop 04: Watch replies land */}
          <div
            onClick={() => setActiveHop(3)}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white/80 p-6 backdrop-blur-md transition-all duration-300 sm:p-8 dark:bg-[#201c18]/80 ${
              activeHop === 3
                ? "border-[#9f382f] shadow-lg ring-1 ring-[#9f382f]/30 dark:border-[#e8b5a1] dark:ring-[#e8b5a1]/30"
                : "border-[#262320]/10 hover:border-[#9f382f]/40 hover:shadow-md dark:border-white/10 dark:hover:border-white/20"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#9f382f]/10 px-2.5 py-1 text-xs font-semibold text-[#9f382f] dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]">
                    {t.home.hopLabel} 04
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-[#6c6660] dark:text-[#9b9490]">
                    {t.home.steps.step4Tag}
                  </span>
                </div>
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#9f382f]/10 text-[#9f382f] transition-transform duration-300 group-hover:scale-110 dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]">
                  <CheckCircle2 className="size-5" />
                </div>
              </div>
              <h3
                className={`mt-5 ${
                  isAmharic
                    ? "font-geez text-2xl font-semibold text-[#262320] dark:text-[#f0ece6]"
                    : "font-serif text-2xl tracking-[-0.03em] text-[#262320] sm:text-3xl dark:text-[#f0ece6]"
                }`}
              >
                {t.home.steps.step4Title}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-[#6c6660] dark:text-[#9b9490]">
                {t.home.steps.step4Text}
              </p>
            </div>

            {/* Interactive Widget 04: Host Desk RSVP Console */}
            <div className="mt-6 rounded-xl border border-[#262320]/10 bg-[#fbfaf7] p-4 dark:border-white/10 dark:bg-[#1a1612]/70">
              {/* RSVP status count pills */}
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  ✓ {t.home.steps.step4Attending}
                </span>
                <span className="rounded-md bg-amber-500/10 px-2 py-1 text-[11px] font-semibold text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                  ? {t.home.steps.step4Maybe}
                </span>
                <span className="rounded-md bg-[#262320]/5 px-2 py-1 text-[11px] font-semibold text-[#6c6660] dark:bg-white/10 dark:text-[#9b9490]">
                  ✕ {t.home.steps.step4Declined}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-[#6c6660] dark:text-[#9b9490]">
                  <span>{isAmharic ? "የምላሽ መጠን" : "Response rate"}</span>
                  <span className="font-semibold text-[#262320] dark:text-[#f0ece6]">
                    88% (166 / 190)
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#262320]/10 dark:bg-white/10">
                  <div className="h-full w-[88%] rounded-full bg-[#9f382f] dark:bg-[#e8b5a1]" />
                </div>
              </div>

              {/* Live guest replies stream */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 rounded-lg border border-[#262320]/10 bg-white p-2 dark:border-white/10 dark:bg-[#262320]/80">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#9f382f]/10 text-[10px] font-bold text-[#9f382f] dark:bg-[#e8b5a1]/20 dark:text-[#e8b5a1]">
                    ST
                  </div>
                  <div className="min-w-0 flex-1 text-[11px]">
                    <p className="font-semibold text-[#262320] dark:text-[#f0ece6]">
                      {t.home.steps.step4Guest1}
                    </p>
                    <p className="truncate text-[10px] text-[#6c6660] dark:text-[#9b9490]">
                      {t.home.steps.step4Guest1Note}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-[#262320]/10 bg-white p-2 dark:border-white/10 dark:bg-[#262320]/80">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#9f382f]/10 text-[10px] font-bold text-[#9f382f] dark:bg-[#e8b5a1]/20 dark:text-[#e8b5a1]">
                    DH
                  </div>
                  <div className="min-w-0 flex-1 text-[11px]">
                    <p className="font-semibold text-[#262320] dark:text-[#f0ece6]">
                      {t.home.steps.step4Guest2}
                    </p>
                    <p className="truncate text-[10px] text-[#6c6660] dark:text-[#9b9490]">
                      {t.home.steps.step4Guest2Note}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#262320]/10 bg-gradient-to-r from-[#9f382f]/5 via-transparent to-[#9f382f]/5 p-6 text-center sm:flex-row sm:p-8 sm:text-left dark:border-white/10 dark:from-[#e8b5a1]/5 dark:to-transparent">
          <div>
            <h4
              className={`${
                isAmharic
                  ? "font-geez font-semibold text-xl sm:text-2xl"
                  : "font-serif text-xl sm:text-2xl"
              } text-[#262320] dark:text-[#f0ece6]`}
            >
              {isAmharic
                ? "የበዓልዎን ግብዣ አሁኑኑ ማዘጋጀት ይጀምሩ"
                : "Ready to invite your loved ones?"}
            </h4>
            <p className="mt-1 text-sm text-[#6c6660] dark:text-[#9b9490]">
              {isAmharic
                ? "በነጻ ይሞክሩ። ዝግጁ ሲሆኑ ብቻ ይክፈሉና ያትሙ።"
                : "Free to preview and try designs. Pay only when you are ready to publish."}
            </p>
          </div>
          <Link
            href={user ? "/dashboard" : "/register"}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#9f382f] px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-[#862e26] hover:shadow-lg dark:bg-[#e8b5a1] dark:text-[#1a1612] dark:hover:bg-[#dfa48e]"
          >
            {t.home.startCreating} <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section
        id="templates"
        className="bg-[#262320] px-5 py-20 text-[#fbfaf7] sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="section-kicker light">{t.home.galleryKicker}</p>
              <h2 className="section-title light">
                {t.home.galleryTitle} <em>{t.home.galleryTitleAccent}</em>
              </h2>
            </div>
            <a
              href="#start"
              className="flex items-center gap-2 text-sm text-[#e8b5a1]"
            >
              {t.home.seeAllTemplates} <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {templates.map((template) => (
              <a href="#start" key={template.name} className="group">
                <div className={`template-card ${template.className}`}>
                  <div className="template-inner">
                    <span className="font-geez text-sm font-medium text-[#9f382f]">ጥሪ</span>
                    <p className={`mt-5 text-[9px] opacity-70 ${isAmharic ? "font-geez tracking-[0.06em]" : "uppercase tracking-[0.2em]"}`}>
                      {t.home.togetherWithFamilies}
                    </p>
                    <h3 className={`mt-3 ${isAmharic ? "font-geez text-[23px] font-semibold leading-tight tracking-normal" : "font-serif text-[29px] tracking-[-0.05em]"}`}>
                      {isAmharic ? template.titleAm : template.title}
                    </h3>
                    <div className="mx-auto my-5 h-px w-8 bg-current opacity-40" />
                    <p className={`text-[9px] opacity-70 ${isAmharic ? "font-geez tracking-[0.08em]" : "uppercase tracking-[0.18em]"}`}>
                      {isAmharic ? template.dateAm : template.date}
                    </p>
                  </div>
                  <span className="template-arrow">
                    <ArrowUpRight />
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`text-xl ${isAmharic ? "font-geez font-semibold" : "font-serif"}`}>{template.name}</span>
                  <span className={`text-[10px] text-[#aaa098] ${isAmharic ? "font-geez tracking-[0.05em]" : "uppercase tracking-[0.14em]"}`}>
                    {isAmharic ? template.typeAm : template.type}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="border-b border-[#262320]/10 bg-[#f1ece4] px-5 py-20 dark:border-white/10 dark:bg-[#1f1b17] sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="section-kicker">{t.home.pricingKicker}</p>
            <h2 className="section-title">
              {t.home.pricingTitle} <em>{t.home.pricingTitleAccent}</em>
            </h2>
            <p className="mt-6 max-w-[370px] text-sm leading-7 text-[#6c6660] dark:text-[#9b9490]">
              {t.home.pricingSubtitle}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[4px] border p-6 ${plan.highlighted ? "border-[#9f382f] bg-[#9f382f] text-white" : "border-[#262320]/15 bg-[#fbfaf7] dark:border-white/10 dark:bg-[#2a2420]"}`}
              >
                <p className="text-xs uppercase tracking-[0.12em] opacity-70">
                  {plan.name}
                </p>
                <h3 className="mt-8 font-serif text-2xl tracking-[-0.04em]">
                  {plan.desc}
                </h3>
                <p className="mt-6 text-xs leading-5 opacity-75">{plan.features}</p>
                <a
                  href="#start"
                  className="mt-8 inline-flex items-center gap-2 text-xs font-medium"
                >
                  {t.home.learnMore} <ArrowRight className="size-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="start"
        className="relative overflow-hidden bg-[#9f382f] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="relative z-10 mx-auto max-w-[1320px] text-center">
          <p className="font-geez text-lg text-[#f1cfc0]">{t.home.ctaGeez}</p>
          <h2 className="mx-auto mt-4 max-w-[720px] font-serif text-[clamp(3.1rem,6vw,6rem)] leading-[.9] tracking-[-0.07em]">
            {t.home.ctaTitle}
            <br />
            <em>{t.home.ctaTitleAccent}</em>
          </h2>
          <Link
            href={user ? "/dashboard" : "/register"}
            className="mt-9 inline-flex items-center rounded-full bg-[#fbfaf7] px-7 py-4 text-sm font-medium text-[#9f382f]"
          >
            {t.home.createInvitation} <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
        <div className="ethiopian-pattern" aria-hidden="true" />
      </section>

      <footer className="bg-[#262320] px-5 py-8 text-[#fbfaf7] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-5 text-xs text-[#aaa098] md:flex-row md:items-center">
          <span className="font-serif text-lg text-[#fbfaf7]">
            {t.common.brand}
          </span>
          <span>{t.home.footerTagline}</span>
          <span>{t.home.footerCopyright}</span>
        </div>
      </footer>
    </main>
  );
}
