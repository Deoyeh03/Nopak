"use client";

import { useState } from "热门";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

// Placeholder images since the 17 images are pending.
const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1576013551627-11971f36c9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "swimming_pools" },
  { id: 2, src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "wendy_houses" },
  { id: 3, src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "renovations" },
  { id: 4, src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "tree_felling" },
  { id: 5, src: "https://images.unsplash.com/photo-1607472586893-edb57cbce4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "plumbing" },
  { id: 6, src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "renovations" },
];

export default function ProjectGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-24 px-4 md:px-8 bg-brand-blue/95" id="gallery">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Proof of <span className="text-brand-gold">Work</span>
          </motion.h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Browse our recent projects showcasing our commitment to quality.
          </p>
        </div>

        {/* Masonry Layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => setSelectedImage(img.src)}
            >
              <Image
                src={img.src}
                alt={`Project ${img.category}`}
                width={800}
                height={600}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold tracking-wider uppercase text-sm">View</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-brand-gold transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
            >
              <Image
                src={selectedImage}
                alt="Enlarged Project"
                width={1200}
                height={900}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
