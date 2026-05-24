import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/27678224890?text=Hi%20Nopak"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg shadow-green-500/30 hover:scale-110 transition-transform duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-50 pointer-events-none"></div>
      <MessageCircle className="w-8 h-8 relative z-10" />
    </a>
  );
}
