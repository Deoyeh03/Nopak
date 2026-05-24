import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = formData.get("category") as string || "General";
    const caption = formData.get("caption") as string || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Optimize with sharp
    const optimizedBuffer = await sharp(buffer)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    // Upload to Supabase Storage
    const fileName = `${uuidv4()}.webp`;
    const storagePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("nopak-public-assets")
      .upload(storagePath, optimizedBuffer, {
        contentType: "image/webp",
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload to storage" }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("nopak-public-assets")
      .getPublicUrl(storagePath);

    // Insert into gallery_assets table
    const { data: insertData, error: insertError } = await supabase
      .from("gallery_assets")
      .insert([
        {
          url: publicUrl,
          storage_path: storagePath,
          category,
          caption,
          uploaded_by: user.id,
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error("DB insert error:", insertError);
      return NextResponse.json({ error: "Failed to save asset metadata" }, { status: 500 });
    }

    return NextResponse.json({ success: true, asset: insertData }, { status: 200 });
  } catch (error) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
