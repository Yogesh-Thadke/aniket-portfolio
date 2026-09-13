// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import useAssets from "../hooks/useAssets";

export const Hero = () => {
  const assets = useAssets();
  const profilePhotos = assets?.profile?.photos || [];

  // Main featured profile photo (portrait) or fallback
  const mainPhoto = profilePhotos[0];
  const secondaryPhoto = profilePhotos[1];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-950 px-6 py-16 md:px-16">
      {/* Background subtle glow effect */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-12 z-10">
        {/* Left Side: Headline & Bio */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block uppercase tracking-widest text-indigo-400 font-semibold text-xs md:text-sm mb-3">
            Visual Storyteller & Creator
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-tight mb-6">
            Hybrid Photographer &amp; Videographer
          </h1>
          <p className="font-inter text-base sm:text-lg text-gray-300 max-w-lg mb-8 leading-relaxed">
            Capturing emotions through cinematic lenses and timeless frames. Specialized in Fashion, Commercial, Events, and Cinematic Pre-weddings.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg hover:shadow-indigo-500/25 transition-all"
            >
              Explore Portfolio
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 hover:border-gray-500 font-medium transition-all"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>

        {/* Right Side: Big Rectangular Profile Photo Showcase */}
        <motion.div
          className="md:w-1/2 w-full flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900 group">
            {mainPhoto ? (
              <img
                src={mainPhoto}
                alt="Aniket - Hybrid Photographer & Videographer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Loading profile image...
              </div>
            )}

            {/* Optional secondary badge photo overlay if available */}
            {secondaryPhoto && (
              <div className="absolute bottom-4 right-4 w-28 h-36 rounded-xl overflow-hidden border-2 border-indigo-500 shadow-xl hidden sm:block">
                <img
                  src={secondaryPhoto}
                  alt="Aniket Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Gradient overlay at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 text-left pointer-events-none">
              <p className="text-white font-playfair font-semibold text-xl drop-shadow">Aniket Kadam</p>
              <p className="text-indigo-300 text-xs tracking-wider uppercase font-sans">Photographer & Filmmaker</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
