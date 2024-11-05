"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Ruda } from "next/font/google";
import Link from "next/link";

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Card({ pagina, link, frase }) {
  return (
    <>
      <div className="odd:bg-green-300 even:bg-white md:w-full shadow-[0_10px_30px_rgba(0,0,0,0.6)] rounded-lg p-2 md:p-6 text-center">
        <h1
          className={`${ruda.className} text-2xl md:text-4xl`}
          dangerouslySetInnerHTML={{ __html: frase }}
        />
        <div className="flex justify-center mt-6">
          <Link
            href={pagina}
            className="border border-black border-xl rounded-3xl p-4 border-4"
          >
            Scopri di più
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <DotLottieReact
            src={link}
            loop
            autoplay
            className="md:w-1/2 md:h-1/2"
          />
        </div>
      </div>
    </>
  );
}
