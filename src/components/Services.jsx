// src/components/Services.jsx
import React from "react";
import { motion } from "framer-motion";

export const Services = () => {
  const services = [
    { 
      title: "Pre-Wedding Shoots", 
      desc: "Cinematic, romantic storytelling & breathtaking visuals crafted for your journey together.",
      icon: "💍"
    },
    { 
      title: "Fashion Shoots", 
      desc: "High-glamour editorial styling & high-fashion lookbooks tailored for brands & models.",
      icon: "✨"
    },
    { 
      title: "Commercial Video", 
      desc: "Punchy, cinematic reels and product brand films designed to captivate audiences.",
      icon: "🎥"
    },
    { 
      title: "Event Coverage", 
      desc: "Dynamic live photo & video storytelling for corporate galas, concerts, and festivals.",
      icon: "🎉"
    },
    { 
      title: "Portrait Sessions", 
      desc: "Distinctive character portraiture with expressive lighting and artistic flair.",
      icon: "📸"
    },
  ];

  return (
    <section className="p-8 md:p-16 bg-gray-900 border-t border-gray-800/60" id="services">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-indigo-400 font-semibold text-xs md:text-sm tracking-widest uppercase">
            What I Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mt-2 mb-4">
            Specialized Services
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Delivering bespoke photography and cinematography tailored to bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-8 bg-gray-800/80 hover:bg-gray-800 rounded-2xl border border-gray-700/60 hover:border-indigo-500/50 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-2xl font-playfair font-semibold text-white mb-3">{s.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">{s.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-700/40 flex items-center justify-between text-xs text-indigo-400 font-medium">
                <span>Book Consultation</span>
                <span>&rarr;</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
