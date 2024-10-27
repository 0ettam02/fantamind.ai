"use client"
import Header from "../components/headerComponent";
import Footer from "../components/footerComponent";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { Ruda } from "next/font/google";

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

export default function AnalisiPredittive(){
    return(
        <>
        <Header />
      <div className="grid grid-row-1 gap-4 place-items-center items-center text-black md:grid-cols-2 h-screen">
        <Link
          href={"/manutenzionePage"}
          className="bg-white shadow-2xl rounded-lg p-6 text-center"
        >
          <DotLottieReact
            src="https://lottie.host/9042ee07-d5f1-4d2b-ae6b-ef845cd74b99/can1IgK5Zo.json"
            loop
            autoplay
            className="w-full h-48 mb-4"
          />
          <h1 className={`${ruda.className} text-2xl md:text-4xl`}>
            Non più scelte
            <br />
            <span className="bg-green-300">avventate</span>, solo
            <br />
            acquisti intelligenti
          </h1>
        </Link>
        </div>
        <Footer />

        </>
    )
}

