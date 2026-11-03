import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  LayoutDashboard,
  User,
  LogOut,
  Plus,
  Edit,
  CreditCard,
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
  title: string;
  status: InvitationStatus;
  template: string;
  plan: string;
  date: string;
}

// ---------------------------------------------------------------------------
// Page (server component)
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
    "there";
  const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const initial = displayName.charAt(0).toUpperCase();

  // TODO: Replace with actual DB query when invitations table is created
  const invitations: Invitation[] = [];

  return (
    <div className="min-h-screen bg-[#141210] text-[#f5f0eb]">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                               */}
      {/* ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#141210]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Left — brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 no-underline"
            aria-label="Habesha Events home"
          >
            {/* Brand mark — inline circles (safe on dark bg) */}
            <span className="relative inline-flex h-[21px] w-[28px] shrink-0 items-center">
              <span className="absolute left-0 size-[19px] rounded-full border border-white/60" />
              <span className="absolute right-0 size-[19px] rounded-full border border-white/60" />
            </span>

            <span className="font-serif text-[20px] tracking-[-0.03em] text-[#f5f0eb]">
              Habesha Events
            </span>

            <span className="mx-1 h-5 w-px bg-white/15" aria-hidden="true" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#59534d]">
              Dashboard
            </span>
          </Link>

          {/* Center — nav (desktop only) */}
          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Main navigation"
          >
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-[13px] font-medium text-[#f5f0eb] no-underline transition-colors"
            >
              <LayoutDashboard size={14} />
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-1.5 text-[13px] font-medium text-[#8a827a] no-underline transition-colors hover:text-[#f5f0eb]"
            >
              <User size={14} />
              Profile
            </Link>
          </nav>

          {/* Right — language + avatar + sign out */}
          <div className="flex items-center gap-4">
            <span className="hidden text-[12px] uppercase tracking-[0.12em] text-[#59534d] sm:block">
              አማ
            </span>

            {/* Avatar */}
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#9f382f] text-[12px] font-semibold text-white"
              aria-label={`Signed in as ${displayName}`}
            >
              {initial}
            </span>

            {/* Sign-out */}
            <form action={signOut}>
              <button
                type="submit"
                className="flex items-center gap-1.5 text-[13px] text-[#8a827a] transition-colors hover:text-[#f5f0eb]"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Main content                                                         */}
      {/* ------------------------------------------------------------------ */}
      <main className="mx-auto max-w-[1320px] px-5 py-12 sm:px-8 lg:px-12">
        {/* Welcome row */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-start">
          <div>
            <p className="section-kicker">Your Dashboard</p>
            <h1
              className="font-serif leading-[.92] tracking-[-0.06em] text-[#f5f0eb]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              Welcome back, {displayName}.
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[#59534d]">
              Manage your invitations, guests, and payments.
            </p>
          </div>

          {/* New invitation CTA */}
          <Link
            href="#"
            className="mt-2 flex shrink-0 items-center gap-1.5 rounded-full bg-[#9f382f] px-5 py-3 text-[13px] font-medium text-white no-underline shadow-[0_10px_30px_rgba(159,56,47,.3)] transition-transform hover:-translate-y-0.5"
          >
            <Plus size={14} />
            New invitation
          </Link>
        </div>

        {/* Invitations section */}
        <section className="mt-12" aria-label="Your invitations">
          {invitations.length === 0 ? (
            /* ---- Empty state ---- */
            <div className="flex flex-col items-center rounded border border-white/[0.08] bg-[#1e1c1a] py-20 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-[#9f382f]/10 text-[#9f382f]">
                <Plus size={24} />
              </span>
              <h2 className="mt-5 font-serif text-2xl tracking-[-0.04em] text-[#f5f0eb]">
                Your first invitation awaits.
              </h2>
              <p className="mt-3 max-w-[340px] text-[14px] leading-6 text-[#59534d]">
                Create a beautiful bilingual invitation and share your special
                day with family and friends.
              </p>
              <Link
                href="#"
                className="mt-7 flex items-center gap-1.5 rounded-full bg-[#9f382f] px-5 py-3 text-[13px] font-medium text-white no-underline shadow-[0_10px_30px_rgba(159,56,47,.3)] transition-transform hover:-translate-y-0.5"
              >
                <Plus size={14} />
                Create your first invitation
              </Link>
            </div>
          ) : (
            /* ---- Cards ---- */
            <ul className="flex flex-col gap-3">
              {invitations.map((inv) => (
                <li
                  key={inv.id}
                  className="flex flex-col items-start justify-between gap-4 rounded border border-white/[0.08] bg-[#1e1c1a] px-6 py-5 sm:flex-row sm:items-center"
                >
                  {/* Left */}
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-xl tracking-[-0.03em] text-[#f5f0eb]">
                        {inv.title}
                      </span>
                      <InvitationStatusBadge status={inv.status} />
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#59534d]">
                      <span>
                        <span className="text-[#59534d]/60">Template</span>{" "}
                        {inv.template}
                      </span>
                      <span
                        className="size-1 rounded-full bg-white/20"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="text-[#59534d]/60">Plan</span>{" "}
                        {inv.plan}
                      </span>
                      <span
                        className="size-1 rounded-full bg-white/20"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="text-[#59534d]/60">Date</span>{" "}
                        {inv.date}
                      </span>
                    </div>
                  </div>

                  {/* Right — actions */}
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      className="flex items-center gap-1.5 rounded border border-white/15 px-3.5 py-2 text-[12px] text-[#b5aea8] transition-colors hover:border-white/30 hover:text-white"
                    >
                      <Edit size={13.5} />
                      Edit
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 rounded border border-white/15 px-3.5 py-2 text-[12px] text-[#b5aea8] transition-colors hover:border-white/30 hover:text-white"
                    >
                      <CreditCard size={13.5} />
                      Payment
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// InvitationStatusBadge
// ---------------------------------------------------------------------------
function InvitationStatusBadge({ status }: { status: InvitationStatus }) {
  const styles: Record<InvitationStatus, string> = {
    Draft: "border-white/15 text-[#8a827a]",
    Published: "border-[#486b62]/40 text-[#86b09f] bg-[#486b62]/10",
    Archived: "border-white/10 text-[#59534d]",
  };

  return (
    <span
      className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] ${styles[status]}`}
    >
      {status}
    </span>
  );
}
