import { createClient } from "@/lib/supabase/server";
import { TemplatesPublicView } from "@/components/templates-public-view";

export default async function TemplatesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <TemplatesPublicView isLoggedIn={Boolean(user)} />;
}

