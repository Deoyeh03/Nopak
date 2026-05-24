"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  customer_name: z.string().min(2, "Name must be at least 2 characters"),
  mobile_number: z.string().min(10, "Please enter a valid phone number"),
  service_requested: z.enum(["Wendy Houses", "Tree Felling", "Renovations", "Swimming Pools", "Plumbing", "Other"], {
    message: "Please select a service"
  }),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
      } else {
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 px-4 md:px-8" id="contact">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/31515.jpg')" }}
      >
        <div className="absolute inset-0 bg-brand-blue/90"></div>
      </div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Get a <span className="text-brand-gold">Quote</span>
          </motion.h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Ready to start your project? Fill out the form below and we'll get back to you shortly.
          </p>
        </div>

        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">Thank You!</h3>
                <p className="text-gray-300 mb-8 text-lg">
                  We've received your request and will be in touch shortly to discuss your project.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-3 bg-brand-gold text-brand-blue font-bold rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="customer_name" className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input
                    {...register("customer_name")}
                    type="text"
                    id="customer_name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                    placeholder="John Doe"
                  />
                  {errors.customer_name && <p className="mt-1 text-red-400 text-sm">{errors.customer_name.message}</p>}
                </div>

                <div>
                  <label htmlFor="mobile_number" className="block text-sm font-medium text-gray-300 mb-2">Mobile Number *</label>
                  <input
                    {...register("mobile_number")}
                    type="tel"
                    id="mobile_number"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                    placeholder="076 123 4567"
                  />
                  {errors.mobile_number && <p className="mt-1 text-red-400 text-sm">{errors.mobile_number.message}</p>}
                </div>

                <div>
                  <label htmlFor="service_requested" className="block text-sm font-medium text-gray-300 mb-2">Service Required *</label>
                  <select
                    {...register("service_requested")}
                    id="service_requested"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all appearance-none"
                  >
                    <option value="" disabled selected className="text-gray-900">Select a service...</option>
                    <option value="Wendy Houses" className="text-gray-900">Wendy Houses</option>
                    <option value="Tree Felling" className="text-gray-900">Tree Felling</option>
                    <option value="Renovations" className="text-gray-900">Renovations</option>
                    <option value="Swimming Pools" className="text-gray-900">Swimming Pools</option>
                    <option value="Plumbing" className="text-gray-900">Plumbing</option>
                    <option value="Other" className="text-gray-900">Other</option>
                  </select>
                  {errors.service_requested && <p className="mt-1 text-red-400 text-sm">{errors.service_requested.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Additional Details (Optional)</label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all resize-none"
                    placeholder="Tell us more about your requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="w-full py-4 bg-brand-gold text-brand-blue font-bold rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Request a Quote"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
