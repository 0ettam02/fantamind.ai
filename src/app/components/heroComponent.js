"use client"
import { useEffect } from "react";
import { Ruda } from "next/font/google";

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Hero() {

  return (
    <>
      <div className="hero flex justify-center items-center text-center mt-10">
        <h1 className={`${ruda.className} text-5xl md:text-8xl`}>
          <span className="animate-fade-right animate-duration-1000 animate-delay-[2500ms]">Dove <span className="bg-[#00FF26]">l'intuizione</span></span>
          <br />
          <span className="animate-fade-right animate-duration-1000 animate-delay-[3500ms]">si fonde con la
          <br />
          <span className="bg-[#00FF26]">logica</span></span>
        </h1>
      </div>
    </>
  );
}
