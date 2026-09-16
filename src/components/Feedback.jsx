import React, { useState } from "react";
import { motion } from "framer-motion";

export const Feedback = () => {
  const [formData, setFormData] = useState({ name: "", role: "", rating: "5", review: "" });
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
      const response = await fetch("https://formsubmit.co/ajax/aniketkadam4082@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Name: formData.name,
          Role: formData.role,
          Rating: formData.rating + " Stars",
          Review: formData.review,
          _subject: `New Client Feedback from ${formData.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", role: "", rating: "5", review: "" });
      } else {
        throw new Error("Failed to submit feedback.");
      }
    } catch (err) {
      console.error("Feedback submit error:", err);
      setStatus("error");
      setErrorMessage("Could not submit feedback. Please try again later.");
    }
  };

  const testimonials = [
    {
      name: "Rohit & Pooja",
      role: "Pre-Wedding Client",
      quote:
        "Aniket captured our pre-wedding shoot with pure magic. Every shot looks straight out of a Bollywood romance. His direction, ease behind the camera, and cinematic edits blew us away!",
      rating: 5,
      avatar: "💍",
    },
    {
      name: "Oracle Fitness Studio",
      role: "Commercial & Brand Shoot",
      quote:
        "The promo reels and gym photography shot by Aniket boosted our social engagement tenfold. His lightning-fast cuts, lighting techniques, and attention to energy are unmatched.",
      rating: 5,
      avatar: "⚡",
    },
    {
      name: "Sneha Roy",
      role: "Fashion & Editorial Model",
      quote:
        "Working with Aniket on my editorial lookbook was an absolute breeze. He understands framing, mood, and how to bring out natural confidence. Highly recommended!",
      rating: 5,
      avatar: "✨",
    },
  ];

  return (
    <section className="p-8 md:p-16 bg-gray-950 border-t border-gray-800/80" id="feedback">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-indigo-400 font-semibold text-xs md:text-sm tracking-widest uppercase">
            Client Words &amp; Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mt-2 mb-4">
            Client Testimonials
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-base">
            Honest feedback and experiences shared by clients, brands, and creative partners.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-gray-900/90 rounded-2xl p-8 border border-gray-800 shadow-xl flex flex-col justify-between relative group hover:border-indigo-500/40 transition-all duration-300"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center space-x-1 text-amber-400 text-lg mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-gray-300 leading-relaxed italic text-sm md:text-base">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-800/80">
                <div className="w-11 h-11 rounded-full bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-white font-semibold font-playfair text-base">
                    {t.name}
                  </h4>
                  <p className="text-indigo-400 text-xs tracking-wide">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Feedback Form */}
        <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-2">Share Your Experience</h3>
            <p className="text-gray-400 text-sm">Worked with Aniket? I'd love to hear your feedback!</p>
          </div>
          
          {status === "success" ? (
            <div className="p-8 text-center bg-indigo-950/40 border border-indigo-500/50 rounded-xl">
              <span className="text-4xl block mb-3">✅</span>
              <h3 className="text-2xl font-playfair font-bold text-white mb-2">Feedback Submitted!</h3>
              <p className="text-gray-300 max-w-md mx-auto text-sm">
                Thank you for sharing your experience. Your feedback has been sent directly to Aniket.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all"
              >
                Submit Another Review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  className="w-full p-3.5 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Role / Shoot Type *
                </label>
                <input
                  type="text"
                  name="role"
                  placeholder="e.g. Pre-Wedding Client"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Rating *
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full p-3.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  <option value="5">★★★★★ (5/5) - Excellent</option>
                  <option value="4">★★★★☆ (4/5) - Great</option>
                  <option value="3">★★★☆☆ (3/5) - Good</option>
                  <option value="2">★★☆☆☆ (2/5) - Fair</option>
                  <option value="1">★☆☆☆☆ (1/5) - Poor</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Your Review *
                </label>
                <textarea
                  name="review"
                  rows="4"
                  placeholder="Tell me about your experience working with me..."
                  value={formData.review}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                ></textarea>
              </div>

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
                  {status === "submitting" ? "Submitting..." : "Submit Feedback 💬"}
                </button>

                {errorMessage && (
                  <p className="text-red-400 text-xs text-center sm:text-left">{errorMessage}</p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
