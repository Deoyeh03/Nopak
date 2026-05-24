"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

// Placeholder images since the 17 images are pending.
const galleryImages = [
  { id: 1, src: "/images/31490.jpg", category: "project" },
  { id: 2, src: "/images/31493.jpg", category: "project" },
  { id: 3, src: "/images/31496.jpg", category: "project" },
  { id: 4, src: "/images/31499.jpg", category: "project" },
  { id: 5, src: "/images/31508.jpg", category: "project" },
  { id: 6, src: "/images/31510.jpg", category: "project" },
  { id: 7, src: "/images/31512.jpg", category: "project" },
  { id: 8, src: "/images/31514.jpg", category: "project" },
  { id: 9, src: "/images/31515.jpg", category: "project" },
  { id: 10, src: "/images/31516.jpg", category: "project" },
  { id: 11, src: "/images/31517.jpg", category: "project" },
  { id: 12, src: "/images/31522.jpg", category: "project" },
  { id: 13, src: "/images/31524.jpg", category: "project" },
  { id: 14, src: "/images/31526.jpg", category: "project" },
  { id: 15, src: "/images/31527.jpg", category: "project" },
  { id: 16, src: "/images/31530.jpg", category: "project" },
  { id: 17, src: "/images/31532.jpg", category: "project" },
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
