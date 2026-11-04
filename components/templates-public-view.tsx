"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  Heart,
  Sparkles,
  Smartphone,
  Monitor,
  X,
  MapPin,
  Calendar,
  Layers,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/hooks/use-language";
import {
  TEMPLATES,
  type TemplateItem,
  type EventCategory,
} from "@/lib/templates-data";

interface TemplatesPublicViewProps {
  isLoggedIn?: boolean;
}

export function TemplatesPublicView({
  isLoggedIn = false,
}: TemplatesPublicViewProps) {
  const router = useRouter();
  const { t, isAmharic } = useLanguage();

  const [activeCategory, setActiveCategory] = useState<"all" | EventCategory>(
    "all"
  );

  const filteredTemplates =
    activeCategory === "all"
      ? TEMPLATES
      : TEMPLATES.filter((tpl) => tpl.category === activeCategory);

  const handleSelectTemplate = (template: TemplateItem) => {
    if (isLoggedIn) {
      router.push(`/dashboard/new?template=${template.id}`);
    } else {
      router.push(`/register?template=${template.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#262320] dark:bg-[#1a1612] dark:text-[#f0ece6]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#262320]/10 bg-[#fbfaf7]/90 backdrop-blur-md dark:border-white/10 dark:bg-[#1a1612]/90">
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="flex items-center gap-3 no-underline transition-opacity hover:opacity-90"
            aria-label={t.common.brand}
          >
            <span className="brand-mark">
              <span />
              <span />
            </span>
            <span className="font-serif text-[21px] tracking-[-0.03em]">
              {t.common.brand}
            </span>
          </Link>

          <nav
            className="hidden items-center gap-8 text-[13px] text-[#59534d] dark:text-[#9b9490] md:flex"
            aria-label="Navigation"
          >
            <Link
              href="/#occasions"
              className="transition-colors hover:text-[#9f382f]"
            >
              {t.nav.occasions}
            </Link>
            <Link
              href="/templates"
              className="font-medium text-[#9f382f] dark:text-[#e8b5a1]"
            >
              {t.nav.templates}
            </Link>
            <Link
              href="/#how-it-works"
              className="transition-colors hover:text-[#9f382f]"
            >
              {t.nav.howItWorks}
            </Link>
            <Link
              href="/#pricing"
              className="transition-colors hover:text-[#9f382f]"
            >
              {t.nav.pricing}
            </Link>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <LanguageToggle />

            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="rounded-full bg-[#9f382f] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#862e26] dark:bg-[#e8b5a1] dark:text-[#1a1612]"
              >
                {t.dashboard.title}
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded-full border border-[#262320]/15 px-3.5 py-1.5 text-xs font-medium text-[#262320] transition-colors hover:bg-[#262320]/5 dark:border-white/15 dark:text-[#f0ece6] dark:hover:bg-white/5"
                >
                  {t.common.login}
                </Link>
                <Link
                  href="/register"
                  className="hidden sm:inline-flex rounded-full bg-[#9f382f] px-3.5 py-1.5 text-xs font-medium text-white shadow-xs transition-colors hover:bg-[#862e26] dark:bg-[#e8b5a1] dark:text-[#1a1612]"
                >
                  {t.common.register}
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Intro */}
      <section className="mx-auto max-w-[1320px] px-5 pt-12 pb-8 sm:px-8 lg:px-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#9f382f]/20 bg-[#9f382f]/5 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#9f382f] dark:border-[#e8b5a1]/20 dark:bg-[#e8b5a1]/10 dark:text-[#e8b5a1]">
          <Sparkles className="size-3.5" />
          <span className="uppercase">
            {isAmharic ? "የአብነቶች ማዕከል" : "Template Gallery"}
          </span>
        </div>
        <h1
          className={`mt-4 ${
            isAmharic
              ? "font-geez text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl"
              : "font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.035em]"
          }`}
        >
          {isAmharic
            ? "ለበዓልዎ የተመረጡ ውብ የግብዣ አብነቶች"
            : "Handcrafted Digital Invitations"}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#6c6660] dark:text-[#9b9490] sm:text-base">
          {isAmharic
            ? "የኢትዮጵያ ባህላዊ ውበትንና ዘመናዊ ዲዛይን አጣምረው የያዙ አብነቶች። በነጻ ይሞክሩ፣ አስቀድመው ይመልከቱ፣ ለበዓልዎ የሚስማማውን ይምረጡ።"
            : "Explore culturally rooted, modern Ethiopian invitation designs. Free to preview on phone or desktop, fully bilingual in English and Amharic."}
        </p>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[
            {
              key: "all",
              label: isAmharic ? "ሁሉም አብነቶች" : "All Templates",
              count: TEMPLATES.length,
            },
            {
              key: "wedding",
              label: isAmharic ? "ሠርግ" : "Weddings",
              count: TEMPLATES.filter((t) => t.category === "wedding").length,
            },
            {
              key: "birthday",
              label: isAmharic ? "ልደት" : "Birthdays",
              count: TEMPLATES.filter((t) => t.category === "birthday").length,
            },
            {
              key: "graduation",
              label: isAmharic ? "ምርቃት" : "Graduations",
              count: TEMPLATES.filter((t) => t.category === "graduation").length,
            },
          ].map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key as "all" | EventCategory)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                activeCategory === cat.key
                  ? "bg-[#9f382f] text-white shadow-sm dark:bg-[#e8b5a1] dark:text-[#1a1612]"
                  : "border border-[#262320]/10 bg-white/70 text-[#59534d] hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-[#9b9490] dark:hover:bg-white/[0.08]"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-semibold ${
                  activeCategory === cat.key
                    ? "bg-white/20 text-white dark:bg-black/20 dark:text-[#1a1612]"
                    : "bg-[#262320]/5 text-[#6c6660] dark:bg-white/10 dark:text-[#9b9490]"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8 lg:px-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#262320]/12 bg-white transition-all duration-300 hover:shadow-xl hover:border-[#9f382f]/40 dark:border-white/10 dark:bg-[#201c18] dark:hover:border-[#e8b5a1]/30"
            >
              {/* Visual Card Preview */}
              <div
                className={`relative flex min-h-[310px] flex-col items-center justify-center p-6 bg-gradient-to-br ${template.gradientBg}`}
              >
                {/* Inner stylized invitation card */}
                <div
                  className={`w-full rounded-xl border ${template.borderAccent} ${template.innerBg} p-5 text-center shadow-sm backdrop-blur-xs`}
                >
                  {/* Ethiopian Cultural Placeholder Image */}
                  <div className="relative mx-auto mb-3 h-28 w-24 overflow-hidden rounded-t-full rounded-b-lg border border-black/10 shadow-xs">
                    <Image
                      src={template.placeholderImage}
                      alt={
                        isAmharic
                          ? template.placeholderCaptionAm
                          : template.placeholderCaption
                      }
                      fill
                      className="object-cover"
                    />
                    <span className="absolute bottom-1 inset-x-1 rounded bg-black/60 px-1 py-0.5 text-[8px] font-medium text-white backdrop-blur-xs">
                      {isAmharic ? "ባህላዊ ምሳሌ ፎቶ" : "Cultural Preview"}
                    </span>
                  </div>

                  <span className="font-geez text-xs font-semibold text-[#9f382f] dark:text-[#e8b5a1]">
                    ጥሪ · INVITATION
                  </span>
                  <p className="mt-2 text-[10px] uppercase tracking-wider text-[#6c6660] dark:text-[#a09a94]">
                    {isAmharic
                      ? template.sampleSubtitleAm
                      : template.sampleSubtitle}
                  </p>
                  <h3
                    className={`mt-2 ${
                      isAmharic
                        ? "font-geez text-lg font-semibold"
                        : "font-serif text-xl tracking-tight"
                    } text-[#262320] dark:text-[#f0ece6]`}
                  >
                    {isAmharic
                      ? template.sampleCoupleAm
                      : template.sampleCouple}
                  </h3>
                  <div className="mx-auto my-3 h-px w-8 bg-current opacity-30" />
                  <p className="text-[10px] font-medium text-[#403833] dark:text-[#d3d0cc]">
                    {isAmharic ? template.sampleDateAm : template.sampleDate}
                  </p>
                  <p className="mt-0.5 text-[9px] text-[#6c6660] dark:text-[#a09a94] truncate">
                    {isAmharic ? template.sampleVenueAm : template.sampleVenue}
                  </p>
                </div>

                {/* Hover overlay actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-2.5 bg-black/45 opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100 p-4">
                  <Link
                    href={`/templates/preview/${template.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-[#1a1714] shadow-md transition-transform hover:scale-105"
                  >
                    <Eye className="size-3.5" />
                    <span>{isAmharic ? "ቅድመ-ዕይታ" : "Preview"}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleSelectTemplate(template)}
                    className="flex items-center gap-1.5 rounded-lg bg-[#9f382f] px-3.5 py-2 text-xs font-semibold text-white shadow-md transition-transform hover:scale-105 dark:bg-[#e8b5a1] dark:text-[#1a1612]"
                  >
                    <Check className="size-3.5" />
                    <span>{isAmharic ? "ይህን ምረጥ" : "Use Template"}</span>
                  </button>
                </div>
              </div>

              {/* Metadata */}
              <div className="p-5 border-t border-[#262320]/10 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4
                      className={`${
                        isAmharic
                          ? "font-geez font-semibold text-lg"
                          : "font-serif text-lg tracking-tight"
                      } text-[#1a1714] dark:text-[#f5f6f8]`}
                    >
                      {isAmharic ? template.nameAm : template.name}
                    </h4>
                    <p className="text-[11px] text-[#6c6660] dark:text-[#9b9490]">
                      {isAmharic ? template.tagAm : template.tag}
                    </p>
                  </div>

                  {/* Palette dots */}
                  <div className="flex items-center -space-x-1">
                    {template.palette.map((color, idx) => (
                      <span
                        key={idx}
                        className="size-3.5 rounded-full border border-white dark:border-[#201c18]"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-2 text-xs leading-5 text-[#59534d] dark:text-[#9b9490]">
                  {isAmharic
                    ? template.styleDescriptionAm
                    : template.styleDescription}
                </p>

                {/* Features pills */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {(isAmharic ? template.featuresAm : template.features)
                    .slice(0, 2)
                    .map((feat, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-[#262320]/5 px-2 py-0.5 text-[10px] font-medium text-[#6c6660] dark:bg-white/5 dark:text-[#9b9490]"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                </div>

                {/* Action buttons */}
                <div className="mt-4 flex gap-2 pt-2 border-t border-[#262320]/10 dark:border-white/10">
                  <Link
                    href={`/templates/preview/${template.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-[#262320]/15 py-2 text-xs font-medium text-[#59534d] hover:bg-[#262320]/5 dark:border-white/10 dark:text-[#9b9490] dark:hover:bg-white/5 transition-colors"
                  >
                    <Eye className="size-3.5" />
                    <span>{isAmharic ? "ቅድመ-ዕይታ" : "Preview"}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleSelectTemplate(template)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[#9f382f] py-2 text-xs font-semibold text-white hover:bg-[#862e26] dark:bg-[#e8b5a1] dark:text-[#1a1612] dark:hover:bg-[#dfa48e] transition-colors"
                  >
                    <Check className="size-3.5" />
                    <span>{isAmharic ? "ይህን ምረጥ" : "Use Template"}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
