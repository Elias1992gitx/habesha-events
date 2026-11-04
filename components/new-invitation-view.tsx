"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  Eye,
  Heart,
  Sparkles,
  GraduationCap,
  Cake,
  Calendar,
  MapPin,
  Smartphone,
  Monitor,
  RotateCcw,
  Upload,
  X,
  LogOut,
  User as UserIcon,
  LayoutGrid,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/hooks/use-language";
import type { Invitation } from "@/components/dashboard-view";
import {
  TEMPLATES,
  type TemplateItem,
  type EventCategory,
} from "@/lib/templates-data";

interface NewInvitationViewProps {
  displayName: string;
  initial: string;
  signOutAction: () => Promise<void>;
}

export function NewInvitationView({
  displayName,
  initial,
  signOutAction,
}: NewInvitationViewProps) {
  const router = useRouter();
  const { t, isAmharic } = useLanguage();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState<EventCategory>("wedding");
  const [activeFilter, setActiveFilter] = useState<"all" | EventCategory>(
    "wedding"
  );
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(
    null
  );

  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("2026-11-15");
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const processUploadedFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setCustomPhoto(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const handleResetPhoto = () => {
    setCustomPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tplId = params.get("template");
      if (tplId) {
        const found = TEMPLATES.find((t) => t.id === tplId);
        if (found) {
          setSelectedType(found.category);
          setActiveFilter(found.category);
          setSelectedTemplate(found);
          setStep(3);
        }
      }
    }
  }, []);

  // Occasion definitions
  const occasionOptions = [
    {
      key: "wedding" as EventCategory,
      title: t.newInvitation.eventTypes.wedding.title,
      titleAm: t.newInvitation.eventTypes.wedding.titleAm,
      desc: t.newInvitation.eventTypes.wedding.desc,
      badge: t.newInvitation.eventTypes.wedding.badge,
      image: "/wedding-ethiopian.png",
      accent: "#9f382f",
      icon: Heart,
    },
    {
      key: "birthday" as EventCategory,
      title: t.newInvitation.eventTypes.birthday.title,
      titleAm: t.newInvitation.eventTypes.birthday.titleAm,
      desc: t.newInvitation.eventTypes.birthday.desc,
      badge: t.newInvitation.eventTypes.birthday.badge,
      image: "/birthday-ethiopian.png",
      accent: "#d78a44",
      icon: Cake,
    },
    {
      key: "graduation" as EventCategory,
      title: t.newInvitation.eventTypes.graduation.title,
      titleAm: t.newInvitation.eventTypes.graduation.titleAm,
      desc: t.newInvitation.eventTypes.graduation.desc,
      badge: t.newInvitation.eventTypes.graduation.badge,
      image: "/graduation-ethiopian.png",
      accent: "#486b62",
      icon: GraduationCap,
    },
  ];

  // Filter templates
  const filteredTemplates =
    activeFilter === "all"
      ? TEMPLATES
      : TEMPLATES.filter((tpl) => tpl.category === activeFilter);

  // Handle selecting an event type from Step 1
  const handleSelectEventType = (type: EventCategory) => {
    setSelectedType(type);
    setActiveFilter(type);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle template selection from gallery
  const handleSelectTemplate = (template: TemplateItem) => {
    setSelectedTemplate(template);
    if (!eventTitle) {
      setEventTitle(
        isAmharic ? template.sampleCoupleAm : template.sampleCouple
      );
    }
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle finalizing draft invitation
  const handleCreateDraft = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      try {
        const newInv: Invitation = {
          id: `inv-${Date.now()}`,
          couple1: eventTitle || displayName || "Celebration",
          couple2: "",
          status: "Draft",
          template: selectedTemplate?.name || "Adore",
          plan: "Starter",
          date: eventDate || "Nov 15, 2026",
          photo: customPhoto || selectedTemplate?.placeholderImage,
        };

        const existingRaw = localStorage.getItem("habesha_invitations");
        const existing: Invitation[] = existingRaw ? JSON.parse(existingRaw) : [];
        const updated = [newInv, ...existing];
        localStorage.setItem("habesha_invitations", JSON.stringify(updated));
      } catch {
        // storage fallback
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f5] text-[#1a1714] dark:bg-[#111318] dark:text-[#f5f6f8]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#262320]/10 bg-[#f8f7f5]/95 backdrop-blur-md dark:border-white/[0.06] dark:bg-[#111318]/95">
        <div className="mx-auto flex h-[72px] max-w-[1360px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 no-underline transition-opacity hover:opacity-90"
              aria-label={t.common.brand}
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
            </Link>

            <span
              className="mx-2 h-4 w-px bg-[#262320]/20 dark:bg-white/20"
              aria-hidden="true"
            />

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#59534d] hover:text-[#9f382f] dark:text-[#787f8f] dark:hover:text-[#e8b5a1] transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>{t.newInvitation.backToDashboard}</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <LanguageToggle />

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

      {/* Main Flow Content */}
      <main className="mx-auto max-w-[1360px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
        {/* Visual Progress Stepper */}
        <div className="mx-auto max-w-2xl pb-8">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 px-2 font-medium transition-all ${
                step === 1
                  ? "border-[#9f382f] bg-[#9f382f]/10 text-[#9f382f] shadow-xs dark:border-[#e8b5a1] dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]"
                  : "border-[#262320]/10 bg-white/50 text-[#6c6660] hover:bg-white dark:border-white/10 dark:bg-white/[0.02] dark:text-[#9b9490]"
              }`}
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#9f382f]/15 text-[10px] font-bold text-[#9f382f] dark:bg-[#e8b5a1]/20 dark:text-[#e8b5a1]">
                1
              </span>
              <span className="truncate">{t.newInvitation.stepBadge1}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (selectedType) setStep(2);
              }}
              className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 px-2 font-medium transition-all ${
                step === 2
                  ? "border-[#9f382f] bg-[#9f382f]/10 text-[#9f382f] shadow-xs dark:border-[#e8b5a1] dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]"
                  : "border-[#262320]/10 bg-white/50 text-[#6c6660] hover:bg-white dark:border-white/10 dark:bg-white/[0.02] dark:text-[#9b9490]"
              }`}
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#9f382f]/15 text-[10px] font-bold text-[#9f382f] dark:bg-[#e8b5a1]/20 dark:text-[#e8b5a1]">
                2
              </span>
              <span className="truncate">{t.newInvitation.stepBadge2}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (selectedTemplate) setStep(3);
              }}
              disabled={!selectedTemplate}
              className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 px-2 font-medium transition-all ${
                step === 3
                  ? "border-[#9f382f] bg-[#9f382f]/10 text-[#9f382f] shadow-xs dark:border-[#e8b5a1] dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]"
                  : "border-[#262320]/10 bg-white/50 text-[#6c6660] disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.02] dark:text-[#9b9490]"
              }`}
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#9f382f]/15 text-[10px] font-bold text-[#9f382f] dark:bg-[#e8b5a1]/20 dark:text-[#e8b5a1]">
                3
              </span>
              <span className="truncate">{t.newInvitation.stepBadge3}</span>
            </button>
          </div>
        </div>

        {/* ================= STEP 1: EVENT TYPE SELECTION ================= */}
        {step === 1 && (
          <section className="animate-in fade-in duration-300">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9f382f] dark:text-[#e8b5a1]">
                {t.newInvitation.step1Kicker}
              </p>
              <h1
                className={`mt-3 ${
                  isAmharic
                    ? "font-geez text-3xl font-semibold sm:text-4xl"
                    : "font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[-0.03em]"
                } text-[#1a1714] dark:text-[#f5f6f8]`}
              >
                {t.newInvitation.step1Title}
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#59534d] dark:text-[#9b9490] sm:text-base">
                {t.newInvitation.step1Subtitle}
              </p>
            </div>

            {/* Occasion Cards Grid */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {occasionOptions.map((occ) => {
                const Icon = occ.icon;
                const isSelected = selectedType === occ.key;
                return (
                  <button
                    key={occ.key}
                    type="button"
                    onClick={() => handleSelectEventType(occ.key)}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      isSelected
                        ? "border-[#9f382f] bg-white ring-2 ring-[#9f382f]/30 dark:border-[#e8b5a1] dark:bg-[#1a1612] dark:ring-[#e8b5a1]/30"
                        : "border-[#262320]/12 bg-white/70 hover:border-[#9f382f]/50 dark:border-white/10 dark:bg-[#161820]/70"
                    }`}
                  >
                    {/* Image Area with Shimmer */}
                    <div className="relative h-48 w-full overflow-hidden bg-[#262320]/5">
                      <Image
                        src={occ.image}
                        alt={occ.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Occasion Badge */}
                      <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold text-[#1a1714] shadow-xs backdrop-blur-md dark:bg-black/80 dark:text-white">
                        {occ.badge}
                      </span>

                      {/* Icon Bubble */}
                      <div className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/95 text-[#9f382f] shadow-md backdrop-blur-md dark:bg-[#201c18] dark:text-[#e8b5a1]">
                        <Icon className="size-4" />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3
                            className={`${
                              isAmharic
                                ? "font-geez font-semibold text-xl"
                                : "font-serif text-2xl tracking-[-0.02em]"
                            } text-[#1a1714] dark:text-[#f5f6f8]`}
                          >
                            {isAmharic ? occ.titleAm : occ.title}
                          </h3>
                          <span className="font-geez text-xs font-medium text-[#9f382f] dark:text-[#e8b5a1]">
                            {occ.titleAm}
                          </span>
                        </div>
                        <p className="mt-2 text-xs leading-5 text-[#59534d] dark:text-[#9b9490]">
                          {occ.desc}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-[#262320]/10 pt-3 dark:border-white/10">
                        <span className="text-xs font-semibold text-[#9f382f] dark:text-[#e8b5a1] flex items-center gap-1 group-hover:underline">
                          {t.newInvitation.selectTemplateBtn}
                          <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                        {isSelected && (
                          <span className="flex size-5 items-center justify-center rounded-full bg-[#9f382f] text-white dark:bg-[#e8b5a1] dark:text-[#1a1612]">
                            <Check className="size-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* ================= STEP 2: TEMPLATE GALLERY ================= */}
        {step === 2 && (
          <section className="animate-in fade-in duration-300">
            {/* Top Toolbar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mb-2 inline-flex items-center gap-1 text-xs font-medium text-[#9f382f] dark:text-[#e8b5a1] hover:underline"
                >
                  <ArrowLeft className="size-3.5" />
                  {t.newInvitation.changeEventType}
                </button>
                <h1
                  className={`${
                    isAmharic
                      ? "font-geez text-2xl font-semibold sm:text-3xl"
                      : "font-serif text-3xl sm:text-4xl tracking-[-0.03em]"
                  } text-[#1a1714] dark:text-[#f5f6f8]`}
                >
                  {t.newInvitation.step2Title}
                </h1>
                <p className="mt-1 text-xs text-[#59534d] dark:text-[#9b9490] sm:text-sm">
                  {t.newInvitation.step2Subtitle}
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 rounded-xl border border-[#262320]/10 bg-white/60 p-1.5 dark:border-white/10 dark:bg-[#161820]/60">
                {[
                  { key: "all", label: t.newInvitation.filterAll },
                  { key: "wedding", label: t.newInvitation.filterWedding },
                  { key: "birthday", label: t.newInvitation.filterBirthday },
                  { key: "graduation", label: t.newInvitation.filterGraduation },
                ].map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() =>
                      setActiveFilter(f.key as "all" | EventCategory)
                    }
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      activeFilter === f.key
                        ? "bg-[#9f382f] text-white shadow-xs dark:bg-[#e8b5a1] dark:text-[#1a1612]"
                        : "text-[#59534d] hover:bg-[#262320]/5 dark:text-[#9b9490] dark:hover:bg-white/5"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Templates Grid */}
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTemplates.map((template) => {
                const isSelected = selectedTemplate?.id === template.id;
                return (
                  <div
                    key={template.id}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:shadow-xl dark:bg-[#1a1612] ${
                      isSelected
                        ? "border-[#9f382f] ring-2 ring-[#9f382f]/30 dark:border-[#e8b5a1] dark:ring-[#e8b5a1]/30"
                        : "border-[#262320]/12 hover:border-[#9f382f]/40 dark:border-white/10 dark:hover:border-white/20"
                    }`}
                  >
                    {/* Visual Card Preview */}
                    <div
                      className={`relative flex min-h-[300px] flex-col items-center justify-center p-6 bg-gradient-to-br ${template.gradientBg}`}
                    >
                      {/* Inner invitation card */}
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
                            {t.newInvitation.culturalPreviewBadge}
                          </span>
                        </div>

                        <span className="font-geez text-xs font-semibold text-[#9f382f]">
                          ጥሪ · INVITATION
                        </span>
                        <p className="mt-2 text-[10px] uppercase tracking-wider text-[#6c6660]">
                          {isAmharic
                            ? template.sampleSubtitleAm
                            : template.sampleSubtitle}
                        </p>
                        <h4
                          className={`mt-2 ${
                            isAmharic
                              ? "font-geez text-lg font-semibold"
                              : "font-serif text-xl tracking-tight"
                          } text-[#262320]`}
                        >
                          {isAmharic
                            ? template.sampleCoupleAm
                            : template.sampleCouple}
                        </h4>
                        <div className="mx-auto my-3 h-px w-8 bg-[#262320]/20" />
                        <p className="text-[10px] font-medium text-[#59534d]">
                          {isAmharic
                            ? template.sampleDateAm
                            : template.sampleDate}
                        </p>
                        <p className="mt-0.5 text-[9px] text-[#6c6660] truncate">
                          {isAmharic
                            ? template.sampleVenueAm
                            : template.sampleVenue}
                        </p>
                      </div>

                      {/* Hover Overlay Action Bar */}
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100 p-4">
                        <Link
                          href={`/templates/preview/${template.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-[#1a1714] shadow-md transition-transform hover:scale-105 dark:bg-[#1a1612] dark:text-white"
                        >
                          <Eye className="size-3.5" />
                          <span>{t.newInvitation.previewBtn}</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleSelectTemplate(template)}
                          className="flex items-center gap-1.5 rounded-lg bg-[#9f382f] px-3 py-2 text-xs font-semibold text-white shadow-md transition-transform hover:scale-105 dark:bg-[#e8b5a1] dark:text-[#1a1612]"
                        >
                          <Check className="size-3.5" />
                          <span>{t.newInvitation.selectTemplateBtn}</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Metadata Footer */}
                    <div className="p-4 border-t border-[#262320]/10 dark:border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3
                            className={`${
                              isAmharic
                                ? "font-geez font-semibold text-lg"
                                : "font-serif text-lg tracking-tight"
                            } text-[#1a1714] dark:text-[#f5f6f8]`}
                          >
                            {isAmharic ? template.nameAm : template.name}
                          </h3>
                          <p className="text-[11px] text-[#6c6660] dark:text-[#9b9490]">
                            {isAmharic ? template.tagAm : template.tag}
                          </p>
                        </div>

                        {/* Palette dots */}
                        <div className="flex items-center -space-x-1">
                          {template.palette.map((color, idx) => (
                            <span
                              key={idx}
                              className="size-3.5 rounded-full border border-white dark:border-[#1a1612]"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Features mini pills */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {(isAmharic
                          ? template.featuresAm
                          : template.features
                        )
                          .slice(0, 2)
                          .map((feature, idx) => (
                            <span
                              key={idx}
                              className="rounded-md bg-[#262320]/5 px-1.5 py-0.5 text-[9px] font-medium text-[#6c6660] dark:bg-white/5 dark:text-[#9b9490]"
                            >
                              ✓ {feature}
                            </span>
                          ))}
                      </div>

                      {/* Action buttons on card footer for quick access */}
                      <div className="mt-4 flex gap-2 pt-2 border-t border-[#262320]/10 dark:border-white/10">
                        <Link
                          href={`/templates/preview/${template.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-[#262320]/15 py-1.5 text-xs font-medium text-[#59534d] hover:bg-[#262320]/5 dark:border-white/10 dark:text-[#9b9490] dark:hover:bg-white/5 transition-colors"
                        >
                          <Eye className="size-3.5" />
                          <span>{t.newInvitation.previewBtn}</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleSelectTemplate(template)}
                          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[#9f382f] py-1.5 text-xs font-semibold text-white hover:bg-[#862e26] dark:bg-[#e8b5a1] dark:text-[#1a1612] dark:hover:bg-[#dfa48e] transition-colors"
                        >
                          <Check className="size-3.5" />
                          <span>{t.newInvitation.selectTemplateBtn}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ================= STEP 3: FINALIZE DRAFT ================= */}
        {step === 3 && selectedTemplate && (
          <section className="animate-in fade-in duration-300 mx-auto max-w-3xl">
            {isSuccess ? (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center sm:p-12">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-9" />
                </div>
                <h2
                  className={`mt-5 ${
                    isAmharic
                      ? "font-geez text-2xl font-semibold"
                      : "font-serif text-3xl tracking-tight"
                  } text-[#1a1714] dark:text-[#f5f6f8]`}
                >
                  {t.newInvitation.successTitle}
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-[#59534d] dark:text-[#9b9490]">
                  {t.newInvitation.successSubtitle}
                </p>
                <div className="mt-8 flex justify-center gap-3">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-xl bg-[#9f382f] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#862e26] dark:bg-[#e8b5a1] dark:text-[#1a1612]"
                  >
                    <LayoutGrid className="size-4" />
                    <span>{t.newInvitation.viewInDashboard}</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mb-4 inline-flex items-center gap-1 text-xs font-medium text-[#9f382f] dark:text-[#e8b5a1] hover:underline"
                >
                  <ArrowLeft className="size-3.5" />
                  {t.newInvitation.step2Title}
                </button>

                <div className="rounded-2xl border border-[#262320]/12 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-[#161820]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#262320]/10 dark:border-white/10 gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9f382f] dark:text-[#e8b5a1]">
                        {t.newInvitation.step3Kicker ?? "Step 03"}
                      </p>
                      <h2
                        className={`mt-1 ${
                          isAmharic
                            ? "font-geez text-2xl font-semibold"
                            : "font-serif text-2xl sm:text-3xl tracking-tight"
                        } text-[#1a1714] dark:text-[#f5f6f8]`}
                      >
                        {t.newInvitation.step3Title}
                      </h2>
                      <p className="mt-1 text-xs text-[#59534d] dark:text-[#9b9490]">
                        {t.newInvitation.step3Subtitle}
                      </p>
                    </div>

                    {/* Selected Template Chip */}
                    <div className="flex items-center gap-3 rounded-xl border border-[#262320]/10 bg-[#f8f7f5] p-2.5 dark:border-white/10 dark:bg-[#1a1612]">
                      <div className="relative size-11 shrink-0 overflow-hidden rounded-lg border border-[#262320]/15 dark:border-white/15">
                        <Image
                          src={customPhoto || selectedTemplate.placeholderImage}
                          alt={selectedTemplate.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-[#1a1714] dark:text-[#f5f6f8]">
                          {isAmharic
                            ? selectedTemplate.nameAm
                            : selectedTemplate.name}
                        </p>
                        <p className="text-[10px] text-[#6c6660] dark:text-[#9b9490]">
                          {isAmharic
                            ? selectedTemplate.categoryLabelAm
                            : selectedTemplate.categoryLabel}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="mt-6 space-y-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#59534d] dark:text-[#9b9490]">
                        {t.newInvitation.eventTitleLabel}
                      </label>
                      <input
                        type="text"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        placeholder={t.newInvitation.eventTitlePlaceholder}
                        className="mt-2 w-full rounded-xl border border-[#262320]/15 bg-[#f8f7f5] px-4 py-3 text-sm text-[#1a1714] outline-none transition-all focus:border-[#9f382f] focus:ring-1 focus:ring-[#9f382f] dark:border-white/10 dark:bg-[#111318] dark:text-[#f5f6f8] dark:focus:border-[#e8b5a1]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#59534d] dark:text-[#9b9490]">
                        {t.newInvitation.eventDateLabel}
                      </label>
                      <div className="relative mt-2">
                        <input
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full rounded-xl border border-[#262320]/15 bg-[#f8f7f5] px-4 py-3 text-sm text-[#1a1714] outline-none transition-all focus:border-[#9f382f] focus:ring-1 focus:ring-[#9f382f] dark:border-white/10 dark:bg-[#111318] dark:text-[#f5f6f8] dark:focus:border-[#e8b5a1]"
                        />
                      </div>
                    </div>

                    {/* Photo Upload & Replacement Section */}
                    <div className="rounded-xl border border-[#262320]/12 bg-[#f8f7f5]/80 p-5 dark:border-white/10 dark:bg-[#111318]/80">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#59534d] dark:text-[#9b9490]">
                            {t.newInvitation.photoLabel}
                          </label>
                          <p className="mt-1 text-xs text-[#6c6660] dark:text-[#9b9490]">
                            {t.newInvitation.photoHint}
                          </p>
                        </div>
                        <span
                          className={`self-start sm:self-auto rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                            customPhoto
                              ? "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                              : "bg-[#9f382f]/10 text-[#9f382f] dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]"
                          }`}
                        >
                          {customPhoto
                            ? t.newInvitation.customPhotoBadge
                            : t.newInvitation.defaultPhotoBadge}
                        </span>
                      </div>

                      {/* Photo Preview & Controls Grid */}
                      <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
                        {/* Current Photo Frame */}
                        <div className="relative mx-auto sm:mx-0 size-36 shrink-0 overflow-hidden rounded-2xl border-2 border-[#9f382f]/25 bg-black/5 shadow-md dark:border-white/15">
                          <Image
                            src={customPhoto || selectedTemplate.placeholderImage}
                            alt={eventTitle || "Invitation Photo"}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-1.5 text-center">
                            <span className="text-[9px] font-medium text-white">
                              {customPhoto
                                ? (isAmharic ? "የእርስዎ ፎቶ" : "Your Photo")
                                : (isAmharic ? "ባህላዊ ምሳሌ" : "Cultural Demo")}
                            </span>
                          </div>
                        </div>

                        {/* Upload & Dropzone Controls */}
                        <div className="flex-1 space-y-3">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            className="hidden"
                            onChange={handleFileSelect}
                          />

                          {/* Dropzone Container */}
                          <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition-all ${
                              isDragging
                                ? "border-[#9f382f] bg-[#9f382f]/10 dark:border-[#e8b5a1] dark:bg-[#e8b5a1]/10"
                                : "border-[#262320]/20 bg-white/70 hover:border-[#9f382f]/50 hover:bg-white dark:border-white/15 dark:bg-[#1a1612]/70 dark:hover:border-white/30"
                            }`}
                          >
                            <div className="flex size-9 items-center justify-center rounded-full bg-[#9f382f]/10 text-[#9f382f] dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]">
                              <Upload className="size-4" />
                            </div>
                            <p className="mt-2 text-xs font-medium text-[#1a1714] dark:text-[#f5f6f8]">
                              {t.newInvitation.dragDropText}
                            </p>
                            <p className="mt-0.5 text-[10px] text-[#6c6660] dark:text-[#9b9490]">
                              PNG, JPG, WebP
                            </p>
                          </div>

                          {/* Action Buttons: Change Photo & Reset to Cultural */}
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-[#9f382f] px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#862e26] dark:bg-[#e8b5a1] dark:text-[#1a1612] dark:hover:bg-[#dfa48e] transition-colors"
                            >
                              <Camera className="size-3.5" />
                              <span>
                                {customPhoto
                                  ? t.newInvitation.changePhotoBtn
                                  : t.newInvitation.uploadPhotoBtn}
                              </span>
                            </button>

                            {customPhoto && (
                              <button
                                type="button"
                                onClick={handleResetPhoto}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-[#262320]/15 bg-white px-3 py-1.5 text-xs font-medium text-[#59534d] hover:bg-[#262320]/5 dark:border-white/15 dark:bg-[#1a1612] dark:text-[#9b9490] dark:hover:bg-white/5 transition-colors"
                              >
                                <RotateCcw className="size-3.5" />
                                <span>{t.newInvitation.resetPhotoBtn}</span>
                              </button>
                            )}

                            {!customPhoto && (
                              <span className="text-[11px] text-[#6c6660] dark:text-[#9b9490] italic">
                                {isAmharic
                                  ? selectedTemplate.placeholderCaptionAm
                                  : selectedTemplate.placeholderCaption}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div className="rounded-xl border border-[#262320]/10 bg-[#f8f7f5] p-4 dark:border-white/10 dark:bg-[#111318]">
                      <p className="text-xs font-semibold text-[#1a1714] dark:text-[#f5f6f8]">
                        {t.newInvitation.featuresIncluded}
                      </p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {(isAmharic
                          ? selectedTemplate.featuresAm
                          : selectedTemplate.features
                        ).map((feat, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-[#59534d] dark:text-[#9b9490]"
                          >
                            <span className="flex size-4 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                              ✓
                            </span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={handleCreateDraft}
                        disabled={isSubmitting}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#9f382f] py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#862e26] dark:bg-[#e8b5a1] dark:text-[#1a1612] dark:hover:bg-[#dfa48e] transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            <span>{t.newInvitation.creatingDraftBtn}</span>
                          </>
                        ) : (
                          <>
                            <Check className="size-4" />
                            <span>{t.newInvitation.createDraftBtn}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="rounded-xl border border-[#262320]/15 px-6 py-3.5 text-sm font-medium text-[#59534d] hover:bg-[#262320]/5 dark:border-white/10 dark:text-[#9b9490] dark:hover:bg-white/5 transition-all"
                      >
                        {t.newInvitation.changeEventType}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

