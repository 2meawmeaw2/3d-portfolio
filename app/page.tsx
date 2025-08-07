"use client";
import Skillsp from "./sections/Skills";
import { Contact } from "./sections/Contact";
import { Project } from "./sections/Projects";
import Mix from "./sections/Mix";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <Image src="/3dmain.jpg" fill className="hidden" alt="nothing" />
      <Mix />
      <Project />
      <Skillsp />
      <Contact />
    </>
  );
}
