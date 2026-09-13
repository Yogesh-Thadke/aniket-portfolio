// src/components/Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", project: "", message: "" });
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    // For now just log – replace with Formspree/mailto/backend later.
    console.log("Contact form submitted:", formData);
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", project: "", message: "" });
  };

  return (
    <section className="p-8 md:p-16 bg-gray-800 text-gray-100" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        {/* Contact details */}
        <div className="max-w-2xl mx-auto mb-8 text-center space-y-2">
          <p className="text-lg"><strong>Email:</strong> <a href="mailto:aniketkadam4082@gmail.com" className="text-indigo-300 hover:underline">aniketkadam4082@gmail.com</a></p>
          <p className="text-lg"><strong>Phone/WhatsApp:</strong> <a href="tel:8261926556" className="text-indigo-300 hover:underline">+91 826 192 6556</a></p>
          <p className="text-lg"><strong>Instagram:</strong> <a href="https://instagram.com/mr_click_kar" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:underline">@mr_click_kar</a></p>
        </div>
        <h2 className="text-4xl font-playfair text-center mb-8">Contact Me</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            name="project"
            placeholder="Project Type"
            value={formData.project}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition-colors"
          >
            Send Message
          </button>
        </form>
        <div className="mt-8 flex justify-center space-x-6">
          {/* Replace # with actual URLs */}
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <i className="fab fa-instagram" aria-hidden="true"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <i className="fab fa-linkedin" aria-hidden="true"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <i className="fab fa-twitter" aria-hidden="true"></i>
          </a>
        </div>
      </motion.div>
    </section>
  );
};
