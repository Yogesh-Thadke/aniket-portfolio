// src/components/Services.jsx
import React from "react";
import { motion } from "framer-motion";

export const Services = () => {
  const services = [
    { title: "Wedding Photography", desc: "Elegant, timeless coverage for your special day." },
    { title: "Fashion Shoots", desc: "High‑glamour editorial photography for brands." },
    { title: "Commercial Video", desc: "Cinematic videos that showcase your product." },
    { title: "Event Coverage", desc: "Dynamic photo‑video storytelling for events." },
    { title: "Portrait Sessions", desc: "Personalized portraiture with artistic flair." },
  ];

  return (
    <section className="p-8 md:p-16 bg-gray-800">
      <h2 className="text-4xl font-playfair text-center mb-12">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgb(255 255 255 / 0.5)" }}
            className="p-6 bg-gray-700 rounded-lg text-center"
          >
            <h3 className="text-2xl font-inter font-medium mb-2">{s.title}</h3>
            <p className="text-gray-300">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
