"use client"
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Importa il CSS di AOS
import { Ruda } from "next/font/google";

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Hero() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []); 

  return (
    <>
      <scrittaHero data-aos="fade-right" className="flex justify-center items-center text-center mt-10 md:h-screen">
        <h1 className={`${ruda.className} text-4xl md:text-8xl`}>
          Dove <span className="bg-[#00FF26]">l'intuizione</span>
          <br />
          si fonde con la
          <br />
          <span className="bg-[#00FF26]">logica</span>
        </h1>
      </scrittaHero>
    </>
  );
}
