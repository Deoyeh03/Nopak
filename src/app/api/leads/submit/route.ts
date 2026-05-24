import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import * as z from "zod";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

const supabase = createClient(supabaseUrl, supabaseKey);

const leadSchema = z.object({
  customer_name: z.string().min(2).max(255),
  mobile_number: z.string().min(10).max(50),
  service_requested: z.enum(["Wendy Houses", "Tree Felling", "Renovations", "Swimming Pools", "Plumbing", "Other"]),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Input Validation
    const validatedData = leadSchema.parse(body);

    // 2. Action 1: Database Insert
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          customer_name: validatedData.customer_name,
          mobile_number: validatedData.mobile_number,
          service_requested: validatedData.service_requested,
          message: validatedData.message,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to submit lead" }, { status: 500 });
    }

    // 3. Action 2: Response
    return NextResponse.json({ success: true, lead: data }, { status: 200 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
