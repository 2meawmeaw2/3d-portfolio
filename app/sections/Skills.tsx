import React, { ReactNode } from "react";
import { CardDemo } from "../component2D/showCaseCard";
import LightRays from "../component2D/light";
import { easeInOut, motion } from "framer-motion";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
gsap.registerPlugin(useGSAP);
interface Skill {
  name: string;
  icon: ReactNode;
  progress: number;
  time: string;
}
const Skillsp = () => {
  const skills: Skill[] = [
    {
      name: "HTML/CSS",
      icon: (
        <Image
          src="/tools/html.svg"
          alt="HTML/CSS"
          fill
          className="w-12 h-12 p-1 hover:scale-105 transition-all duration-200 ease-in-out"
        />
      ),
      progress: 50,
      time: "2 years",
    },
    {
      name: "GSAP",
      icon: (
        <svg
          className="w-12 h-12  hover:scale-125 scale-115 transition-all duration-200 ease-in-out"
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          fill="none"
          viewBox="0 0 82 30"
        >
          <path
            fill="#0ae448"
            d="M23.81 14.013v.013l-1.075 4.665c-.058.264-.322.458-.626.458H20.81a.218.218 0 0 0-.208.155c-1.198 4.064-2.82 6.858-4.962 8.535-1.822 1.428-4.068 2.093-7.069 2.093-2.696 0-4.514-.867-6.056-2.578C.478 25.09-.364 21.388.146 16.926 1.065 8.549 5.41.096 13.776.096c2.545-.023 4.543.762 5.933 2.33 1.47 1.657 2.216 4.154 2.22 7.421a.55.55 0 0 1-.549.536h-6.13a.42.42 0 0 1-.407-.41c-.05-2.259-.72-3.36-2.052-3.36-2.35 0-3.736 3.19-4.471 4.959-1.027 2.47-1.55 5.152-1.447 7.824.049 1.244.249 2.994 1.43 3.718 1.047.643 2.541.217 3.446-.495.904-.711 1.632-1.942 1.938-3.065.043-.156.046-.277.005-.332-.043-.055-.162-.068-.253-.068h-1.574a.572.572 0 0 1-.438-.202.42.42 0 0 1-.087-.362l1.076-4.674c.053-.24.27-.42.537-.453v-.011h10.33c.024 0 .049 0 .072.005.268.034.457.284.452.556h.002Z"
          />
          <path
            fill="#0ae448"
            d="M41.594 8.65a.548.548 0 0 1-.548.531H35.4c-.37 0-.679-.3-.679-.665 0-1.648-.57-2.45-1.736-2.45s-1.918.717-1.94 1.968c-.025 1.395.764 2.662 3.01 4.84 2.957 2.774 4.142 5.232 4.085 8.48C38.047 26.605 34.476 30 29.042 30c-2.775 0-4.895-.743-6.305-2.207-1.431-1.486-2.087-3.668-1.95-6.485a.548.548 0 0 1 .549-.53h5.84a.55.55 0 0 1 .422.209.48.48 0 0 1 .106.384c-.065 1.016.112 1.775.512 2.195.256.272.613.41 1.058.41 1.079 0 1.711-.763 1.735-2.09.02-1.148-.343-2.155-2.321-4.19-2.555-2.496-4.846-5.075-4.775-9.13.042-2.351.976-4.502 2.631-6.056C28.294.868 30.687 0 33.465 0c2.783.02 4.892.813 6.269 2.359 1.304 1.466 1.932 3.582 1.862 6.29h-.002Z"
          />
          <path
            fill="#0ae448"
            d="m59.096 29.012.037-27.932a.525.525 0 0 0-.529-.533h-8.738c-.294 0-.423.252-.507.42L36.707 28.842v.005l-.005.006c-.14.343.126.71.497.71h6.108c.33 0 .548-.1.656-.308l1.213-2.915c.149-.388.177-.424.601-.424h5.836c.406 0 .415.008.408.405l-.131 2.71a.525.525 0 0 0 .529.532h6.17a.522.522 0 0 0 .403-.182.458.458 0 0 0 .104-.369Zm-10.81-9.326c-.057 0-.102-.001-.138-.005a.146.146 0 0 1-.13-.183c.012-.041.029-.095.053-.163l4.377-10.827c.038-.107.086-.212.136-.314.071-.145.157-.155.184-.047.023.09-.502 11.118-.502 11.118-.041.413-.06.43-.467.464l-3.509-.041h-.008l.003-.002Z"
          />
          <path
            fill="#0ae448"
            d="M71.545.547h-4.639c-.245 0-.52.13-.585.422l-6.455 28.029a.423.423 0 0 0 .088.364.572.572 0 0 0 .437.202h5.798c.311 0 .525-.153.583-.418 0 0 .703-3.168.704-3.178.05-.247-.036-.439-.258-.555-.105-.054-.209-.108-.312-.163l-1.005-.522-1-.522-.387-.201a.186.186 0 0 1-.102-.17.199.199 0 0 1 .198-.194l3.178.014c.95.005 1.901-.062 2.836-.234 6.58-1.215 10.95-6.485 11.076-13.656.107-6.12-3.309-9.221-10.15-9.221l-.005.003Zm-1.579 16.68h-.124c-.278 0-.328-.03-.337-.04-.004-.007 1.833-8.073 1.834-8.084.047-.233.045-.367-.099-.446-.184-.102-2.866-1.516-2.866-1.516a.188.188 0 0 1-.101-.172.197.197 0 0 1 .197-.192h4.241c1.32.04 2.056 1.221 2.021 3.237-.061 3.492-1.721 7.09-4.766 7.214Z"
          />
        </svg>
      ),
      progress: 50,
      time: "2 years",
    },
    {
      name: "Three js",
      icon: (
        <Image
          src="/tools/Threejs-logo.svg"
          alt="3js"
          fill
          className="w-12 h-12 p-1 hover:scale-105 transition-all duration-200 ease-in-out"
        />
      ),
      progress: 50,
      time: "2 years",
    },
    {
      name: "Typescript",
      icon: (
        <Image
          src="/tools/typescript.svg"
          alt="typrscript"
          fill
          className="w-12 h-12 p-2  hover:scale-105 transition-all duration-200 ease-in-out"
        />
      ),
      progress: 60,
      time: "2 months",
    },
    {
      name: "React",
      icon: (
        <Image
          src="/tools/j2.svg"
          alt="React"
          fill
          className="w-12 h-12 p-1 hover:scale-105 transition-all duration-200 ease-in-out"
        />
      ),
      progress: 70,
      time: "3 months",
    },
    {
      name: "Next js",
      icon: (
        <Image
          src="/tools/next.svg"
          alt="Next js"
          fill
          className="w-12 h-12 p-1 hover:scale-105 transition-all duration-200 ease-in-out"
        />
      ),
      progress: 70,
      time: "3 months",
    },
    {
      name: "Tailwind Css",
      icon: (
        <Image
          src="/tools/tail.svg"
          alt="Tailwind Css"
          fill
          className="w-12 h-12 p-1 hover:scale-105 transition-all duration-200 ease-in-out"
        />
      ),
      progress: 50,
      time: "3 months",
    },
  ];
  function Progress(
    name: string,
    icon: ReactNode,
    progress: number,
    index: number,
    time: string
  ) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: easeInOut }}
        key={index}
        className="flex items-center gap-6 w-full max-w-[600px] bg-none rounded-3xl px-6 py-4 bg-black/20 text-[1em] work  text-blue border-1  font-bold font-outfit "
      >
        <div className="flex  relative items-center justify-center w-14 h-14  rounded-lg  shadow-inner shadow-gray-600 p-2">
          {icon}
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-end gap-2 ">
            <span className="text-2xl font-extrabold tracking-widest text-white">
              {name}
            </span>
            <span className="text-xs font-semibold text-gray-400 ml-2 mb-1 tracking-widest">
              {time}
            </span>
            <div className="flex flex-col items-end ml-auto">
              <span
                className={`text-2xl font-extrabold text-black ${
                  progress > 80 ? "text-pink-500" : null
                }`}
              >
                {progress} <span className="text-xl">%</span>
              </span>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-2 w-full h-4 bg-gray-200 rounded-full shadow-inner relative shadow-gray-600">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ delay: 0.8, ease: easeInOut, duration: 1 }}
              className="absolute left-0 top-0 h-4 rounded-full"
              style={{
                background: "linear-gradient(90deg, #0f2239 0%, #00ffff 100%)",
                boxShadow: "0 2px 8px 0 rgba(255,92,124,0.15)",
              }}
            />
          </div>
        </div>
        {/* Percentage */}
      </motion.div>
    );
  }

  useGSAP(() => {
    gsap.set(".skills-set", { yPercent: 100 });
  });
  const slideSet = (show: boolean) => {
    if (show) {
      document.body.style.overflow = "hidden"; // Block scroll

      gsap.to(".skills-set", {
        yPercent: 0,
        duration: 2,
        ease: "power2.inOut",
      });
    } else {
      document.body.style.overflow = ""; // Restore scroll

      gsap.to(".skills-set", {
        yPercent: 100,
        duration: 2,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <section
      id="Skills"
      className="h-[100vh] relative flex justify-center items-center overflow-y-clip"
    >
      <div className="absolute inset-0 z-40 pointer-events-none">
        <LightRays
          raysOrigin="top-left"
          raysColor="#155cfb"
          raysSpeed={1.2}
          lightSpread={7}
          rayLength={2}
          followMouse={true}
          mouseInfluence={5}
        />
      </div>
      <div className="absolute inset-0 z-40 pointer-events-none">
        <LightRays
          raysOrigin="top-right"
          raysColor="#155cfb"
          raysSpeed={1.2}
          lightSpread={7}
          rayLength={2}
          followMouse={true}
          mouseInfluence={5}
        />
      </div>
      <div className="absolute inset-0 z-30 pointer-events-none">
        <LightRays
          raysOrigin="bottom-right"
          raysColor="#155cfb"
          raysSpeed={1.2}
          lightSpread={7}
          rayLength={2}
          followMouse={true}
          mouseInfluence={5}
        />
      </div>
      <div className="absolute inset-0 z-30 pointer-events-none">
        <LightRays
          raysOrigin="bottom-left"
          raysColor="#155cfb"
          raysSpeed={1.2}
          lightSpread={7}
          rayLength={2}
          followMouse={true}
          mouseInfluence={5}
        />
      </div>
      <CardDemo slideSet={slideSet} />

      <div className="absolute inset-0 w-full h-full  z-40 skills-set ">
        <motion.div
          key="toolbox"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "100vh", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ ease: easeInOut, duration: 1 }}
          className="bg-black absolute z-40 inset-0 w-full h-[100vh] overflow-hidden grid place-items-center"
        >
          <div className="w-[100vw] h-[100vh] absolute inset-0 z-10">
            <LightRays
              raysOrigin="top-center"
              raysColor="#155cfb"
              raysSpeed={1.5}
              lightSpread={2}
              rayLength={4}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
            />
          </div>{" "}
          {/* White overlay background */}
          {/* Content Grid */}
          <div className="relative z-10 w-full max-w-[1200px] px-6 grid gap-10 grid-cols-1 justify-items-center">
            <button
              onClick={() => slideSet(false)}
              className="px-6 py-3 rounded-xl justify-self-start  bg-white text-black font-bold text-lg shadow-lg hover:scale-105 transition-transform"
            >
              <MoveLeft />
            </button>
            <motion.div
              transition={{ staggerChildren: 10 }}
              className="w-full grid grid-cols-1 md:grid-cols-2  gap-8"
            >
              {/* Example static skill card for Motion, keep as is */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ ease: easeInOut }}
                className="flex items-center gap-6 w-full max-w-[600px] bg-none rounded-3xl px-6 py-4 text-[1em] work  text-blue border-1  font-bold font-outfit"
              >
                <div className="flex items-center justify-center bg-black w-14 h-14  rounded-lg bg-none shadow-inner shadow-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 9"
                    className=" fill-yellow-300 w-12 h-12 p-1 hover:scale-105 transition-all duration-200 ease-in-out"
                  >
                    <path d="M9.062 0 L4.32 8.992 L0 8.992 L3.703 1.971 C4.277 0.882 5.709 0 6.902 0 Z M19.656 2.248 C19.656 1.006 20.623 0 21.816 0 C23.009 0 23.976 1.006 23.976 2.248 C23.976 3.49 23.009 4.496 21.816 4.496 C20.623 4.496 19.656 3.49 19.656 2.248 Z M9.872 0 L14.192 0 L9.45 8.992 L5.13 8.992 Z M14.974 0 L19.294 0 L15.592 7.021 C15.018 8.11 13.585 8.992 12.392 8.992 L10.232 8.992 Z" />
                  </svg>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-end gap-2 ">
                    <span className="text-2xl font-extrabold tracking-widest text-white">
                      Motion
                    </span>
                    <span className="text-xs font-semibold text-gray-400 ml-2 mb-1 tracking-widest">
                      2 months
                    </span>
                    <div className="flex flex-col items-end ml-auto">
                      <span
                        className={`text-2xl font-extrabold text-black ${"text-pink-500"}`}
                      >
                        80 <span className="text-xl">%</span>
                      </span>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-2 w-full h-4 bg-gray-200 rounded-full shadow-inner relative shadow-gray-600">
                    <motion.div
                      className="absolute left-0 top-0 h-4 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `80%` }}
                      transition={{
                        delay: 0.8,
                        ease: easeInOut,
                        duration: 1,
                      }}
                      style={{
                        background:
                          "linear-gradient(90deg, #0f2239 0%, #00ffff 100%)",
                        boxShadow: "0 2px 8px 0 rgba(255,92,124,0.15)",
                      }}
                    />
                  </div>
                </div>
                {/* Percentage */}
              </motion.div>
              {/* Render skills with Lucide icons */}
              {skills.map(({ name, icon, progress, time }, index) =>
                Progress(name, icon, progress, index, time)
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Skillsp;
