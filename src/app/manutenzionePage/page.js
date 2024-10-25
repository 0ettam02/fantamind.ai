"use client";
import Header from "../components/headerComponent";
import Footer from "../components/footerComponent";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Ruda } from "next/font/google";

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Manutenzione() {
  return (
    <>
      <div className={`${ruda.className} flex flex-col h-screen`}>
        <Header />
        <div className="flex flex-grow items-center justify-center text-3xl mt-8 md:text-8xl">
          <h1 className="text-center">
            Il sito è in <span className="bg-[#00FF26]">manutenzione</span>, ci
            scusiamo per il disagio
          </h1>
        </div>
        <DotLottieReact
          src="https://lottie.host/c840d75a-8f3f-4673-bcfa-f5f0741835b2/RhBkajRge5.json"
          loop
          autoplay
          className="w-auto h-auto"
        />
        <Footer />
      </div>
    </>
  );
}
