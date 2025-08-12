"use client";
import Image from "next/image";
import { easeInOut, motion } from "framer-motion";
import { Mail, Instagram, Github, MapPin } from "lucide-react";
import { FlipWords } from "../component2D/FlipWords";
import React, { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity(); // This should show the validation messages
      return;
    }
    setIsSubmitted(false);
    setLoading(true);
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      if (!res.ok) {
        console.error("Failed to send", await res.json().catch(() => ({})));
        return;
      }
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error submitting form", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section
      id="Contact"
      className="relative z-30 min-h-screen w-full flex items-center justify-center px-3 sm:px-4 py-12 sm:py-16 overflow-hidden"
    >
      {/* Background */}
      <Image
        src="/noise.jpg"
        alt="Background texture"
        fill
        className="opacity-100 absolute inset-0 -z-10 object-cover"
      />
      <div className="absolute inset-0 bg-black/90 -z-10" />

      {/* Main container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row gap-10 md:gap-16 items-stretch backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-4 sm:p-6 md:p-12">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: easeInOut }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex-1 flex flex-col justify-center gap-8 py-4 lg:py-0"
        >
          <div className="space-y-4">
            <h1
              style={{ textShadow: "0px -1px 10px #FFFFFF80" }}
              className=" text-white text-3xl sm:text-4xl md:text-5xl font-medium md:font-extrabold"
            >
              Contact Me
            </h1>
            <h2
              style={{ textShadow: "0px -1px 10px #FFFFFF80" }}
              className=" text-xl sm:text-2xl md:text-3xl font-extrabold"
            >
              <span className=" pr-2 text-white  font-normal md:font-bold">
                Let's build
              </span>
              <span className="inline-block w-40 sm:w-56 lg:w-64 align-middle pb-1 font-normal md:font-bold">
                <FlipWords words={["amazing", "awesome", "incredible"]} />
              </span>
              <br />
              <span className="text-nowrap text-[0.7em] md:text-[0.5em] text-neon [text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)] font-normal md:font-bold">
                Web sites together
              </span>
            </h2>
          </div>

          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-3 text-white/90 text-base sm:text-lg">
              <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-neon drop-shadow-[0_0_8px_#00ffff]" />
              <span>tahaslco@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-white/90 text-base sm:text-lg">
              <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-neon drop-shadow-[0_0_8px_#00ffff]" />
              <span>Algeria</span>
            </div>
          </div>

          <div className="flex gap-4 sm:gap-6 mt-8">
            {/* Social icons same as before */}
          </div>
        </motion.div>

        {/* Right column (form) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex-1 flex flex-col justify-center"
        >
          <div className="bg-white/10  backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10 shadow-xl h-full">
            <h3
              className="text-xl  sm:text-2xl font-bold text-white mb-6"
              style={{ textShadow: "0px -1px 10px #FFFFFF80" }}
            >
              Send me a message
            </h3>
            <form
              className="space-y-4 sm:space-y-6 flex flex-col"
              onSubmit={handleSubmit}
            >
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-white/80 text-sm font-medium [text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)]"
                >
                  Name
                </label>
                <input
                  required
                  id="name"
                  type="text"
                  placeholder="Your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full text-sm sm:text-base bg-white/10 py-2 px-3 rounded-xl text-white placeholder:text-white/50 placeholder:[text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)] focus:outline-none focus:border-neon focus:ring-neon/20"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-white/80 text-sm font-medium [text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)]"
                >
                  Email
                </label>
                <input
                  required
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full text-sm sm:text-base bg-white/10 py-2 px-3 rounded-xl text-white placeholder:text-white/50 placeholder:[text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)] focus:outline-none focus:border-neon focus:ring-neon/20"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-white/80 text-sm font-medium [text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)]"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="What's this about?"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full text-sm sm:text-base bg-white/10 py-2 px-3 rounded-xl text-white placeholder:text-white/50 placeholder:[text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)] focus:outline-none focus:border-neon focus:ring-neon/20"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-white/80 text-sm font-medium [text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={4}
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full text-sm sm:text-base bg-white/10 border rounded-lg p-3 text-white placeholder:text-white/50 placeholder:[text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)] focus:outline-none focus:border-neon focus:ring-neon/20 resize-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-neon to-blue-500 text-black font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-neon/25 disabled:opacity-60 disabled:cursor-not-allowed [box-shadow:_0px_0px_32px_0px_rgb(0_106_255_/_0.45)] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>{loading ? "Sending..." : "Send Message"}</span>
              </motion.button>
              {isSubmitted && (
                <p className="text-green-400 text-sm">
                  Your message has been sent!
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
