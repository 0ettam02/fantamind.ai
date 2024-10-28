"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Ruda } from "next/font/google";
import Link from "next/link";
import Card from "./cardComponent";


const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HomePage() {
  return (
    <>
      <div className="grid grid-row-1 gap-10 place-items-center items-center">
        <Card 
        pagina="/genSquadraPage"
        link="https://lottie.host/d1c6e341-e895-4d83-9c4b-241a6b0b7e84/fl7GnlXO8k.json"
        frase="Usa il generatore intelligente per creare la squadra migliore"
      />
        <Card 
        pagina="/analisiPredittivaPage" 
        link="https://lottie.host/7e08caff-20f0-4bb6-a7e0-53f236e8f432/n1mZRn2SQm.json" 
        frase="Usa l&apos;analisi predittiva per trasformare le tue intuizioni in vittorie"
      />
      </div>
    </>
  );
}
