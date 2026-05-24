"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    title: "Swimming Pools",
    description: "Custom design, installation, and maintenance of premium swimming pools.",
    image: "/images/31490.jpg",
  },
  {
    title: "Wendy Houses",
    description: "High-quality, durable Wendy houses for storage, living, or office space.",
    image: "/images/31493.jpg",
  },
  {
    title: "Renovations",
    description: "Complete home and office renovations tailored to your aesthetic.",
    image: "/images/31496.jpg",
  },
  {
    title: "Tree Felling",
    description: "Safe and professional tree felling and removal services.",
    image: "/images/31499.jpg",
  },
  {
    title: "Plumbing",
    description: "Expert plumbing solutions for residential and commercial properties.",
    image: "/images/31508.jpg",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-24 px-4 md:px-8 bg-brand-blue" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Our <span className="text-brand-gold">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg"
          >
            We deliver exceptional craftsmanship across all our property and construction solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-brand-gold/50 transition-colors duration-300 flex flex-col items-center text-center"
            >
              {/* Circular Asymmetric Image Mask */}
              <div className="w-48 h-48 mb-6 overflow-hidden rounded-full shadow-lg shadow-black/50 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
