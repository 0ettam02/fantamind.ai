"use client";
import Header from "../components/headerComponent";
import Footer from "../components/footerComponent";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { Ruda } from "next/font/google";
import Card from "../components/cardComponent";

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

export default function AnalisiPredittive() {
  return (
    <>
      <Header />
      <div className="grid grid-row-1 gap-10 place-items-center items-center mt-8">
        <Card 
        pagina="/predGol"
        link="https://lottie.host/aaf6ce5f-988b-4854-a492-2d67a8eaa101/WSbDTbzVyp.json"
        frase="Usa il nostro modello di AI per prevedere i gol"
      />
        <Card 
        pagina="/predAssist"
        link="https://lottie.host/2ebd6508-48fd-4e8c-a3b3-b0e6afcf2492/3euX7sdZKQ.json"
        frase="Usa il nostro modello di AI per prevedere gli assist"
      />
        <Card 
        pagina="/predPrezzo"
        link="https://lottie.host/cb07e41b-8080-47a7-ab98-5b9d3d085002/GxYqSUgMKd.json"
        frase="Usa il nostro modello di AI per prevedere il prezzo"
      />
      </div>
      <Footer />
    </>
  );
}
