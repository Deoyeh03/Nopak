import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import ProjectGallery from "@/components/ProjectGallery";
import ContactForm from "@/components/ContactForm";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <ServicesGrid />
      <ProjectGallery />
      <ContactForm />
      <FloatingWhatsApp />
    </main>
  );
}
