// src/components/Header.jsx
import React from "react";

export default function Header() {
  const sections = [
    { id: "work", label: "Work" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-gray-900 text-white py-3 px-4 sticky top-0 z-40 shadow-md">
      <nav className="max-w-6xl mx-auto flex justify-center space-x-6">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => handleClick(e, s.id)}
            className="hover:text-indigo-300 transition-colors"
          >
            {s.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
