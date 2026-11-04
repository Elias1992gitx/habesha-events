import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NewInvitationView } from "@/components/new-invitation-view";

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function NewInvitationPage() {
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

  return (
    <NewInvitationView
      displayName={displayName}
      initial={initial}
      signOutAction={signOut}
    />
  );
}

