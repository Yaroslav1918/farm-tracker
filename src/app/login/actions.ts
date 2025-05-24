"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
   
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/timer");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const isInsideWorker = formData.get("isInsideWorker") === "on";
  

  await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        is_inside_worker: isInsideWorker,
      },
    },
  });

  revalidatePath("/", "layout");
  redirect("/auth/verify");
}
