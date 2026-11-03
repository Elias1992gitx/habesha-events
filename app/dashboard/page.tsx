import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  LayoutGrid,
  User as UserIcon,
  LogOut,
  Plus,
  Pencil,
  CreditCard,
  Monitor,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Server action — sign out
// ---------------------------------------------------------------------------
async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type InvitationStatus = "Draft" | "Published" | "Archived";

interface Invitation {
  id: string;
  couple1: string;
  couple2: string;
  status: InvitationStatus;
  template: string;
  plan: string;
  date: string;
}

// ---------------------------------------------------------------------------
// Page (Server Component)
// ---------------------------------------------------------------------------
export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // Derive display name & avatar initial
  const rawName =
    (user.user_metadata?.full_name as string | undefined) ??
    user.email?.split("@")[0] ??
    "Elias";
  const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const initial = displayName.charAt(0).toUpperCase();

  // Primary invitation matching the reference design layout
  // (Will be wired to Supabase database table when migrations are active)
  const invitations: Invitation[] = [
    {
      id: "inv-1",
      couple1: displayName || "Elias",
      couple2: "Hani",
      status: "Draft",
      template: "Habesha Classic",
      plan: "Bloom",
      date: "Nov 15, 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-[#111318] text-[#f5f6f8]">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#111318]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1360px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Left — brand mark + name + section title */}
          <Link
            href="/"
            className="flex items-center gap-3 no-underline transition-opacity hover:opacity-90"
            aria-label="Sergachen - Habesha Events"
          >
            {/* Two interlocking circles brand mark */}
            <span
              className="relative inline-flex h-[20px] w-[29px] shrink-0 items-center"
              aria-hidden="true"
            >
              <span className="absolute left-0 size-[18px] rounded-full border-[1.5px] border-white/80" />
              <span className="absolute right-0 size-[18px] rounded-full border-[1.5px] border-white/80" />
            </span>

            <span className="font-serif text-[19px] font-normal tracking-[-0.02em] text-[#f5f6f8]">
              Sergachen
            </span>

            <span className="mx-1.5 h-4 w-px bg-white/20" aria-hidden="true" />

            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#717684]">
              Dashboard
            </span>
          </Link>

          {/* Center — nav */}
          <nav
            className="hidden items-center gap-7 sm:flex"
            aria-label="Dashboard navigation"
          >
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-[13px] font-medium text-[#f5f6f8] no-underline transition-colors"
            >
              <LayoutGrid size={15} className="text-[#f5f6f8]" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-2 text-[13px] font-medium text-[#7e8492] no-underline transition-colors hover:text-[#f5f6f8]"
            >
              <UserIcon size={15} />
              <span>Profile</span>
            </Link>
          </nav>

          {/* Right — utility tools + avatar + sign out */}
          <div className="flex items-center gap-4 sm:gap-5">
            <button
              type="button"
              className="text-[#7e8492] transition-colors hover:text-[#f5f6f8]"
              title="Preview invitation view"
              aria-label="Preview invitation view"
            >
              <Monitor size={16} />
            </button>

            <span
              className="cursor-pointer text-[12px] font-medium text-[#7e8492] transition-colors hover:text-[#f5f6f8]"
              title="Language: Amharic"
            >
              አማ
            </span>

            {/* Avatar circle */}
            <span
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#351e20] text-[11px] font-medium text-[#e08279] border border-[#e08279]/20"
              aria-label={`Signed in as ${displayName}`}
            >
              {initial}
            </span>

            {/* Log out button */}
            <form action={signOut}>
              <button
                type="submit"
                className="flex items-center gap-1.5 text-[12px] font-normal text-[#7e8492] transition-colors hover:text-[#f5f6f8]"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Main content                                                       */}
      {/* ------------------------------------------------------------------ */}
      <main className="mx-auto max-w-[1360px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        {/* Top welcome row */}
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e15c51]">
              Your Dashboard
            </p>
            <h1 className="mt-2 font-serif text-3xl font-normal tracking-[-0.03em] text-[#f5f6f8] sm:text-4xl">
              Welcome back, {displayName}.
            </h1>
            <p className="mt-2 text-[14px] text-[#787f8f] sm:text-[15px]">
              Manage your invitations, guests, and payments.
            </p>
          </div>

          {/* + New invitation CTA button */}
          <Link
            href="#"
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#e15c51] px-4 py-2.5 text-[13px] font-medium text-white no-underline shadow-sm transition-all hover:bg-[#d44c41]"
          >
            <Plus size={15} />
            <span>New invitation</span>
          </Link>
        </div>

        {/* Invitations container */}
        <section className="mt-10" aria-label="Invitations">
          {invitations.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center rounded-2xl border border-white/[0.08] bg-[#161820]/70 px-6 py-20 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-[#e15c51]/10 text-[#e15c51]">
                <Plus size={24} />
              </span>
              <h2 className="mt-5 font-serif text-2xl tracking-[-0.03em] text-[#f5f6f8]">
                Your first invitation awaits.
              </h2>
              <p className="mt-2 max-w-[360px] text-[14px] leading-relaxed text-[#787f8f]">
                Create a beautiful bilingual invitation and share your special
                day with family and friends.
              </p>
              <Link
                href="#"
                className="mt-6 flex items-center gap-1.5 rounded-lg bg-[#e15c51] px-4 py-2.5 text-[13px] font-medium text-white no-underline transition-all hover:bg-[#d44c41]"
              >
                <Plus size={15} />
                <span>Create your first invitation</span>
              </Link>
            </div>
          ) : (
            /* Invitation list */
            <div className="flex flex-col gap-3.5">
              {invitations.map((inv) => (
                <article
                  key={inv.id}
                  className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-[#23262e] bg-[#161820]/80 p-5 sm:flex-row sm:items-center sm:px-6 sm:py-5"
                >
                  {/* Left: Couple names, status badge, metadata */}
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-xl tracking-[-0.02em] text-[#f5f6f8] sm:text-2xl">
                        {inv.couple1}
                        <span className="mx-2 font-serif font-light italic text-[#9b7e68]">
                          &
                        </span>
                        {inv.couple2}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-normal text-[#8f96a3]">
                        {inv.status}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-[#787f8f] sm:text-[13px]">
                      <div>
                        <span>Template</span>{" "}
                        <span className="font-medium text-[#d3d7e0]">
                          {inv.template}
                        </span>
                      </div>
                      <div>
                        <span>Plan</span>{" "}
                        <span className="font-medium text-[#d3d7e0]">
                          {inv.plan}
                        </span>
                      </div>
                      <div>
                        <span>Date</span>{" "}
                        <span className="font-medium text-[#d3d7e0]">
                          {inv.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Action buttons */}
                  <div className="flex shrink-0 items-center gap-2.5">
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2 text-xs font-medium text-[#c5cad3] transition-colors hover:border-white/20 hover:bg-white/[0.05] hover:text-[#f5f6f8]"
                    >
                      <Pencil size={13} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2 text-xs font-medium text-[#c5cad3] transition-colors hover:border-white/20 hover:bg-white/[0.05] hover:text-[#f5f6f8]"
                    >
                      <CreditCard size={13} />
                      <span>Payment</span>
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
