"use client";
import Header from "../components/headerComponent";
import Footer from "../components/footerComponent";
import { Ruda } from "next/font/google";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Ricerca() {
  return (
    <>
      <Header />
      <main className={`${ruda.className} mt-8 flex flex-col flex-grow`}>
        <section aria-label="Animazione di Ricerca">
          <DotLottieReact
            src="https://lottie.host/e90675c2-ec01-4aad-a5eb-4ddf93ca3257/R9XQyHpPI2.json"
            loop
            autoplay
            className="mt-0 md:mt-[-8em]"
          />
        </section>
        <section aria-label="Descrizione della Ricerca" className="text-center mt-8">
          <h1 className="text-xl md:text-5xl">
            Nella nostra sezione di Ricerca, ci concentriamo sullo sviluppo di un
            modello di intelligenza artificiale, progettato per analizzare e
            utilizzare dati pre-Fantacalcio. Ispirati da altre startup di machine
            learning che hanno dimostrato come le AI possano dominare nei tornei
            di giochi, il nostro obiettivo è far trionfare la nostra intelligenza
            artificiale nel Fantacalcio. Siamo impegnati in un processo di
            miglioramento continuo, fornendo consigli sempre più precisi e
            vincenti per i nostri utenti.
          </h1>
        </section>
        <section aria-label="Aree di Ricerca" className="flex flex-col justify-center items-center mt-8">
          <h2 className="text-3xl text-center md:text-5xl">Aree di ricerca</h2>
          <p className="text-center max-w-[40em]">
            La nostra startup di machine learning si concentra su tre aree
            principali: generazione di una squadra, sviluppo di modelli predittivi,
            e miglioramento continuo dell&apos;intelligenza artificiale.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}