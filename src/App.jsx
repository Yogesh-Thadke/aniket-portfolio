// src/App.jsx
import React from "react";
import Header from "./components/Header";
import { Hero } from "./components/Hero";
import { WorkGallery } from "./components/WorkGallery";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Contact } from "./components/Contact";

// Simple smooth scroll via CSS (HTML scroll-behavior) set on html element in global CSS.
export default function App() {
  return (
    <div className="font-sans scroll-smooth">
      <Header />
      <section id="hero"><Hero /></section>
      <section id="work"><WorkGallery /></section>
      <section id="services"><Services /></section>
      <section id="about"><About /></section>
      <section id="contact"><Contact /></section>
    </div>
  );
}
