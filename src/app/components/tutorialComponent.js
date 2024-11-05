"use client";
import { useState } from "react";
import { Ruda } from "next/font/google";

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Tutorial() {
    const [visible, setVisible] = useState(false);

    const handleButtonClick = () =>{
        setVisible(!visible);
    }

  return (
    <>
    {visible ? (
        <div
        className={`${ruda.className} fixed inset-0 bg-black opacity-70 flex flex-col justify-center items-center`}
      >
        <h1 className="opacity-100 text-white text-center text-5xl mb-8">
          Vuoi saltare la spiegazione?
        </h1>
        <div className="flex gap-4">
          <button onClick={handleButtonClick} className="text-white border border-white border-4 p-4 rounded-xl hover:bg-green-500 hover:duration-500 duration-500">
            Si
          </button>
          <button onClick={handleButtonClick} className="text-white border border-white border-4 p-4 rounded-xl hover:bg-green-500 hover:duration-500 duration-500">
            No
          </button>
        </div>
      </div>
    ) : (<h1>ciao</h1>)}
      
    </>
  );
}
