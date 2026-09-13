// src/hooks/useAssets.jsx
import { useEffect, useState } from "react";

// Vite's import.meta.glob can import files matching a pattern at build time.
// eager: true ensures all asset URLs are bundled and immediately available synchronously.
export default function useAssets() {
  const [assets, setAssets] = useState({});

  useEffect(() => {
    // Note: eager glob gets module objects with .default URL immediately
    const photoModules = import.meta.glob("../content/**/photos/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", { eager: true });
    const videoModules = import.meta.glob("../content/**/videos/*.{mp4,MP4,webm,WEBP,ogg,OGG}", { eager: true });

    const photos = {};
    const videos = {};

    // Helper to extract category name from file path
    // Example path: "../content/Fashion/photos/1000040420.jpg"
    const getCategory = (path) => {
      const normalized = path.replace(/\\/g, "/");
      const parts = normalized.split("/");
      const contentIdx = parts.findIndex((p) => p.toLowerCase() === "content");
      if (contentIdx >= 0 && contentIdx + 1 < parts.length) {
        return parts[contentIdx + 1];
      }
      const mediaIdx = parts.findIndex((p) => p.toLowerCase() === "photos" || p.toLowerCase() === "videos");
      if (mediaIdx > 0) {
        return parts[mediaIdx - 1];
      }
      return "";
    };

    for (const [path, mod] of Object.entries(photoModules)) {
      const url = mod.default || mod;
      const cat = getCategory(path);
      if (cat) {
        if (!photos[cat]) photos[cat] = [];
        photos[cat].push(url);
      }
    }

    for (const [path, mod] of Object.entries(videoModules)) {
      const url = mod.default || mod;
      const cat = getCategory(path);
      if (cat) {
        if (!videos[cat]) videos[cat] = [];
        videos[cat].push(url);
      }
    }

    const combined = {};
    const categories = new Set([...Object.keys(photos), ...Object.keys(videos)]);
    categories.forEach((cat) => {
      combined[cat] = {
        photos: photos[cat] || [],
        videos: videos[cat] || [],
      };
    });

    console.log("🚀 Assets loaded successfully:", combined);
    setAssets(combined);
  }, []);

  return assets;
}
