import { createClient } from "@/lib/supabase/server";

export default async function SupabaseTestPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("event_types")
    .select("*");

  if (error) {
    return (
      <div>
        <h1>Supabase Connection Error</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Supabase Connected Successfully!</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
