// src/components/WorkGallery.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CategoryModal from "./CategoryModal";
import useAssets from "../hooks/useAssets";

export const WorkGallery = () => {
  const assets = useAssets();
  const [openCategory, setOpenCategory] = useState(null);

  // Build categories from loaded assets, excluding the "profile" section
  const categories = Object.keys(assets)
    .filter((cat) => cat.toLowerCase() !== "profile")
    .map((cat) => {
      const catPhotos = assets[cat]?.photos || [];
      const catVideos = assets[cat]?.videos || [];
      return {
        name: cat,
        cover: catPhotos[0] || "",
        totalPhotos: catPhotos.length,
        totalVideos: catVideos.length,
      };
    });

  return (
    <section className="p-8 md:p-16 bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-3">
            Featured Categories
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Click on any category to view full high-resolution galleries and cinematic reels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer h-64 rounded-2xl overflow-hidden bg-gray-800 relative group shadow-xl border border-gray-800 hover:border-indigo-500/50 transition-all duration-300"
              onClick={() => setOpenCategory(cat.name)}
            >
              {cat.cover ? (
                <img
                  src={cat.cover}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-gray-950">
                  <span className="text-3xl mb-2">🎬</span>
                  <span className="text-sm">View Media</span>
                </div>
              )}

              {/* Dark overlay & Information */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5">
                <span className="text-white text-2xl font-playfair font-bold drop-shadow-md">
                  {cat.name}
                </span>
                <span className="text-indigo-300 text-xs tracking-wider uppercase mt-1">
                  {cat.totalPhotos} Photos &bull; {cat.totalVideos} Videos
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Full View Modal */}
      <AnimatePresence>
        {openCategory && (
          <CategoryModal
            category={openCategory}
            onClose={() => setOpenCategory(null)}
            assets={assets[openCategory]}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
