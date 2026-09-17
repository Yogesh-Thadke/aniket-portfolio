// src/hooks/useAssets.jsx
//
// HOW TO ADD NEW MEDIA OR CATEGORIES:
// 1. Drop new files into src/content/<CategoryName>/photos/ or videos/
//    (Create a new folder for a brand new category e.g. src/content/Weddings/)
// 2. Run: c
//    This auto-uploads new files and updates cloudinary_assets.json.
// 3. git add . && git commit -m "add new media" && git push
//    Live site updates automatically. No code edits needed!
//
import { useState, useEffect } from "react";

export default function useAssets() {
  const [assets, setAssets] = useState({});

  useEffect(() => {
    // ── Cloudinary mode (production) ──────────────────────────────────────────
    // Fetch the auto-generated JSON file of all Cloudinary URLs.
    // Any new category/folder added via uploadToCloudinary.js shows up here automatically.
    fetch("/cloudinary_assets.json")
      .then((res) => {
        if (!res.ok) throw new Error("cloudinary_assets.json not found");
        return res.json();
      })
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          console.log("🌐 Assets loaded from Cloudinary:", data);
          setAssets(data);
        }
      })
      .catch(() => {
        // ── Local fallback mode (dev without Cloudinary JSON) ──────────────────
        // Scans local src/content/ via Vite glob. Used before first upload.
        console.warn("⚠️ cloudinary_assets.json not found. Falling back to local files.");

        const photoModules = import.meta.glob(
          "../content/**/photos/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}",
          { eager: true }
        );
        const videoModules = import.meta.glob(
          "../content/**/videos/*.{mp4,MP4,webm,WEBM,ogg,OGG}",
          { eager: true }
        );

        const getCategory = (path) => {
          const normalized = path.replace(/\\/g, "/");
          const parts = normalized.split("/");
          const contentIdx = parts.findIndex((p) => p.toLowerCase() === "content");
          if (contentIdx >= 0 && contentIdx + 1 < parts.length) return parts[contentIdx + 1];
          const mediaIdx = parts.findIndex((p) => p.toLowerCase() === "photos" || p.toLowerCase() === "videos");
          if (mediaIdx > 0) return parts[mediaIdx - 1];
          return "";
        };

        const photos = {};
        const videos = {};
        for (const [path, mod] of Object.entries(photoModules)) {
          const url = mod.default || mod;
          const cat = getCategory(path);
          if (cat) { if (!photos[cat]) photos[cat] = []; photos[cat].push(url); }
        }
        for (const [path, mod] of Object.entries(videoModules)) {
          const url = mod.default || mod;
          const cat = getCategory(path);
          if (cat) { if (!videos[cat]) videos[cat] = []; videos[cat].push(url); }
        }

        const combined = {};
        const categories = new Set([...Object.keys(photos), ...Object.keys(videos)]);
        categories.forEach((cat) => {
          combined[cat] = { photos: photos[cat] || [], videos: videos[cat] || [] };
        });
        console.log("🚀 Local assets loaded:", combined);
        setAssets(combined);
      });
  }, []);

  return assets;
}

