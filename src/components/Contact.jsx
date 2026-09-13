// src/components/Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", project: "", message: "" });
  const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      // Direct email delivery using Formsubmit.co AJAX endpoint to aniketkadam4082@gmail.com
      const response = await fetch("https://formsubmit.co/ajax/aniketkadam4082@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone || "Not provided",
          "Project Type": formData.project || "General Inquiry",
          Message: formData.message,
          _subject: `New Portfolio Inquiry from ${formData.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", project: "", message: "" });
      } else {
        throw new Error("Failed to send message. Please try again or reach out via WhatsApp/Email.");
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setStatus("error");
      setErrorMessage("Could not send email directly. Please email aniketkadam4082@gmail.com or message on WhatsApp.");
    }
  };

  return (
    <section className="p-8 md:p-16 bg-gray-900 text-gray-100 border-t border-gray-800" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        {/* Section Heading */}
        <div className="text-center mb-10">
          <span className="text-indigo-400 font-semibold text-xs md:text-sm tracking-widest uppercase">
            Let's Collaborate
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mt-2 mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base">
            Have a project, shoot, or creative collaboration in mind? Send a message directly to my inbox.
          </p>
        </div>

        {/* Contact info badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-center">
          <a
            href="mailto:aniketkadam4082@gmail.com"
            className="p-5 rounded-2xl bg-gray-800/90 border border-gray-700/60 hover:border-indigo-500 transition-all group"
          >
            <span className="text-2xl block mb-1">✉️</span>
            <span className="text-xs uppercase tracking-wider text-gray-400 block mb-1">Email Me</span>
            <span className="text-sm font-medium text-white group-hover:text-indigo-300 break-words">
              aniketkadam4082@gmail.com
            </span>
          </a>

          <a
            href="https://wa.me/918261926556"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-gray-800/90 border border-gray-700/60 hover:border-green-500 transition-all group"
          >
            <span className="text-2xl block mb-1">💬</span>
            <span className="text-xs uppercase tracking-wider text-gray-400 block mb-1">Phone / WhatsApp</span>
            <span className="text-sm font-medium text-white group-hover:text-green-300">
              +91 82619 26556
            </span>
          </a>

          <a
            href="https://instagram.com/mr_click_kar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-gray-800/90 border border-gray-700/60 hover:border-pink-500 transition-all group"
          >
            <span className="text-2xl block mb-1">📸</span>
            <span className="text-xs uppercase tracking-wider text-gray-400 block mb-1">Instagram</span>
            <span className="text-sm font-medium text-white group-hover:text-pink-300">
              @mr_click_kar
            </span>
          </a>
        </div>

        {/* The Working Direct Email Form */}
        <div className="bg-gray-950 p-6 md:p-10 rounded-2xl border border-gray-800 shadow-2xl">
          {status === "success" ? (
            <div className="p-8 text-center bg-indigo-950/40 border border-indigo-500/50 rounded-xl">
              <span className="text-4xl block mb-3">✅</span>
              <h3 className="text-2xl font-playfair font-bold text-white mb-2">Message Sent Successfully!</h3>
              <p className="text-gray-300 max-w-md mx-auto text-sm">
                Thank you! Your message has been delivered directly to <span className="text-indigo-300 font-semibold">aniketkadam4082@gmail.com</span>. I will get back to you shortly!
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3.5 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Shoot / Project Type
                </label>
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full p-3.5 rounded-xl bg-gray-900 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
                  <option value="Fashion & Editorial">Fashion & Editorial</option>
                  <option value="Commercial & Brand Reel">Commercial & Brand Reel</option>
                  <option value="Event / Concert Coverage">Event / Concert Coverage</option>
                  <option value="Portrait Session">Portrait Session</option>
                  <option value="Other Collaboration">Other Collaboration</option>
                </select>
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Project Details &amp; Message *
                </label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Tell me about your dates, location, vision, and requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all ${
                    status === "submitting"
                      ? "bg-indigo-700 cursor-not-allowed opacity-75"
                      : "bg-indigo-600 hover:bg-indigo-500 hover:shadow-indigo-500/25 active:scale-98"
                  }`}
                >
                  {status === "submitting" ? "Sending to Aniket..." : "Send Message 🚀"}
                </button>

                {errorMessage && (
                  <p className="text-red-400 text-xs text-center sm:text-left">{errorMessage}</p>
                )}
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
};
