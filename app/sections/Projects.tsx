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
      className="bg-black h-fit   relative  "
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <Image
        src="/noise.jpg"
        alt="dsad"
        width={1728}
        height={1117}
        className="w-full h-full  opacity-14 absolute inset-0"
      />
      <div className="absolute inset-0  pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#155cfb"
          raysSpeed={1.2}
          lightSpread={0.7}
          rayLength={1}
          followMouse={true}
          mouseInfluence={0.05}
        />
      </div>
      <div className="bg-[#002BB8]/40 rounded-full blur-[433.70px] z-10 w-full h-full absolute inset-0 " />
      <div className="w-full h-full relative inset-0 z-20 gap-20 lg:gap-0  p-20 flex flex-col justify-between py-50 items-center">
        <motion.div
          className="flex justify-center items-center flex-col gap-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold  [text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            My works
          </motion.h1>
          <motion.h3
            className="text-white text-lg sm:text-xl md:text-2xl lg:text-4xl font-medium  [text-shadow:_0px_-13px_28px_rgb(0_106_255_/_0.56)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            The tools I suppose you checked are utilized to build these
          </motion.h3>
        </motion.div>
        <motion.div
          className="flex flex-col justify-center items-center gap-20 xl:flex-row  w-full"
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
              whileHover={{
                scale: 1.045,
                y: -8,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className=" w-[90%] lg:w-full "
            >
              <CometCard className="w-[80%] mx-auto">
                <button
                  type="button"
                  className="flex w-full h-full cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 md:my-20 md:p-4"
                  aria-label={`View project ${proj.name}`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "none",
                    opacity: 1,
                  }}
                  onClick={() => {
                    if (proj.href) {
                      window.open(proj.href, "_blank");
                    }
                  }}
                >
                  <div className="mx-2  ">
                    <div className="relative mt-2  aspect-[4/4] w-full">
                      <Image
                        fill
                        className="absolute inset-0 h-full w-full rounded-[16px] object-cover object-center"
                        alt={proj.name}
                        src={proj.img}
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                        }}
                      />
                    </div>
                  </div>
                  {/* Title and Description Section */}
                  <div className="mt-4 h-[60%]  flex flex-col justify-center gap-2 p-6 font-mono text-white bg-black/60 rounded-xl backdrop-blur-sm shadow-inner">
                    <h3 className="max-w-xs !pb-2 !m-0 text-start text-white text-[1.5em] text-nowrap  font-extrabold  [text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)]">
                      {proj.name}
                    </h3>
                    <div className="text-base text-start !m-0 !p-0 font-normal">
                      <span className="text-slate-500 [text-shadow:_0px_-13px_30px_rgb(0_106_255_/_0.45)] ">
                        {proj.desc}
                      </span>
                    </div>{" "}
                    <span className="mt-2 tag-shadow px-7 py-2 rounded-full text-neon border-1 font-bold font-outfit hover:text-white hover:bg-neon gap-1 group transition-all duration-250 ease-in-out">
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
