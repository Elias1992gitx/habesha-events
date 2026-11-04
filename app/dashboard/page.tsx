import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardView, type Invitation } from "@/components/dashboard-view";

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const rawName =
    (user.user_metadata?.full_name as string | undefined) ??
    user.email?.split("@")[0] ??
    "";
  const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const initial = displayName.charAt(0).toUpperCase();

  const invitations: Invitation[] = [
    {
      id: "inv-1",
      couple1: displayName || "",
      couple2: "Hani",
      status: "Draft",
      template: "Habesha Classic",
      plan: "Bloom",
      date: "Nov 15, 2026",
    },
  ];

  return (
    <DashboardView
      displayName={displayName}
      initial={initial}
      invitations={invitations}
      signOutAction={signOut}
    />
  );
}
