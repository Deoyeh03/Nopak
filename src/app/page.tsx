import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import ProjectGallery from "@/components/ProjectGallery";

import FloatingWhatsApp from "@/components/FloatingWhatsApp";

import { createClient } from "@/utils/supabase/server";

export const revalidate = 0; // Disable static rendering to ensure dynamic data is fetched

export default async function Home() {
  const supabase = await createClient();

  // Fetch settings
  const { data: settingsData } = await supabase.from("site_settings").select("*");
  const settings = settingsData?.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>) || {};

  // Fetch gallery assets
  const { data: assets } = await supabase
    .from("gallery_assets")
    .select("*")
    .order("created_at", { ascending: false });

  // Map category images for the ServicesGrid
  const categoryImages = assets?.reduce((acc, curr) => {
    // Only set if not already set, so the newest (due to order) or first found is used. 
    // Wait, order descending means newest is first. So if not set, newest is used!
    if (!acc[curr.category]) {
      acc[curr.category] = curr.url;
    }
    return acc;
  }, {} as Record<string, string>) || {};

  const galleryImages = assets?.map((a) => ({
    id: a.id,
    src: a.url,
    category: a.category,
  })) || [];

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection 
        title={settings.hero_title || "High-Quality Property & <br className='hidden md:block' /><span className='text-brand-gold'>Construction Solutions</span>"}
        subtitle={settings.hero_subtitle || "Premium services for Wendy Houses, Tree Felling, Renovations, Swimming Pools, and Plumbing across Gauteng."}
        phone={settings.contact_phone || "27678224890"}
        message={settings.whatsapp_message || "Hi Nopak Projects, I would like to request a quote..."}
      />
      <ServicesGrid categoryImages={categoryImages} />
      <ProjectGallery images={galleryImages} />
      <FloatingWhatsApp 
        phone={settings.contact_phone || "27678224890"}
        message={settings.whatsapp_message || "Hi Nopak Projects, I would like to request a quote..."}
      />
    </main>
  );
}
