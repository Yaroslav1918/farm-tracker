import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  if (token_hash && type) {
    const supabase = await createClient();
    const { data: userData, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error && userData.user) {
      const { id, user_metadata } = userData.user;
      const { name, is_inside_worker } = user_metadata;

      const { error: insertError } = await supabase.from("users").insert([
        {
          user_id: id,
          name,
          is_inside_worker,
        },
      ]);

      if (insertError) {
        redirect("/error");
      }

      redirect("/timer");
    }
  }

  redirect("/error");
}
