"use client";
import Image from "next/image";
import { easeInOut, motion } from "framer-motion";
import { Mail, Instagram, Github, MapPin } from "lucide-react";
import { FlipWords } from "../component2D/FlipWords";
import { Input } from "@heroui/input";

export function Contact() {
  return (
    <section
      id="Contact"
      className="relative z-30 min-h-screen w-full flex items-center justify-center px-3 sm:px-4 py-12 sm:py-16 overflow-hidden"
    >
      <Image
        src="/noise.jpg"
        alt="Background texture"
        width={1728}
        height={1117}
        className="w-full h-full opacity-100 absolute inset-0 -z-10 object-cover"
      />
      <div className="w-full h-full opacity-100 bg-black/90 absolute inset-0" />

      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row gap-10 md:gap-16 items-center lg:items-stretch backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-4 sm:p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: easeInOut }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex-1 flex flex-col w-full justify-center items-center lg:items-start gap-8 py-4 lg:py-0 bg-none"
        >
          <Image
            src="/noise.jpg"
            alt="Background texture"
            width={1728}
            height={1117}
            className="w-full h-full opacity-100 absolute inset-0 -z-10 object-cover"
          />
          <div className="bg-black/90 absolute inset-0 -z-10" />

          <div className="space-y-4">
            <h1
              style={{ textShadow: "0px -1px 10px #FFFFFF80" }}
              className="text-white text-3xl sm:text-4xl md:text-5xl font-black"
            >
              Contact ME
            </h1>
            <h2
              style={{ textShadow: "0px -1px 10px #FFFFFF80" }}
              className="text-xl sm:text-2xl md:text-3xl font-bold"
            >
              <span className="pr-2 text-white">Let&apos;s build</span>
              <span className="align-middle inline-block max-w-[70vw] sm:w-40 md:w-56 lg:w-64">
                <FlipWords words={["amazing", "awesome", "incredible"]} />
              </span>
              <br />
              <span className="text-nowrap font-semibold text-[0.7em] md:text-[0.5em] text-neon [text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)]">
                Web sites together
              </span>
            </h2>
          </div>

          <div className="space-y-4 mt-8 w-full flex flex-col justify-center items-center lg:items-start">
            <div className="flex items-center gap-3 text-white/90 text-base sm:text-lg [text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.25)]">
              <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-neon drop-shadow-[0_0_8px_#00ffff]" />
              <span>tahaslco@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-white/90 text-base sm:text-lg [text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.25)]">
              <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-neon drop-shadow-[0_0_8px_#00ffff]" />
              <span>Algeria</span>
            </div>
          </div>

          <div className="gap-4 sm:gap-6 mt-8 flex">
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="https://github.com/2meawmeaw2/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 sm:w-12 h-10 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-neon hover:bg-white/20 transition-all duration-300 [box-shadow:_0px_0px_32px_0px_rgb(0_106_255_/_0.45)]"
            >
              <Github className="w-5 sm:w-6 h-5 sm:h-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 sm:w-12 h-10 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-neon hover:bg-white/20 transition-all duration-300 [box-shadow:_0px_0px_32px_0px_rgb(0_106_255_/_0.45)]"
            >
              <Instagram className="w-5 sm:w-6 h-5 sm:h-6" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex-1 flex flex-col w-full justify-center"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10 shadow-xl">
            <h3
              className="text-xl sm:text-2xl font-bold text-white mb-6"
              style={{ textShadow: "0px -1px 10px #FFFFFF80" }}
            >
              Send me a message
            </h3>
            <form className="space-y-4 sm:space-y-6 flex flex-col">
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium [text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)]">
                  Name
                </label>
                <Input
                  type="text"
                  placeholder="Your name"
                  className="w-full text-sm sm:text-base bg-white/10 py-2 px-3 rounded-xl text-white placeholder:text-white/50 placeholder:[text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)] focus:outline-none focus:border-neon focus:ring-neon/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium [text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)]">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full text-sm sm:text-base bg-white/10 py-2 px-3 rounded-xl text-white placeholder:text-white/50 placeholder:[text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)] focus:outline-none focus:border-neon focus:ring-neon/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium [text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)]">
                  Subject
                </label>
                <Input
                  type="text"
                  placeholder="What's this about?"
                  className="w-full text-sm sm:text-base bg-white/10 py-2 px-3 rounded-xl text-white placeholder:text-white/50 placeholder:[text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)] focus:outline-none focus:border-neon focus:ring-neon/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium [text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)]">
                  Message
                </label>
                <textarea
                  placeholder="Tell me about your project..."
                  rows={4}
                  className="w-full text-sm sm:text-base bg-white/10 border rounded-lg p-3 text-white placeholder:text-white/50 placeholder:[text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)] focus:outline-none focus:border-neon focus:ring-neon/20 resize-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-neon to-blue-500 text-black font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-neon/25 [box-shadow:_0px_0px_32px_0px_rgb(0_106_255_/_0.45)] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-4 h-4 bg-neon rounded-full opacity-60 blur-sm"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-20 left-20 w-6 h-6 bg-neon rounded-full opacity-40 blur-sm"
      />
    </section>
  );
}
