"use client";
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Ruda } from "next/font/google";
import Link from "next/link";

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HomePage() {
  return (
    <>
      <div className="grid grid-row-1 gap-4 place-items-center items-center text-black md:grid-cols-3">
        <Link href={"/genSquadraPage"} className="bg-white shadow-2xl rounded-lg p-6 text-center">
        <DotLottieReact
          src='https://lottie.host/d1c6e341-e895-4d83-9c4b-241a6b0b7e84/fl7GnlXO8k.json'
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
      </Link>      
      <Link href={"/"} className="bg-white shadow-2xl rounded-lg p-6 text-center">
        <DotLottieReact
          src="https://lottie.host/9042ee07-d5f1-4d2b-ae6b-ef845cd74b99/can1IgK5Zo.json"
          loop
          autoplay
          className="w-full h-48 mb-4"
        />
        <h1 className={`${ruda.className} text-2xl md:text-4xl`}>
          Non più scelte
          <br />
          <span className="bg-[#00FF26]">avventate</span>, solo
          <br />
          acquisti intelligenti
        </h1>
      </Link>      
      <Link href={"/"} className="bg-white shadow-2xl rounded-lg p-6 text-center">
        <DotLottieReact
          src="https://lottie.host/58af4472-1b37-4216-8671-6d22510d103a/Svk93zL0hb.json"
          loop
          autoplay
          className="w-full h-48 mb-4"
        />
        <h1 className={`${ruda.className} text-2xl md:text-4xl`}>
          Usa la <span className="bg-[#00FF26]">statistica</span>,
          <br />
          per trasformare le tue
          <br />
          intuizioni in <span className="bg-[#00FF26]">vittorie</span>
        </h1>
      </Link>
      </div>
    </>
  );
}
