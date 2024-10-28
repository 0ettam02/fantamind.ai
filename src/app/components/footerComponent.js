import React from "react";
import { Ruda } from "next/font/google";

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Footer() {
  return <div className={`${ruda.className} footer mt-20 p-6 flex flex-col items-center bg-white text-black`}>©2024 fantamind.ai, Inc. o società affiliate</div>;
}
