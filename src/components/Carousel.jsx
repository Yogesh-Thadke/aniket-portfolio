// src/components/Carousel.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Swipe and button carousel with fixed height & proper flex layout
 */
export default function Carousel({ items = [], renderItem }) {
  const [index, setIndex] = useState(0);

  if (!items || items.length === 0) {
    return null;
  }

  const currentIdx = ((index % items.length) + items.length) % items.length;

  const next = () => setIndex((prev) => prev + 1);
  const prev = () => setIndex((prev) => prev - 1);

  return (
    <div className="relative w-full h-[65vh] min-h-[380px] max-h-[720px] flex items-center justify-center bg-black/40 rounded-xl overflow-hidden select-none">
      {/* Slide Item */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="w-full h-full flex items-center justify-center p-2"
        >
          {renderItem(items[currentIdx], currentIdx)}
        </motion.div>
      </AnimatePresence>

      {/* Prev button */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 hover:bg-indigo-600 text-white backdrop-blur border border-white/10 transition-all shadow-lg text-lg cursor-pointer"
          aria-label="Previous item"
        >
          &#10094;
        </button>
      )}

      {/* Next button */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 hover:bg-indigo-600 text-white backdrop-blur border border-white/10 transition-all shadow-lg text-lg cursor-pointer"
          aria-label="Next item"
        >
          &#10095;
        </button>
      )}

      {/* Counter indicator */}
      {items.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-xs font-mono border border-white/10">
          {currentIdx + 1} / {items.length}
        </div>
      )}
    </div>
  );
}
