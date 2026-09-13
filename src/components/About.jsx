// src/components/About.jsx
import React from "react";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <section className="p-8 md:p-16 bg-gray-900 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-4xl font-playfair text-center mb-8">About Me</h2>
        <p className="text-lg leading-relaxed text-gray-300">
          I am Aniket, a hybrid photographer and videographer who blends the timeless art of still images with the dynamic storytelling of video. My passion lies in capturing authentic moments—whether it’s the intimate emotions of a pre‑wedding shoot, the high‑energy vibe of a fashion editorial, or the polished professionalism of commercial projects. With a focus on elegant composition, meticulous lighting, and cinematic motion, I strive to create visual narratives that feel both premium and deeply personal.
        </p>
      </motion.div>
    </section>
  );
};
