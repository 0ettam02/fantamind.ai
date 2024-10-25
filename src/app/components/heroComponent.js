"use client";
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
          Dove <span className="bg-[#00FF26]">l&apos;intuizione</span>
          <br />
          si fonde con la
          <br />
          <span className="bg-[#00FF26]">logica</span>
        </h1>
      </div>
    </>
  );
}
