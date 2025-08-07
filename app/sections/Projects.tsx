"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CometCard } from "../component2D/cardt";
import LightRays from "../component2D/light";
import { IconArrowRight } from "@tabler/icons-react";
const projects = [
  {
    title: "Fam Rise.com",
    href: "https://maison-blanche.vercel.app/",
    name: "Bakery Landing page",
    desc: "Fake bakery landing page to try some designing",
    img: "/1.png",
    imgClass: "object-contain",
    bg: "bg-[#f2eadf]",
  },
  {
    title: "AI-course.com",
    href: "https://ai-course-2025.vercel.app/",
    name: "AI course landing page",
    desc: "3d lading page with scroll animation",
    img: "/3d.jpg",
    imgClass: "object-contain",
    bg: "bg-[#f2eadf]",
  },
  {
    title: "/steadycore.io",
    href: "https://calisthenics-zeta.vercel.app/",
    name: "Calisthenics Landing page",
    desc: "Fake (maybe) calisthenics startup landing page",
    img: "/dark.jpg",
    imgClass: "w-full",
    bg: "",
  },
  {
    title: "/famerise.com",
    href: "https://hometaskmanager.vercel.app/",
    name: "Fame Rise",
    desc: "beautiful task manager app with points/rewards system (beta)",
    img: "/2.png",
    imgClass: "object-contain",
    bg: "bg-[#242424]",
  },
];

export function Project() {
  return (
    <motion.section
      id="Projects"
      className="bg-black lg:min-h-300 relative z-40 overflow-clip"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.2}
          lightSpread={0.7}
          rayLength={1}
          followMouse
          mouseInfluence={0.05}
        />
      </div>
      <div className="absolute inset-0 w-full h-full bg-black opacity-25" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] rounded-full blur-[100vw] bg-white" />
      <div className="absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-[50%] w-[80vw] h-[40vh] blur-[70vw] bg-white/50" />

      <div className="relative z-20 w-full px-4 sm:px-8 md:px-12 py-16 flex flex-col items-center gap-20">
        <motion.div
          className="text-center  space-y-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            style={{ textShadow: "0px -1px 10px #FFFFFF80" }}
          >
            Featured Projects
          </motion.h1>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-8 sm:gap-10 w-full"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.18,
                delayChildren: 0.2,
              },
            },
          }}
          viewport={{ once: true }}
        >
          {projects.map((proj) => (
            <motion.div
              key={proj.title}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.045, y: -8 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="w-full max-w-[90%] sm:max-w-[400px] md:max-w-[450px]"
            >
              <CometCard className="w-full mx-auto min-h-[20rem] sm:min-h-[24rem]">
                <button
                  type="button"
                  className="flex w-full h-full  min-h-160 flex-col items-stretch justify-center rounded-2xl bg-[#1F2121] p-4"
                  aria-label={`View project ${proj.name}`}
                  onClick={() => window.open(proj.href, "_blank")}
                >
                  <div className="relative w-full h-full rounded-2xl bg-amber-50 aspect-[4/3] mt-2">
                    <Image
                      fill
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      alt={proj.name}
                      src={proj.img}
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                      }}
                    />
                  </div>
                  <div className="mt-4 bg-black/60  rounded-xl backdrop-blur-sm shadow-inner text-white font-mono p-6 space-y-2">
                    <h3 className="text-xl font-extrabold [text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)]">
                      {proj.name}
                    </h3>
                    <p className="text-slate-500 text-sm [text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)]">
                      {proj.desc}
                    </p>
                    <span className="mt-2 inline-flex items-center justify-center tag-shadow px-6 py-2 rounded-full text-neon border font-bold font-outfit hover:text-white hover:bg-neon gap-1 group transition-all duration-200 ease-in-out">
                      Check it Out
                      <IconArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </button>
              </CometCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
