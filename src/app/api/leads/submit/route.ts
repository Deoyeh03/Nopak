import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import * as z from "zod";

// Initialize Supabase admin client (requires service role key to bypass RLS for inserts if needed, 
// though the RLS policy allows public inserts, so anon key would also work. 
// Using service role for backend operations is often safer for other queries, but here anon is fine if configured).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

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

    // 3. Action 2: Notification (Mocked for now until Resend/Twilio keys are provided)
    // TODO: Integrate Resend or Twilio here
    console.log(`[Notification] New lead received from ${validatedData.customer_name} for ${validatedData.service_requested}. Phone: ${validatedData.mobile_number}`);

    // 4. Action 3: Response
    return NextResponse.json({ success: true, lead: data }, { status: 200 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 });
    }
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
