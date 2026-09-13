// src/components/Feedback.jsx
import React from "react";
import { motion } from "framer-motion";

export const Feedback = () => {
  const testimonials = [
    {
      name: "Rohit & Pooja",
      role: "Pre-Wedding Client",
      quote:
        "Aniket captured our pre-wedding shoot with pure magic. Every shot looks straight out of a Bollywood romance. His direction, ease behind the camera, and cinematic edits blew us away!",
      rating: 5,
      avatar: "💍",
    },
    {
      name: "Oracle Fitness Studio",
      role: "Commercial & Brand Shoot",
      quote:
        "The promo reels and gym photography shot by Aniket boosted our social engagement tenfold. His lightning-fast cuts, lighting techniques, and attention to energy are unmatched.",
      rating: 5,
      avatar: "⚡",
    },
    {
      name: "Sneha Roy",
      role: "Fashion & Editorial Model",
      quote:
        "Working with Aniket on my editorial lookbook was an absolute breeze. He understands framing, mood, and how to bring out natural confidence. Highly recommended!",
      rating: 5,
      avatar: "✨",
    },
  ];

  return (
    <section className="p-8 md:p-16 bg-gray-950 border-t border-gray-800/80" id="feedback">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-indigo-400 font-semibold text-xs md:text-sm tracking-widest uppercase">
            Client Words &amp; Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mt-2 mb-4">
            Client Testimonials
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-base">
            Honest feedback and experiences shared by clients, brands, and creative partners.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-gray-900/90 rounded-2xl p-8 border border-gray-800 shadow-xl flex flex-col justify-between relative group hover:border-indigo-500/40 transition-all duration-300"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center space-x-1 text-amber-400 text-lg mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-gray-300 leading-relaxed italic text-sm md:text-base">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-800/80">
                <div className="w-11 h-11 rounded-full bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-white font-semibold font-playfair text-base">
                    {t.name}
                  </h4>
                  <p className="text-indigo-400 text-xs tracking-wide">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
