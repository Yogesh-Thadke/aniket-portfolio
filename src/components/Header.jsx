// src/components/Header.jsx
import React from "react";

export default function Header() {
  const sections = [
    { id: "work", label: "Work" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "feedback", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-gray-900/90 backdrop-blur-md text-white py-3.5 px-4 sticky top-0 z-40 shadow-lg border-b border-gray-800">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Name Logo */}
        <a
          href="#hero"
          onClick={(e) => handleClick(e, "hero")}
          className="font-playfair text-xl font-bold tracking-wide text-white hover:text-indigo-400 transition-colors"
        >
          Aniket<span className="text-indigo-500">.</span>
        </a>

        {/* Links */}
        <div className="flex items-center space-x-6 text-sm font-medium">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => handleClick(e, s.id)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
