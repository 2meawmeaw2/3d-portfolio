"use client";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Skillsp from "./sections/Skills";
import { Contact } from "./sections/Contact";
import { Project } from "./sections/Projects";
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Project />
      <Skillsp />
      <Contact />
    </>
  );
}
