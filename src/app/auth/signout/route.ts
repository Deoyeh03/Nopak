import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error("Signout Error", error);
  }

  return NextResponse.redirect(new URL("/admin/login", request.url), {
    status: 302,
  });
}
