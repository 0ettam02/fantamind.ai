"use client"
import { Ruda } from "next/font/google";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiX } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";


const ruda = Ruda({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Header() {
const [visible, setVisible] = useState(false);

const handleClick = () => {
    setVisible(!visible);
    console.log(visible)
  };

  return (
    <header className={`header ${ruda.className} flex flex-col items-center md:items-start md:flex-row md:ml-[5em] `}>
      <Link href={"/"}>
      <div className="titolo flex">
        <Image
          src="/logo.png"
          alt="Logo"
          width={56}
          height={56}
          className="w-14 h-14 mt-5"
        />
        <h1 className="h1Titolo mt-8 mb-10 text-xl md:text-3xl">fantamind.ai</h1>
      </div>
      </Link>
      <div className={`sezioneInfo flex flex-col items-center  text-lg md:flex-row ${!visible ? "none" : "bg-[#00FF26] w-full md:bg-transparent md:text-black"}`}>
        <GiHamburgerMenu className={`${!visible ? "opacity-100" : "opacity-0 hidden"}  w-10 h-10 mb-5 md:opacity-0 md:hidden animate-jump-in animate-duration-1000`} onClick={handleClick}/>
        <FiX className={`${!visible ? "opacity-0 hidden md:block" : "opacity-100"}  w-10 h-10 mb-5 md:opacity-0 md:hidden animate-jump-in animate-duration-1000`} onClick={handleClick}/>
        <Link href={"/"} className={`${!visible ? "opacity-0 hidden md:block" : "opacity-100"} mr-10 md:opacity-100 mt-10 mb-12 ml-10 animate-fade-right animate-duration-1000`}>home</Link>
        <Link href={"/chiSiamo"} className={`${!visible ? "opacity-0 hidden md:block" : "opacity-100"}  mr-10 md:opacity-100 mt-10 mb-12 ml-10 animate-fade-right animate-duration-1000 animate-delay-500`}>chi siamo</Link>
        <Link href={"/contatti"} className={`${!visible ? "opacity-0 hidden md:block" : "opacity-100"}  mr-10 md:opacity-100 mt-10 mb-12 ml-10 animate-fade-right animate-duration-1000 animate-delay-1000`}>contatti</Link>
        <Link href={"/ricerca"} className={`${!visible ? "opacity-0 hidden md:block" : "opacity-100"}  mr-10 md:opacity-100 mt-10 mb-12 ml-10 animate-fade-right animate-duration-1000 animate-delay-[1500ms]`}>ricerca</Link>
      </div>
      
    </header>
  );
}
