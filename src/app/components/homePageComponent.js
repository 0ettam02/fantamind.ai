"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Ruda } from "next/font/google";
import Link from "next/link";

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HomePage() {
  return (
    <>
    <h1 className={`${ruda.className} text-center text-2xl mb-4 md:mb-8 md:text-4xl`}>Prova i nostri servizi</h1>
      <div className="grid grid-row-1 gap-4 place-items-center items-center text-black md:grid-cols-2">
        <Link
          href={"/genSquadraPage"}
          className="bg-white shadow-2xl rounded-lg p-6 text-center"
        >
          <DotLottieReact
            src="https://lottie.host/d1c6e341-e895-4d83-9c4b-241a6b0b7e84/fl7GnlXO8k.json"
            loop
            autoplay
            className="w-full h-48 mb-4"
          />
          <h1 className={`${ruda.className} text-2xl md:text-4xl`}>
            Un generatore<br/>di squadre<br/><span className="bg-green-300">intelligente</span>
          </h1>
        </Link>
        <Link
          href={"/analisiPredittivaPage"}
          className="bg-white shadow-2xl rounded-lg p-6 text-center"
        >
          <DotLottieReact
            src="https://lottie.host/58af4472-1b37-4216-8671-6d22510d103a/Svk93zL0hb.json"
            loop
            autoplay
            className="w-full h-48 mb-4"
          />
          <h1 className={`${ruda.className} text-2xl md:text-4xl`}>
            Usa l&apos;analisi <span className="bg-green-300">predittiva</span><br/>per trasformare le<br/>tue intuizini in vittorie
          </h1>
        </Link>
      </div>
    </>
  );
}
