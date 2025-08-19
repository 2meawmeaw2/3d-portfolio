"use client";
import Hero from "./Hero";
import About from "./About";
const Mix = () => {
  return (
    <div id="Mix" className="relative holder ">
      <Hero />
      <About />
      <div className="bg-black absolute bottom-0 h-[90vh] w-full z-10 opacity-85 ">
        <div className="absolute -bottom-1/2 blur-[300px] rounded-full w-full  h-100 bg-white/40 left-1/2 -translate-x-[50%]" />
      </div>
    </div>
  );
};
export default Mix;
