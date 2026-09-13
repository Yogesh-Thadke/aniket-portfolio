// src/components/CategoryModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Carousel from "./Carousel";

export default function CategoryModal({ category, onClose, assets }) {
  const photos = assets?.photos || [];
  const videos = assets?.videos || [];

  // Default to the tab that has items
  const [tab, setTab] = useState(() => (photos.length > 0 ? "photos" : "videos"));

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col p-6 relative shadow-2xl overflow-hidden"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header area */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-800 mb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-white tracking-wide">
                {category}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                {photos.length} {photos.length === 1 ? "Photo" : "Photos"} &bull; {videos.length} {videos.length === 1 ? "Video" : "Videos"}
              </p>
            </div>

            {/* Tab buttons */}
            <div className="flex items-center gap-2 bg-gray-950 p-1.5 rounded-xl border border-gray-800">
              <button
                type="button"
                onClick={() => setTab("photos")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  tab === "photos"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Photos ({photos.length})
              </button>
              <button
                type="button"
                onClick={() => setTab("videos")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  tab === "videos"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Videos ({videos.length})
              </button>
            </div>
          </div>

          {/* Media Content Viewer */}
          <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
            {tab === "photos" ? (
              photos.length > 0 ? (
                <Carousel
                  items={photos}
                  renderItem={(src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${category} photo ${i + 1}`}
                      className="max-w-full max-h-[62vh] object-contain rounded-lg shadow-xl select-none"
                    />
                  )}
                />
              ) : (
                <div className="py-20 text-center text-gray-400">
                  <p className="text-lg">No photos uploaded for this category yet.</p>
                </div>
              )
            ) : (
              videos.length > 0 ? (
                <Carousel
                  items={videos}
                  renderItem={(src, i) => (
                    <video
                      key={i}
                      src={src}
                      controls
                      autoPlay
                      playsInline
                      className="max-w-full max-h-[62vh] object-contain rounded-lg shadow-xl"
                    />
                  )}
                />
              ) : (
                <div className="py-20 text-center text-gray-400">
                  <p className="text-lg">No videos uploaded for this category yet.</p>
                </div>
              )
            )}
          </div>

          {/* Hint */}
          <div className="pt-3 text-center text-xs text-gray-500">
            Click outside anywhere to close
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
