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
  ChevronDown,
  CirclePlay,
  Heart,
  Menu,
  Sparkles,
  X,
} from "lucide-react";

const events = [
  {
    key: "wedding",
    label: "Weddings",
    am: "ሠርግ",
    eyebrow: "For your forever",
    color: "bg-[#9f382f]",
    image: "/wedding-ethiopian.png",
    text: "A beautiful beginning, shared with everyone you love.",
  },
  {
    key: "birthday",
    label: "Birthdays",
    am: "ልደት",
    eyebrow: "For every milestone",
    color: "bg-[#d78a44]",
    image: "/birthday-ethiopian.png",
    text: "Make their day feel as special as they are.",
  },
  {
    key: "graduation",
    label: "Graduations",
    am: "ምርቃት",
    eyebrow: "For the next chapter",
    color: "bg-[#486b62]",
    image: "/graduation-ethiopian.png",
    text: "Celebrate the work, the journey, and what comes next.",
  },
];

const templates = [
  {
    name: "Adore",
    type: "Romantic · Wedding",
    className: "template-adore",
    title: "Your celebration",
    date: "SEPTEMBER · 14 · 2026",
  },
  {
    name: "Sunlit",
    type: "Joyful · Birthday",
    className: "template-sunlit",
    title: "Liya turns 30",
    date: "SATURDAY · JUNE 22",
  },
  {
    name: "Chapter",
    type: "Modern · Graduation",
    className: "template-chapter",
    title: "Mimi Gebre",
    date: "CLASS OF · 2026",
  },
];

export function MarketingHome() {
  const [language, setLanguage] = useState<"en" | "am">("en");
  const [activeEvent, setActiveEvent] = useState("wedding");
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const event = events.find((item) => item.key === activeEvent) ?? events[0];
  const heroEvent = events[heroIndex];

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
      setHeroIndex((current) => (current + 1) % events.length);
    }, 4200);
    return () => window.clearInterval(rotation);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfaf7] text-[#262320]">
      <header className="relative z-20 border-b border-[#262320]/10 bg-[#fbfaf7]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#top"
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
          </a>
          <nav
            className="hidden items-center gap-9 text-[13px] text-[#59534d] lg:flex"
            aria-label="Primary navigation"
          >
            <a
              href="#occasions"
              className="transition-colors hover:text-[#9f382f]"
            >
              Occasions
            </a>
            <a
              href="#templates"
              className="transition-colors hover:text-[#9f382f]"
            >
              Templates
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-[#9f382f]"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="transition-colors hover:text-[#9f382f]"
            >
              Pricing
            </a>
          </nav>
          <div className="hidden items-center gap-5 lg:flex">
            <button
              className="text-[12px] uppercase tracking-[0.12em] text-[#59534d]"
              onClick={() => setLanguage(language === "en" ? "am" : "en")}
              aria-label="Switch language"
            >
              {language === "en" ? "አማ" : "EN"}
            </button>
            {user ? (
              <Link
                href="/dashboard"
                className="rounded-full bg-[#9f382f] px-5 py-3 text-[13px] font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                Dashboard <ArrowRight className="ml-2 inline size-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[13px] text-[#59534d] transition-colors hover:text-[#9f382f]"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-[#9f382f] px-5 py-3 text-[13px] font-medium text-white transition-transform hover:-translate-y-0.5"
                >
                  Get started <ArrowRight className="ml-2 inline size-3.5" />
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
          <div className="border-t border-[#262320]/10 px-5 py-5 lg:hidden">
            <nav className="flex flex-col gap-4 text-sm">
              <a href="#occasions" onClick={() => setMenuOpen(false)}>
                Occasions
              </a>
              <a href="#templates" onClick={() => setMenuOpen(false)}>
                Templates
              </a>
              <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
                How it works
              </a>
              <a href="#pricing" onClick={() => setMenuOpen(false)}>
                Pricing
              </a>
              <div className="mt-2 flex flex-col gap-3 border-t border-[#262320]/10 pt-4">
                {user ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full bg-[#9f382f] px-4 py-2.5 text-center text-sm font-medium text-white"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-[#59534d] transition-colors hover:text-[#9f382f]"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-full bg-[#9f382f] px-4 py-2.5 text-center text-sm font-medium text-white"
                    >
                      Get started
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
            {language === "en" ? "በፍቅር የተጋበዙ" : "በፍቅር የተጋበዙ"}
          </p>
          <h1 className="font-serif text-[clamp(3.5rem,7vw,6.7rem)] leading-[.88] tracking-[-0.07em] text-[#25211e]">
            Your moment,
            <br />
            <em className="text-[#9f382f]">beautifully invited.</em>
          </h1>
          <p className="mt-8 max-w-[490px] text-[17px] leading-8 text-[#6c6660]">
            Digital invitations made for Ethiopian celebrations. Choose a
            design, make it yours, and share your story in Amharic, English, or
            both.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={user ? "/dashboard" : "/register"}
              className="rounded-full bg-[#9f382f] px-6 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(159,56,47,.18)] transition-transform hover:-translate-y-0.5"
            >
              Create your invitation{" "}
              <ArrowRight className="ml-2 inline size-4" />
            </Link>
            <a
              href="#templates"
              className="rounded-full border border-[#262320]/15 px-6 py-3.5 text-sm font-medium text-[#403b37] hover:border-[#9f382f]"
            >
              Explore templates
            </a>
          </div>
          <div className="mt-11 flex flex-wrap gap-x-7 gap-y-3 text-[11px] uppercase tracking-[0.12em] text-[#8a827a]">
            <span>10+ refined designs</span>
            <span>Bilingual by design</span>
            <span>Pay via Telebirr / CBE</span>
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
              <p className="font-geez text-[16px] text-[#9f382f]">ጥሪ</p>
              <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-[#857b72]">
                A moment worth gathering for
              </p>
              <h2 className="mt-3 font-serif text-[34px] tracking-[-0.05em]">
                Your beautiful <span className="text-[#9f382f]">moment</span>
              </h2>
              <div className="mx-auto my-4 h-px w-10 bg-[#9f382f]/50" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#857b72]">
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
                className={`size-2 rounded-full transition-all ${heroIndex === index ? "w-7 bg-[#9f382f]" : "bg-[#262320]/20"}`}
                aria-label={`Show ${item.label} image`}
              />
            ))}
          </div>
          <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-full border border-[#262320]/10 bg-[#fbfaf7] px-4 py-3 shadow-lg sm:-left-8">
            <span className="flex size-9 items-center justify-center rounded-full bg-[#ead9cc] text-[#9f382f]">
              <Heart className="size-4 fill-current" />
            </span>
            <span className="text-xs font-medium">
              Made for meaningful moments
            </span>
          </div>
        </div>
      </section>

      <section
        id="occasions"
        className="border-y border-[#262320]/10 bg-[#f1ece4] py-20 lg:py-28"
      >
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="section-kicker">Every reason to gather</p>
              <h2 className="section-title">
                Choose your <em>occasion.</em>
              </h2>
            </div>
            <p className="max-w-[360px] text-sm leading-6 text-[#6c6660]">
              Purpose-built templates and wording for the moments your people
              will remember.
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
                  <p className="mt-3 text-sm leading-6 text-[#6c6660]">
                    {item.text}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.13em]">
                    Explore {item.label}{" "}
                    <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-[#6c6660]">
            <span className="size-2 rounded-full bg-[#9f382f]" /> You&apos;re
            exploring <strong className="text-[#262320]">{event.label}</strong>{" "}
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
            <p className="section-kicker">Simple by design</p>
            <h2 className="section-title">
              From idea to <em>invited.</em>
            </h2>
            <p className="mt-6 max-w-[370px] text-sm leading-7 text-[#6c6660]">
              Everything you need to make your celebration feel personal,
              without needing a designer.
            </p>
            <Link
              href={user ? "/dashboard" : "/register"}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#9f382f]"
            >
              Start creating <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              [
                "01",
                "Choose a template",
                "Start with a design that feels like you.",
              ],
              [
                "02",
                "Make it yours",
                "Add names, photos, your story, and all the little details.",
              ],
              [
                "03",
                "Pay & publish",
                "Pay securely with Telebirr, CBE, or bank transfer.",
              ],
              [
                "04",
                "Share the joy",
                "One beautiful link for WhatsApp, Telegram, SMS, and more.",
              ],
            ].map(([number, title, text]) => (
              <div key={number} className="border-t border-[#262320]/15 pt-5">
                <span className="font-serif text-4xl text-[#d8c5b5]">
                  {number}
                </span>
                <h3 className="mt-5 font-serif text-2xl tracking-[-0.04em]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#6c6660]">{text}</p>
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
              <p className="section-kicker light">The gallery</p>
              <h2 className="section-title light">
                Made to be <em>remembered.</em>
              </h2>
            </div>
            <a
              href="#start"
              className="flex items-center gap-2 text-sm text-[#e8b5a1]"
            >
              See all templates <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {templates.map((template) => (
              <a href="#start" key={template.name} className="group">
                <div className={`template-card ${template.className}`}>
                  <div className="template-inner">
                    <span className="font-geez text-sm text-[#9f382f]">ጥሪ</span>
                    <p className="mt-5 text-[9px] uppercase tracking-[0.2em] opacity-70">
                      Together with their families
                    </p>
                    <h3 className="mt-3 font-serif text-[29px] tracking-[-0.05em]">
                      {template.title}
                    </h3>
                    <div className="mx-auto my-5 h-px w-8 bg-current opacity-40" />
                    <p className="text-[9px] uppercase tracking-[0.18em] opacity-70">
                      {template.date}
                    </p>
                  </div>
                  <span className="template-arrow">
                    <ArrowUpRight />
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-serif text-xl">{template.name}</span>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[#aaa098]">
                    {template.type}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="border-b border-[#262320]/10 bg-[#f1ece4] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="section-kicker">Plans for your moment</p>
            <h2 className="section-title">
              Beautiful at <em>every level.</em>
            </h2>
            <p className="mt-6 max-w-[370px] text-sm leading-7 text-[#6c6660]">
              Start simple, then add the details that make your invitation
              unmistakably yours.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              [
                "Starter",
                "A thoughtful beginning",
                "3 photos · RSVP · countdown",
              ],
              [
                "Plus",
                "More room for your story",
                "10 photos · bilingual · schedule",
              ],
              [
                "Premium",
                "The full celebration",
                "QR tickets · insights · music",
              ],
            ].map(([name, desc, features], i) => (
              <div
                key={name}
                className={`rounded-[4px] border p-6 ${i === 1 ? "border-[#9f382f] bg-[#9f382f] text-white" : "border-[#262320]/15 bg-[#fbfaf7]"}`}
              >
                <p className="text-xs uppercase tracking-[0.12em] opacity-70">
                  {name}
                </p>
                <h3 className="mt-8 font-serif text-2xl tracking-[-0.04em]">
                  {desc}
                </h3>
                <p className="mt-6 text-xs leading-5 opacity-75">{features}</p>
                <a
                  href="#start"
                  className="mt-8 inline-flex items-center gap-2 text-xs font-medium"
                >
                  Learn more <ArrowRight className="size-3.5" />
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
          <p className="font-geez text-lg text-[#f1cfc0]">ቀጣዩን በዓልዎን ያስውቡ</p>
          <h2 className="mx-auto mt-4 max-w-[720px] font-serif text-[clamp(3.1rem,6vw,6rem)] leading-[.9] tracking-[-0.07em]">
            Your story deserves
            <br />
            <em>a beautiful beginning.</em>
          </h2>
          <Link
            href={user ? "/dashboard" : "/register"}
            className="mt-9 inline-flex items-center rounded-full bg-[#fbfaf7] px-7 py-4 text-sm font-medium text-[#9f382f]"
          >
            Create your invitation <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
        <div className="ethiopian-pattern" aria-hidden="true" />
      </section>

      <footer className="bg-[#262320] px-5 py-8 text-[#fbfaf7] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-5 text-xs text-[#aaa098] md:flex-row md:items-center">
          <span className="font-serif text-lg text-[#fbfaf7]">
            Habesha Events
          </span>
          <span>Digital invitations for the moments that matter.</span>
          <span>© 2026 Habesha Events</span>
        </div>
      </footer>
    </main>
  );
}
