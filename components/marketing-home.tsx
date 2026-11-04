"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Heart,
  Menu,
  Sparkles,
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

  const steps = [
    { num: "01", title: t.home.steps.step1Title, text: t.home.steps.step1Text },
    { num: "02", title: t.home.steps.step2Title, text: t.home.steps.step2Text },
    { num: "03", title: t.home.steps.step3Title, text: t.home.steps.step3Text },
    { num: "04", title: t.home.steps.step4Title, text: t.home.steps.step4Text },
  ];

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
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="section-kicker">{t.home.howKicker}</p>
            <h2 className="section-title">
              {t.home.howTitle} <em>{t.home.howTitleAccent}</em>
            </h2>
            <p className="mt-6 max-w-[370px] text-sm leading-7 text-[#6c6660] dark:text-[#9b9490]">
              {t.home.howSubtitle}
            </p>
            <Link
              href={user ? "/dashboard" : "/register"}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#9f382f]"
            >
              {t.home.startCreating} <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {steps.map(({ num, title, text }) => (
              <div key={num} className="border-t border-[#262320]/15 pt-5 dark:border-white/10">
                <span className="font-serif text-4xl text-[#d8c5b5]">
                  {num}
                </span>
                <h3 className="mt-5 font-serif text-2xl tracking-[-0.04em]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#6c6660] dark:text-[#9b9490]">{text}</p>
              </div>
            ))}
          </div>
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
