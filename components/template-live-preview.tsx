"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  ExternalLink,
  Heart,
  MapPin,
  MessageSquare,
  Monitor,
  Music,
  Share2,
  Smartphone,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/hooks/use-language";
import type { TemplateItem } from "@/lib/templates-data";

interface TemplateLivePreviewProps {
  template: TemplateItem;
}

export function TemplateLivePreview({ template }: TemplateLivePreviewProps) {
  const router = useRouter();
  const { isAmharic } = useLanguage();

  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");
  const [rsvpStatus, setRsvpStatus] = useState<"attending" | "regrets" | null>(
    null
  );
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [guestNote, setGuestNote] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Simulated countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 36,
    seconds: 20,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return {
          days: Math.max(0, prev.days - 1),
          hours: 23,
          minutes: 59,
          seconds: 59,
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUseTemplate = () => {
    router.push(`/register?template=${template.id}`);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpStatus) return;
    setRsvpSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f3f0ea] text-[#262320] dark:bg-[#0e1014] dark:text-[#f0ece6]">
      {/* Floating Top Control Bar */}
      <header className="sticky top-0 z-50 border-b border-[#262320]/10 bg-white/95 backdrop-blur-md dark:border-white/10 dark:bg-[#161820]/95 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#262320]/15 px-3 py-1.5 text-xs font-medium text-[#59534d] hover:bg-[#262320]/5 dark:border-white/15 dark:text-[#9b9490] dark:hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span className="hidden sm:inline">
                {isAmharic ? "ወደ አብነቶች ተመለስ" : "Back to Templates"}
              </span>
              <span className="sm:hidden">{isAmharic ? "ተመለስ" : "Back"}</span>
            </Link>

            <div className="hidden md:block">
              <span className="font-serif text-sm font-semibold text-[#262320] dark:text-[#f0ece6]">
                {isAmharic ? template.nameAm : template.name}
              </span>
              <span className="ml-2 rounded-full bg-[#9f382f]/10 px-2 py-0.5 text-[10px] font-medium text-[#9f382f] dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]">
                {isAmharic ? template.tagAm : template.tag}
              </span>
            </div>
          </div>

          {/* View Mode Toggle (Mobile vs Desktop) */}
          <div className="flex items-center gap-1 rounded-xl border border-[#262320]/10 bg-[#f8f7f5] p-1 dark:border-white/10 dark:bg-black/30">
            <button
              type="button"
              onClick={() => setViewMode("mobile")}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                viewMode === "mobile"
                  ? "bg-[#9f382f] text-white shadow-xs dark:bg-[#e8b5a1] dark:text-[#1a1612]"
                  : "text-[#6c6660] hover:text-[#262320] dark:text-[#9b9490]"
              }`}
            >
              <Smartphone className="size-3.5" />
              <span className="hidden sm:inline">
                {isAmharic ? "የስልክ ዕይታ" : "Phone View"}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("desktop")}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                viewMode === "desktop"
                  ? "bg-[#9f382f] text-white shadow-xs dark:bg-[#e8b5a1] dark:text-[#1a1612]"
                  : "text-[#6c6660] hover:text-[#262320] dark:text-[#9b9490]"
              }`}
            >
              <Monitor className="size-3.5" />
              <span className="hidden sm:inline">
                {isAmharic ? "ሙሉ ዕይታ" : "Full View"}
              </span>
            </button>
          </div>

          {/* Actions & CTA */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageToggle />

            <button
              type="button"
              onClick={handleUseTemplate}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#9f382f] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#862e26] dark:bg-[#e8b5a1] dark:text-[#1a1612] dark:hover:bg-[#dfa48e] transition-all"
            >
              <span>{isAmharic ? "ይህን አብነት ተጠቀም" : "Use This Template"}</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Preview Container */}
      <main className="py-8 px-4 sm:px-6">
        <div
          className={`mx-auto transition-all duration-300 ${
            viewMode === "mobile"
              ? "max-w-[420px] rounded-[44px] border-[10px] border-[#221f1d] dark:border-[#302c28] shadow-2xl overflow-hidden bg-white dark:bg-[#1a1816]"
              : "max-w-4xl rounded-3xl border border-[#262320]/15 dark:border-white/10 shadow-xl overflow-hidden bg-white dark:bg-[#1a1816]"
          }`}
        >
          {/* Mobile phone notch simulation */}
          {viewMode === "mobile" && (
            <div className="relative h-6 bg-[#221f1d] dark:bg-[#302c28] flex items-center justify-center">
              <div className="h-4 w-28 rounded-b-xl bg-[#161413] flex items-center justify-center gap-2">
                <span className="size-2 rounded-full bg-black/60" />
                <span className="size-1.5 rounded-full bg-blue-500/50" />
              </div>
            </div>
          )}

          {/* Invitation Content Area */}
          <div className="relative">
            {/* Music Player floating pill */}
            <div className="absolute top-4 right-4 z-20">
              <button
                type="button"
                onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold backdrop-blur-md shadow-md transition-all ${
                  isPlayingMusic
                    ? "bg-[#9f382f] text-white animate-pulse"
                    : "bg-white/90 text-[#262320] border border-[#262320]/10 dark:bg-black/70 dark:text-white"
                }`}
              >
                <Music className="size-3.5" />
                <span>
                  {isPlayingMusic
                    ? isAmharic
                      ? "ሙዚቃ እየተጫወተ ነው"
                      : "Music Playing"
                    : isAmharic
                    ? "ሙዚቃ አጫውት"
                    : "Play Music"}
                </span>
              </button>
            </div>

            {/* SECTION 1: HERO / COVER */}
            <section
              className={`relative flex min-h-[520px] flex-col items-center justify-center px-6 py-16 text-center bg-gradient-to-br ${template.gradientBg}`}
            >
              {/* Inner Frame */}
              <div
                className={`w-full max-w-md rounded-2xl border ${template.borderAccent} ${template.innerBg} p-8 text-center shadow-lg backdrop-blur-xs`}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-[#9f382f]/10 px-3 py-1 text-xs font-semibold text-[#9f382f] dark:bg-[#e8b5a1]/20 dark:text-[#e8b5a1]">
                  <Sparkles className="size-3" />
                  <span className="font-geez">ጥሪ · INVITATION</span>
                </div>

                <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-[#6c6660] dark:text-[#9b9490]">
                  {isAmharic
                    ? template.sampleSubtitleAm
                    : template.sampleSubtitle}
                </p>

                <h1
                  className={`mt-4 ${
                    isAmharic
                      ? "font-geez text-3xl sm:text-4xl font-bold leading-tight"
                      : "font-serif text-3xl sm:text-4xl tracking-tight"
                  } text-[#262320] dark:text-[#f0ece6]`}
                >
                  {isAmharic
                    ? template.sampleCoupleAm
                    : template.sampleCouple}
                </h1>

                {/* Cultural Placeholder Portrait Arch */}
                <div className="relative mx-auto my-5 h-64 w-48 overflow-hidden rounded-t-[5rem] rounded-b-2xl border-2 border-[#9f382f]/25 shadow-md">
                  <Image
                    src={template.placeholderImage}
                    alt={
                      isAmharic
                        ? template.placeholderCaptionAm
                        : template.placeholderCaption
                    }
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2 text-center">
                    <span className="rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
                      {isAmharic ? "ባህላዊ ምሳሌ ፎቶ" : "Cultural Demo Photo"}
                    </span>
                    <p className="mt-1 text-[9px] text-white/90 line-clamp-1">
                      {isAmharic
                        ? template.placeholderCaptionAm
                        : template.placeholderCaption}
                    </p>
                  </div>
                </div>

                {/* Cultural Placeholder Explanatory Note */}
                <div className="mx-auto mb-3 max-w-xs rounded-lg border border-[#262320]/10 bg-white/75 px-3 py-1.5 text-center text-[11px] text-[#6c6660] dark:border-white/10 dark:bg-black/40 dark:text-[#a09a94]">
                  💡 {isAmharic
                    ? "ይህ የኢትዮጵያ ባህላዊ ምሳሌ ፎቶ ነው። ግብዣዎን ሲያዘጋጁ በራስዎ ፎቶ መተካት ይችላሉ።"
                    : "Authentic Ethiopian celebration placeholder. Replaceable with your own photo when customizing."}
                </div>

                <div className="mx-auto my-5 h-px w-16 bg-[#262320]/25 dark:bg-white/25" />

                <p className="text-sm font-semibold text-[#403833] dark:text-[#d3d0cc]">
                  {isAmharic ? template.sampleDateAm : template.sampleDate}
                </p>

                <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-[#6c6660] dark:text-[#9b9490]">
                  <MapPin className="size-3.5 text-[#9f382f] dark:text-[#e8b5a1]" />
                  <span>
                    {isAmharic
                      ? template.sampleVenueAm
                      : template.sampleVenue}
                  </span>
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="mt-8 flex items-center justify-center gap-3">
                {[
                  {
                    val: timeLeft.days,
                    label: isAmharic ? "ቀናት" : "Days",
                  },
                  {
                    val: timeLeft.hours,
                    label: isAmharic ? "ሰዓታት" : "Hours",
                  },
                  {
                    val: timeLeft.minutes,
                    label: isAmharic ? "ደቂቃዎች" : "Mins",
                  },
                  {
                    val: timeLeft.seconds,
                    label: isAmharic ? "ሰከንዶች" : "Secs",
                  },
                ].map((slot, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center rounded-xl border border-[#262320]/10 bg-white/85 px-3 py-2 shadow-xs backdrop-blur-xs dark:border-white/10 dark:bg-black/40 min-w-[56px]"
                  >
                    <span className="font-serif text-lg font-bold text-[#262320] dark:text-white">
                      {String(slot.val).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-[#6c6660] dark:text-[#9b9490]">
                      {slot.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 2: SCHEDULE / PROGRAM */}
            <section className="border-t border-[#262320]/10 bg-[#fcfaf7] px-6 py-12 dark:border-white/10 dark:bg-[#181614]">
              <div className="mx-auto max-w-md text-center">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9f382f] dark:text-[#e8b5a1]">
                  {isAmharic ? "የበዓሉ መርሐግብር" : "Order of Events"}
                </span>
                <h2
                  className={`mt-1 ${
                    isAmharic
                      ? "font-geez text-2xl font-semibold"
                      : "font-serif text-2xl"
                  } text-[#262320] dark:text-[#f0ece6]`}
                >
                  {isAmharic ? "የቀኑ ፕሮግራም" : "Program Timeline"}
                </h2>

                <div className="mt-8 space-y-4 text-left">
                  {[
                    {
                      time: "10:00 AM",
                      timeAm: "ከጠዋቱ 4:00",
                      title: "Arrival & Welcome Reception",
                      titleAm: "እንግዶችን በክብር መቀበል",
                      desc: "Welcome drinks & traditional Ethiopian coffee ceremony",
                      descAm: "የቡና ስነ-ስርዓትና የቀዝቃዛ መጠጦች መስተንግዶ",
                    },
                    {
                      time: "12:30 PM",
                      timeAm: "ከቀኑ 6:30",
                      title: "The Ceremony & Grand Entrance",
                      titleAm: "የክብር መግቢያና ስነ-ስርዓት",
                      desc: "Sacred vows, blessing from elders, and family toast",
                      descAm: "የቃልኪዳን ፊርማ፣ የሽማግሌዎች ምርቃትና የክብር ሰላምታ",
                    },
                    {
                      time: "2:00 PM",
                      timeAm: "ከቀኑ 8:00",
                      title: "Feast & Cultural Celebration",
                      titleAm: "የምሳ ግብዣና ባህላዊ ጭፈራ",
                      desc: "Traditional banquet buffet, live music, and dancing",
                      descAm: "ደማቅ የሐበሻ ባህላዊ ድግስ፣ ጭፈራና የደስታ አከባበር",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 rounded-xl border border-[#262320]/10 bg-white p-4 shadow-xs dark:border-white/10 dark:bg-[#201c18]"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#9f382f]/10 text-xs font-bold text-[#9f382f] dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]">
                        <Clock className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#9f382f] dark:text-[#e8b5a1]">
                          {isAmharic ? item.timeAm : item.time}
                        </p>
                        <h3 className="text-sm font-semibold text-[#262320] dark:text-[#f0ece6]">
                          {isAmharic ? item.titleAm : item.title}
                        </h3>
                        <p className="text-xs text-[#6c6660] dark:text-[#9b9490]">
                          {isAmharic ? item.descAm : item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 3: VENUE & DIRECTIONS */}
            <section className="border-t border-[#262320]/10 bg-white px-6 py-12 dark:border-white/10 dark:bg-[#1a1816]">
              <div className="mx-auto max-w-md text-center">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9f382f] dark:text-[#e8b5a1]">
                  {isAmharic ? "የቦታው መረጃ" : "Location & Directions"}
                </span>
                <h2
                  className={`mt-1 ${
                    isAmharic
                      ? "font-geez text-2xl font-semibold"
                      : "font-serif text-2xl"
                  } text-[#262320] dark:text-[#f0ece6]`}
                >
                  {isAmharic ? "የበዓሉ አዳራሽ" : "Venue Directions"}
                </h2>

                <div className="mt-6 rounded-2xl border border-[#262320]/12 bg-[#fbfaf7] p-6 text-center dark:border-white/10 dark:bg-[#201c18]">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#9f382f]/10 text-[#9f382f] dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]">
                    <MapPin className="size-6" />
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-[#262320] dark:text-[#f0ece6]">
                    {isAmharic ? template.sampleVenueAm : template.sampleVenue}
                  </h3>
                  <p className="mt-1 text-xs text-[#6c6660] dark:text-[#9b9490]">
                    Addis Ababa, Ethiopia · Free Valet Parking Available
                  </p>

                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-[#262320] px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-black dark:bg-white dark:text-[#1a1816] transition-colors"
                  >
                    <span>{isAmharic ? "በጉግል ካርታ ክፈት" : "Open in Google Maps"}</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 4: INTERACTIVE RSVP FORM */}
            <section className="border-t border-[#262320]/10 bg-[#f8f6f2] px-6 py-12 dark:border-white/10 dark:bg-[#141210]">
              <div className="mx-auto max-w-md text-center">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9f382f] dark:text-[#e8b5a1]">
                  {isAmharic ? "የተሳትፎ ማረጋገጫ" : "RSVP Confirmation"}
                </span>
                <h2
                  className={`mt-1 ${
                    isAmharic
                      ? "font-geez text-2xl font-semibold"
                      : "font-serif text-2xl"
                  } text-[#262320] dark:text-[#f0ece6]`}
                >
                  {isAmharic ? "መገኘትዎን ያረጋግጡ" : "Will You Attend?"}
                </h2>
                <p className="mt-1 text-xs text-[#6c6660] dark:text-[#9b9490]">
                  {isAmharic
                    ? "እባክዎን ምላሽዎን አስቀድመው ያሳውቁን።"
                    : "Please respond by September 1st, 2026."}
                </p>

                {rsvpSubmitted ? (
                  <div className="mt-6 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-6 text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      <Check className="size-6" />
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-emerald-800 dark:text-emerald-300">
                      {isAmharic ? "ምላሽዎ ተመዝግቧል!" : "Response Recorded!"}
                    </h3>
                    <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">
                      {isAmharic
                        ? "በበዓሉ ላይ ለመገናኘት ጓጉተናል።"
                        : "Thank you! We can't wait to celebrate with you."}
                    </p>
                    <button
                      type="button"
                      onClick={() => setRsvpSubmitted(false)}
                      className="mt-4 text-xs font-medium text-emerald-800 underline dark:text-emerald-300"
                    >
                      {isAmharic ? "እንደገና ምላሽ ስጥ" : "Submit another response"}
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleRsvpSubmit}
                    className="mt-6 space-y-4 text-left rounded-2xl border border-[#262320]/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1a1816]"
                  >
                    {/* Attendance Radio Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRsvpStatus("attending")}
                        className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-xs font-semibold transition-all ${
                          rsvpStatus === "attending"
                            ? "border-[#9f382f] bg-[#9f382f] text-white shadow-xs dark:bg-[#e8b5a1] dark:text-[#1a1612]"
                            : "border-[#262320]/15 text-[#59534d] hover:bg-[#262320]/5 dark:border-white/10 dark:text-[#9b9490]"
                        }`}
                      >
                        <Check className="size-4" />
                        <span>{isAmharic ? "በደስታ እገኛለሁ" : "Attending"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRsvpStatus("regrets")}
                        className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-xs font-semibold transition-all ${
                          rsvpStatus === "regrets"
                            ? "border-[#262320] bg-[#262320] text-white shadow-xs dark:bg-white dark:text-[#1a1816]"
                            : "border-[#262320]/15 text-[#59534d] hover:bg-[#262320]/5 dark:border-white/10 dark:text-[#9b9490]"
                        }`}
                      >
                        <X className="size-4" />
                        <span>{isAmharic ? "አልችልም" : "Regrets"}</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-[#59534d] dark:text-[#9b9490]">
                        {isAmharic ? "ሙሉ ስም" : "Your Full Name"}
                      </label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder={
                          isAmharic ? "ለምሳሌ፡ ዮናስ አለሙ" : "e.g., Yonas Alemu"
                        }
                        className="mt-1 w-full rounded-xl border border-[#262320]/15 bg-[#fbfaf7] px-3.5 py-2.5 text-xs outline-none focus:border-[#9f382f] dark:border-white/10 dark:bg-[#201c18] dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-[#59534d] dark:text-[#9b9490]">
                        {isAmharic ? "የተጋባዦች ብዛት" : "Number of Guests (+1)"}
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-[#262320]/15 bg-[#fbfaf7] px-3.5 py-2.5 text-xs outline-none focus:border-[#9f382f] dark:border-white/10 dark:bg-[#201c18] dark:text-white"
                      >
                        <option value="1">
                          1 {isAmharic ? "ሰው (እኔ ብቻ)" : "Guest"}
                        </option>
                        <option value="2">
                          2 {isAmharic ? "ሰዎች (+1)" : "Guests (+1)"}
                        </option>
                        <option value="3">
                          3 {isAmharic ? "ሰዎች (+2)" : "Guests (+2)"}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-[#59534d] dark:text-[#9b9490]">
                        {isAmharic
                          ? "የመልካም ምኞት መልዕክት"
                          : "Warm Wishes & Dietary Notes"}
                      </label>
                      <textarea
                        rows={2}
                        value={guestNote}
                        onChange={(e) => setGuestNote(e.target.value)}
                        placeholder={
                          isAmharic
                            ? "እንኳን ደስ አላችሁ! 🎉"
                            : "Congratulations! So excited to celebrate!"
                        }
                        className="mt-1 w-full rounded-xl border border-[#262320]/15 bg-[#fbfaf7] px-3.5 py-2.5 text-xs outline-none focus:border-[#9f382f] dark:border-white/10 dark:bg-[#201c18] dark:text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!rsvpStatus}
                      className="w-full rounded-xl bg-[#9f382f] py-3 text-xs font-semibold text-white shadow-xs hover:bg-[#862e26] dark:bg-[#e8b5a1] dark:text-[#1a1612] disabled:opacity-40 transition-all"
                    >
                      {isAmharic ? "ምላሽህን ላክ" : "Submit RSVP Response"}
                    </button>
                  </form>
                )}
              </div>
            </section>

            {/* SECTION 5: FOOTER */}
            <footer className="border-t border-[#262320]/10 bg-white px-6 py-8 text-center text-xs text-[#6c6660] dark:border-white/10 dark:bg-[#1a1816] dark:text-[#9b9490]">
              <p className="font-serif text-sm font-semibold text-[#262320] dark:text-[#f0ece6]">
                Habesha Events
              </p>
              <p className="mt-1">
                {isAmharic
                  ? "ዲጂታል የግብዣ ጥሪዎች ለሁሉም ክብረ በዓላት"
                  : "Digital invitations for the moments that matter"}
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleUseTemplate}
                  className="rounded-full bg-[#9f382f]/10 px-4 py-1.5 text-xs font-semibold text-[#9f382f] hover:bg-[#9f382f]/20 dark:bg-[#e8b5a1]/15 dark:text-[#e8b5a1]"
                >
                  {isAmharic
                    ? "የራስዎን ግብዣ በዚህ አብነት ያዘጋጁ"
                    : "Create your invitation with this template"}
                </button>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
