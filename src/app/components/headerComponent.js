"use client";
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
    console.log(visible);
  };

  return (
    <header
      className={`header ${ruda.className} flex flex-col items-center lg:ml-8 lg:items-start lg:flex-row`}
    >
      <Link href={"/"}>
        <div className="titolo flex">
          <Image
            src="/logo.png"
            alt="Logo"
            width={56}
            height={56}
            className="w-14 h-14 mt-5"
          />
          <h1 className="h1Titolo mt-8 mb-10 text-xl lg:text-3xl">
            fantamind.ai
          </h1>
        </div>
      </Link>
      <div
        className={`sezioneInfo flex flex-col items-center  text-lg lg:flex-row ${
          !visible
            ? "none"
            : "bg-green-300 w-full lg:bg-transparent lg:text-black"
        }`}
      >
        <GiHamburgerMenu
          className={`${
            !visible ? "opacity-100" : "opacity-0 hidden"
          }  w-10 h-10 mb-5 lg:opacity-0 lg:hidden animate-jump-in animate-duration-1000`}
          onClick={handleClick}
        />
        <FiX
          className={`${
            !visible ? "opacity-0 hidden lg:block" : "opacity-100"
          }  w-10 h-10 mb-5 lg:opacity-0 lg:hidden animate-jump-in animate-duration-1000`}
          onClick={handleClick}
        />
        <Link
          href={"/"}
          className={`${
            !visible ? "opacity-0 hidden lg:block" : "opacity-100"
          } mr-10 lg:opacity-100 mt-10 mb-12 ml-10 animate-fade-right animate-duration-1000`}
        >
          Home
        </Link>
        <Link
          href={"/manutenzionePage"}
          className={`${
            !visible ? "opacity-0 hidden lg:block" : "opacity-100"
          }  mr-10 lg:opacity-100 mt-10 mb-12 ml-10 animate-fade-right animate-duration-1000 animate-delay-500`}
        >
          Chi siamo
        </Link>
        <Link
          href={"/manutenzionePage"}
          className={`${
            !visible ? "opacity-0 hidden lg:block" : "opacity-100"
          }  mr-10 lg:opacity-100 mt-10 mb-12 ml-10 animate-fade-right animate-duration-1000 animate-delay-1000`}
        >
          Contatti
        </Link>
        <Link
          href={"/ricercaPage"}
          className={`${
            !visible ? "opacity-0 hidden lg:block" : "opacity-100"
          }  mr-10 lg:opacity-100 mt-10 mb-12 ml-10 animate-fade-right animate-duration-1000 animate-delay-[1500ms]`}
        >
          Ricerca
        </Link>
      </div>
    </header>
  );
}
