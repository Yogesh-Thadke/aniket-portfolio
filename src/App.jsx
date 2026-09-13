// src/App.jsx
import React from "react";
import Header from "./components/Header";
import { Hero } from "./components/Hero";
import { WorkGallery } from "./components/WorkGallery";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Feedback } from "./components/Feedback";
import { Contact } from "./components/Contact";

export default function App() {
  return (
    <div className="font-sans scroll-smooth bg-gray-950 text-gray-100 min-h-screen">
      <Header />
      <section id="hero"><Hero /></section>
      <section id="work"><WorkGallery /></section>
      <section id="services"><Services /></section>
      <section id="about"><About /></section>
      <section id="feedback"><Feedback /></section>
      <section id="contact"><Contact /></section>
    </div>
  );
}
