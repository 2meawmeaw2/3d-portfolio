import React from "react";
import { CometCard } from "../component/projectCard";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";
import { Button } from "../component2D/Button";

const Projects = () => {
  return (
    <section id="Projects" className="h-[300vh] relative z-20">
      <div className="flex w-full h-screen justify-center items-center sticky inset-0">
        <div className="relative p-10 w-[50%] h-full border-red-400 border-2 flex justify-center items-center">
          <div className="absolute -z-10 w-full " />

          <div className="border-1 border-amber-300 w-full h-[90%]">
            <ProjectImage
              src="/meaw2.jpg"
              url="https:google.com"
              alt="Maison Blanche logo"
            />
          </div>
        </div>
        <div className="w-[50%] h-full border-red-100 border-2 flex justify-center items-center">
          <ProjectDes
            title="Maison Blanche"
            description="llllllllllllllllllllllds ad lasd alsd kljsa dlkjksj la skjdksjkd kla"
            tags={["firebase", "nextjs", "tailwind"]}
          />
        </div>
      </div>
    </section>
  );
};

type ImageProps = {
  src: string;
  url: string;
  alt: string;
  className?: string;
};

const ProjectImage = (Props: ImageProps) => {
  return (
    <CometCard className={`w-[80%] mx-auto ${Props.className}`}>
      <button
        type="button"
        className="flex w-full h-full cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 md:my-20 md:p-4"
        aria-label={`View project `}
        style={{
          transformStyle: "preserve-3d",
          transform: "none",
          opacity: 1,
        }}
        onClick={() => {
          if (true) {
            window.open(Props.url, "_blank");
          }
        }}
      >
        <div className="mx-2 h-[40%] ">
          <div className="relative mt-2 aspect-[4/4] w-full">
            <Image
              fill
              className="absolute inset-0 h-full w-full rounded-[16px] object-cover object-center"
              alt={Props.alt}
              src={Props.src}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
              }}
            />
          </div>
        </div>
        {/* Title and Description Section */}
      </button>
    </CometCard>
  );
};

type descriptionProps = {
  title: string;
  description: string;
  tags: Array<string>;
  className?: string;
};
const ProjectDes = (Props: descriptionProps) => {
  return (
    <CometCard className={`w-[70%] mx-auto ${Props.className}`}>
      <div
        className="flex w-full h-full cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 md:my-20 md:p-4"
        aria-label={`View project 3`}
        style={{
          transformStyle: "preserve-3d",
          transform: "none",
          opacity: 1,
        }}
        onClick={() => {
          if (true) {
            window.open("proj.href", "_blank");
          }
        }}
      >
        <div className="w-full l space-y-6 p-6 text-left bg-black/50 rounded-2xl">
          <div>
            <h2 className="text-3xl font-bold name-stroke text-transparent [text-shadow:_6px_0px_40px_rgb(13_61_255_/_1.00)]">
              {Props.title}
            </h2>
          </div>

          <p className="text-base leading-relaxed text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem enim
            expedita possimus soluta. Voluptas{" "}
          </p>

          <div className="flex flex-wrap gap-2">
            {Props.tags.map((tag) => (
              <span
                key={tag}
                className="scale-90 tag-shadow px-5 py-2 rounded-full text-blue border font-bold font-outfit"
              >
                {tag}
              </span>
            ))}
          </div>

          <Button className="tag-shadow px-7 py-2 rounded-full text-neon border-1  font-bold font-outfit hover:text-white hover:bg-neon gap-1 group transition-all duration-250 ease-in-out">
            Check it Out
            <IconArrowRight className="h-4 w-4 group-hover:translate-x-1  transition-transform" />
          </Button>
        </div>
      </div>
    </CometCard>
  );
};

export default Projects;
