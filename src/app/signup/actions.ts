"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma"; 

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const isInsideWorker = formData.get("insideWorker") === "true";


  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Signup error:", error.message);
    return;
  }

  const user = data.user;

  if (!user) {
    console.error("Signup failed: no user returned");
    return;
  }

  try {
    await prisma.user.create({
      data: {
        user_id: user.id,
        email,
        name,
        isInsideWorker,
      },
    });
  } catch (e) {
    console.error("Prisma user create error:", e);
  }

  revalidatePath("/", "layout");
  redirect("/auth/verify");
}
