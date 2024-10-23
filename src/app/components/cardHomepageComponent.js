"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Ruda } from "next/font/google";

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

let link;

export default function Card({link}) {
  return (
    <>
      <card className="bg-white shadow-2xl rounded-lg p-6 text-center">
        <DotLottieReact
          src={link}
          loop
          autoplay
          className="w-full h-48 mb-4"
        />
        <h1 className={`${ruda.className} text-2xl md:text-4xl`}>
          La squadra
          <br />
          <span className="bg-[#00FF26]">perfetta</span> è a un
          <br />
          click di distanza
        </h1>
      </card>
    </>
  );
}
